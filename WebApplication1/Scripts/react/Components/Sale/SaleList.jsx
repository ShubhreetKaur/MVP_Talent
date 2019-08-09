import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Table, Button, Icon } from 'semantic-ui-react';
import SaleCreate from './SaleCreate.jsx';
import SaleEdit from './SaleEdit.jsx';
import SaleDelete from './SaleDelete.jsx';

class SaleList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            date: '',
            customerId: '',
            productId: '',
            storeId: '',

            requiredItem: 0,
            sales: [],
            success: [],
            customers: [],
            products: [],
            stores: [],
            customerError: '',
            productError: '',
            storeError: '',
            dateError: '',

        };
        this.fetchData = this.fetchData.bind(this);
        this.onCreate = this.onCreate.bind(this);
        this.onEdit = this.onEdit.bind(this);
        this.onDelete = this.onDelete.bind(this);
        this.replaceModalItem = this.replaceModalItem.bind(this);
        this.fetchCustomerData = this.fetchCustomerData.bind(this);
        this.fetchProductData = this.fetchProductData.bind(this);
        this.fetchStoreData = this.fetchStoreData.bind(this);
    }

    componentDidMount() {
        this.fetchData();
        this.fetchCustomerData();
        this.fetchProductData();
        this.fetchStoreData();
      }
    fetchData() {
        $.ajax({
            url: "Sales/GetSaleData",
            type: "GET",
            success: function (data) {
                this.setState({
                    sales: data
                })

            }.bind(this)
        });
    }

    fetchCustomerData() {
        $.ajax({
            url: "Sales/GetCustomer",
            type: "GET",
            success: function (data) {
                this.setState({
                    customers: data
                })

            }.bind(this)
        });
    }

    fetchProductData() {
        $.ajax({
            url: "Sales/GetProduct",
            type: "GET",
            success: function (data) {
                this.setState({
                    products: data
                })

            }.bind(this)
        });
    }

    fetchStoreData() {
        $.ajax({
            url: "Sales/GetStore",
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
        let customerError= "";
        let productError= "";
        let storeError= "";
        let dateError= "";
        if (!item.date) {
            dateError = "Please select the Date.";
        }
        if (dateError) {
            this.setState({ dateError });
            return false;
        }
        if (!item.customerId) {
            customerError = "Please select the Customer.";
        }
        if (customerError) {
            this.setState({ customerError });
            return false;
        }
        if (!item.productId) {
            productError = "Please select the Product.";
        }
        if (productError) {
            this.setState({ productError });
            return false;
        }
        if (!item.storeId) {
            storeError = "Please select the Store.";
        }
        if (storeError) {
            this.setState({ storeError });
            return false;
        }
        return true;
    };    

    onCreate(item) {
        if (this.validate(item)) {
            let data = { 'DateSold': item.date, 'CustomerId': item.customerId, 'ProductId': item.productId, 'StoreId': item.storeId };
            $.ajax({
                url: "/Sales/CreateSale",
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
            let data = { 'Id': item.id, 'CustomerId': item.customerId, 'ProductId': item.productId, 'StoreId': item.storeId, 'DateSold': item.date };
            $.ajax({
                url: "/Sales/EditSale",
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
            url: "/Sales/DeleteSale",
            type: "GET",
            data: { 'id': id },
            success: function (data) {
                this.setState({ Success: data })
                window.location.reload()
            }.bind(this)
        });
    }

    dateFormat(tempDate) {
        var converted = parseInt((tempDate.replace("/Date(", "").replace(")/", "")));
        var temp = new Date(converted);
        const monthName = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const dt = new Date(converted);
        var date = (temp.getDate() + " " + monthName[dt.getMonth()] + ", " + temp.getFullYear());
        return date;
    }
    dateEditFormat(tempDate) {
        var converted = parseInt((tempDate.replace("/Date(", "").replace(")/", "")));
        var temp = new Date(converted);
        var date = (temp.getDate() + "/" + (temp.getMonth() + 1) + "/" + temp.getFullYear()).toString();
        return date;
    }

    render() {

        const requiredItem = this.state.requiredItem;
        let modalData = this.state.sales[requiredItem];    

        let sales = this.state.sales;
        let tableData = null;

        if (sales != "") {
            tableData = sales.map((item, index) =>
                <tr key={index}>
                    <td className="two wide">{item.CustomerName}</td>
                    <td className="two wide">{item.ProductName}</td>
                    <td className="two wide">{item.StoreName}</td>
                    <td className="two wide">{this.dateFormat(item.DateSold)}</td>
                    <td className="two wide">
                        <Button color="yellow" data-toggle="modal" data-target="#editModal" 
                            onClick={() => this.replaceModalItem(index)}>

                            <i className="edit icon"></i>
                            Edit
                        </Button>
                        <SaleEdit
                            state={this.state}

                            id={modalData.Id}
                            customer={modalData.CustomerName}
                            product={modalData.ProductName}
                            store={modalData.StoreName}
                            date={this.dateEditFormat(modalData.DateSold)}
                            customerId={modalData.CustomerId}                           
                            productId={modalData.ProductId}                           
                            storeId={modalData.StoreId}                           
                            onEdit={this.onEdit}
                        />
                    </td>
                    <td className="two wide">
                        <Button color="red" data-toggle="modal" data-target="#deleteModal"
                            onClick={() => this.replaceModalItem(index)}>

                            <i className="trash icon"></i>
                            Delete
                        </Button>

                        <SaleDelete
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
                        <Button color='blue' data-toggle="modal" data-target="#createModal">New Sale</Button>
                    </div>
                    <SaleCreate
                        state={this.state}
                        onCreate={this.onCreate}
                    />
                </div>
                <br />
                <Table className="ui striped table">
                    <thead>
                        <tr>
                            <th className="two wide">Customer</th>
                            <th className="two wide">Product</th>
                            <th className="two wide">Store</th>
                            <th className="two wide">Date Sold</th>
                            <th className="two wide">Actions</th>
                            <th className="two wide">Actions</th>
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
export default SaleList;