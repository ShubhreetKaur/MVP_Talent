import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Table, Button, Icon } from 'semantic-ui-react';
import CustomerCreate from './CustomerCreate.jsx';
import CustomerEdit from './CustomerEdit.jsx';
import CustomerDelete from './CustomerDelete.jsx';

class CustomerList extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            id: '',
            name: '',
            address: '',
            requiredItem: 0,
            customers: [],
            success: [],
            nameError: '',
            addressError:'',
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
            url: "Customers/GetCustomerData",
            type: "GET",
            success: function (data) {
                this.setState({
                    customers: data
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
            nameError = "Please enter the Customer Name.";
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
            addressError = "Please enter the Customer Address.";
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
                url: "/Customers/CreateCustomer",
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
                url: "/Customers/EditCustomer",
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
                url: "/Customers/DeleteCustomer",
                type: "GET",
                data: { 'id': id },
                success: function (data) {
                    this.setState({ Success: data })
                    window.location.reload()
                }.bind(this)
            })
        
    }

    render() {
        const requiredItem = this.state.requiredItem;
        let modalData = this.state.customers[requiredItem];

        let customers = this.state.customers;
        let tableData = null;

        if (customers != "") {
            tableData = customers.map((item, index) =>
                <tr key={index}>
                    <td className="three wide">{item.Name}</td>
                    <td className="three wide">{item.Address}</td>
                    <td className="three wide">
                        <Button color="yellow" data-toggle="modal" data-target="#editModal" 
                            onClick={() => this.replaceModalItem(index)}>

                            <i className="edit icon"></i>
                            Edit
                        </Button>

                        <CustomerEdit
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
                        <CustomerDelete
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
                        <Button color='blue' data-toggle="modal" data-target="#createModal">New Customer</Button>
                    </div>
                    <CustomerCreate
                        onCreate={this.onCreate}
                        state={this.state}
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
export default CustomerList;