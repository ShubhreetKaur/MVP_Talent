import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Table, Button, Icon } from 'semantic-ui-react';
import ProductCreate from './ProductCreate.jsx';
import ProductEdit from './ProductEdit.jsx';
import ProductDelete from './ProductDelete.jsx';

class ProductList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            name: '',
            price: '',
            requiredItem: 0,
            products: [],
            success: [],
            nameError: '',
            priceError: '',
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
            url: "Products/GetProductData",
            type: "GET",
            success: function (data) {
                this.setState({
                    products: data
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
        let priceError = "";
        if (!item.name) {
            nameError = "Please enter the Product Name.";
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
        if (!item.price) {
            priceError = "Please enter the Product Price.";
        }
        if (typeof item.price !== "undefined") {
            if (!item.price.match(/^\$?[0-9]+(\.[0-9][0-9])?$/)) {
                priceError = "Please enter numbers and currency sign only.";
            }
        }
        if (priceError) {
            this.setState({ priceError });
            return false;
        }
        return true;
    };
    
    onCreate(item) {
        if (this.validate(item)) {
            let data = { 'Name': item.name, 'Price': item.price };
            $.ajax({
                url: "/Products/CreateProduct",
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
            let data = { 'Id': item.id, 'Name': item.name, 'Price': item.price };
            $.ajax({
                url: "/Products/EditProduct",
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
            url: "/Products/DeleteProduct",
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
        let modalData = this.state.products[requiredItem];

        let products = this.state.products;
        let tableData = null;

        if (products != "") {
            tableData = products.map((item, index) =>
                <tr key={index}>
                    <td className="three wide">{item.Name}</td>
                    <td className="two wide">{item.Price}</td>
                    <td className="three wide">
                        <Button color="yellow" data-toggle="modal" data-target="#editModal"
                            onClick={() => this.replaceModalItem(index)}>

                            <i className="edit icon"></i>
                            Edit
                        </Button>

                        <ProductEdit
                            state={this.state}
                            id={modalData.Id}
                            name={modalData.Name}
                            price={modalData.Price}
                            onEdit={this.onEdit}
                        />


                    </td>
                    <td className="three wide">
                        <Button color="red" data-toggle="modal" data-target="#deleteModal"

                            onClick={() => this.replaceModalItem(index)}>
                            <i className="trash icon"></i>

                            Delete

                        </Button>
                        <ProductDelete
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
                        <Button color='blue' data-toggle="modal" data-target="#createModal">New Product</Button>
                    </div>
                    <ProductCreate
                        state={this.state}
                        onCreate={this.onCreate}
                    />

                </div>
                <br />
                <Table className="ui striped table">
                    <thead>
                        <tr>
                            <th className="three wide">Name</th>
                            <th className="three wide">Price</th>
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
export default ProductList;