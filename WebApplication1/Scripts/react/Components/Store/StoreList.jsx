import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Table, Button, Icon } from 'semantic-ui-react';
import StoreCreate from './StoreCreate.jsx';
import StoreEdit from './StoreEdit.jsx';
import StoreDelete from './StoreDelete.jsx';

class StoreList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            name: '',
            address: '',
            requiredItem: 0,
            stores: [],
            success: [],
            nameError: '',
            addressError: '',
        };
        this.fetchData = this.fetchData.bind(this);
        this.onCreate = this.onCreate.bind(this);
        this.onEdit = this.onEdit.bind(this);
        this.onDelete = this.onDelete.bind(this);
        this.replaceModalItem = this.replaceModalItem.bind(this);
    }

    componentDidMount() {
        this.fetchData();
    }
    fetchData() {
        $.ajax({
            url: "Stores/GetStoreData",
            type: "GET",
            success: function (data) {
                this.setState({
                    stores: data
                })

            }.bind(this)
        });
    }
    replaceModalItem(index) {
        this.setState({
            requiredItem: index
        });
    }
    validate(item) {
        let nameError = "";
        let addressError = "";
        if (!item.name) {
            nameError = "Please enter the Store Name.";
        }
        if (typeof item.name !== "undefined") {
            if (!item.name.match(/^[a-zA-Z ]*$/)) {
                nameError = "Please enter alphabet characters only.";
            }
        }
        if (nameError) {
            this.setState({ nameError });
            return false;
        }
        if (!item.address) {
            addressError = "Please enter the Store Address.";
        }
        if (addressError) {
            this.setState({ addressError });
            return false;
        }
        return true;
    };    
    onCreate(item) {
                if (this.validate(item)) {
        let data = { 'Name': item.name, 'Address': item.address };
        $.ajax({
            url: "/Stores/CreateStore",
            type: "POST",
            data: data,
            success: function (data) {
                this.setState({ Success: data })
                window.location.reload()
            }.bind(this)
        });
              }
    };
    onEdit(item) {
        if (this.validate(item)) {
            let data = { 'Id': item.id, 'Name': item.name, 'Address': item.address };
            $.ajax({
                url: "/Stores/EditStore",
                type: "POST",
                data: data,
                success: function (data) {
                    this.setState({ Success: data })
                    window.location.reload()
                }.bind(this)
            });
        }
    };
    onDelete(id) {
        $.ajax({
            url: "/Stores/DeleteStore",
            type: "GET",
            data: { 'id': id },
            success: function (data) {
                this.setState({ Success: data })
                window.location.reload()
            }.bind(this)
        });
    }

    render() {
        const requiredItem = this.state.requiredItem;
        let modalData = this.state.stores[requiredItem];

        let stores = this.state.stores;
        let tableData = null;

        if (stores != "") {
            tableData = stores.map((item, index) =>
                <tr key={index}>
                    <td className="three wide">{item.Name}</td>
                    <td className="two wide">{item.Address}</td>
                    <td className="three wide">
                        <Button color="yellow" data-toggle="modal" data-target="#editModal"
                            onClick={() => this.replaceModalItem(index)}>

                            <i className="edit icon"></i>
                            Edit
                        </Button>

                        <StoreEdit
                            state={this.state}
                            id={modalData.Id}
                            name={modalData.Name}
                            address={modalData.Address}
                            onEdit={this.onEdit}
                        />
                    </td>
                    <td className="three wide">
                        <Button color="red" data-toggle="modal" data-target="#deleteModal"

                            onClick={() => this.replaceModalItem(index)}>
                            <i className="trash icon"></i>

                            Delete

                        </Button>
                        <StoreDelete
                            id={modalData.Id}
                            onDelete={this.onDelete}
                        />

                    </td>
                </tr>
            )
        }

        return (
            <React.Fragment>
                <br />
                <br />
                <br />

                <div>
                    <div>
                        <Button color='blue' data-toggle="modal" data-target="#createModal">New Store</Button>
                    </div>
                    <StoreCreate
                        state={this.state}
                        onCreate={this.onCreate}
                    />
                </div>
                <br />
                <Table className="ui striped table">
                    <thead>
                        <tr>
                            <th className="three wide">Name</th>
                            <th className="three wide">Address</th>
                            <th className="three wide">Actions</th>
                            <th className="three wide">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tableData}
                    </tbody>
                </Table>
            </React.Fragment>
        );
    }
}
export default StoreList;