import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Table, Button, Form, Modal } from 'semantic-ui-react';
const style = {
    top: 10 + '%'
}
const dropDownStyle = {
    width:1000
    }
class SaleCreate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            date: '',
            customerId: '',
            productId: '',
            storeId: '',
        };

        this.onCreate = this.onCreate.bind(this);
    }
    dateHandler(e) {
        this.setState({ date: e.target.value });
    }
    customerHandler(e) {
        this.setState({ customerId: e.target.value });
    }
    productHandler(e) {
        this.setState({ productId: e.target.value });

    }
    storeHandler(e) {
        this.setState({ storeId: e.target.value });

    }
    onCreate() {
        const item = this.state;
        this.props.onCreate(item);
    }
    render() {
        return (

            <React.Fragment>
                <div className="modal fade" id="createModal" size="small" style={style} role="dialog" aria-labelledby="createModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title" id="createModalLabel">Create Sales</h4>
                            </div>

                            <div className="modal-body">
                                <Form>
                                    <div className="form-group">
                                        <label>DATE SOLD</label>
                                        <input type="date" className="form-control" name="Date Sold" placeholder='Date'
                                            onChange={(e) => this.dateHandler(e)}
                                        ></input>
                                        <div style={{ color: 'red' }}>
                                            {this.props.state.dateError}
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="font-noraml">Customer</label>
                                        <div className="input-group">
                                            <select id="customer.Id" className="form-control chosen-select" placeholder="Customer" style={dropDownStyle}
                                                onChange={(e) => this.customerHandler(e)}>
                                                <option value=""></option>
                                            {this.props.state.customers.map((customer) =>
                                                <option value={customer.Id}
                                                    key={customer.Id}>{customer.Name}</option>
                                                )}
                                            </select>
                                            <div style={{ color: 'red' }}>
                                                {this.props.state.customerError}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="font-noraml">Product</label>
                                        <div className="input-group">
                                            <select id = "product.Id" data-placeholder="Product" className="form-control chosen-select" style={dropDownStyle}
                                                onChange={(e) => this.productHandler(e)}>
                                                <option value=""></option>
                                                {this.props.state.products.map((product) =>
                                                    <option value={product.Id}
                                                        key={product.Id}>{product.Name}</option>
                                                )}
                                            </select>
                                            <div style={{ color: 'red' }}>
                                                {this.props.state.productError}
                                            </div>
                                        </div>
                                    </div><div className="form-group">
                                        <label className="font-noraml">Store</label>
                                        <div className="input-group">
                                            <select id = "store.Id" data-placeholder="Store" className="form-control chosen-select" style={dropDownStyle}
                                                onChange={(e) => this.storeHandler(e)}
                                                >
                                                <option value=""></option>
                                                {this.props.state.stores.map((store) =>
                                                    <option value={store.Id} key={store.Id} >{store.Name}</option>
                                                )}
                                            </select>
                                            <div style={{ color: 'red' }}>
                                                {this.props.state.storeError}
                                            </div>
                                        </div>
                                    </div>
                                </Form>
                            </div>
                            <div className="modal-footer">
                                <Button color="black" data-dismiss="modal">Cancel</Button>
                                <Button onClick={this.onCreate} className="ui green button"
                                    icon='checkmark'
                                    labelPosition='right'
                                    content="Create">
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}
export default SaleCreate;