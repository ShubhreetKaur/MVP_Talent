import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Table, Button, Form, Modal } from 'semantic-ui-react';
const style = {
    top: 10 + '%'
}
const dropDownStyle = {
    width: 1000
}
class SaleEdit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            customerId: '',
            productId: '',
            storeId: '',
            date: '',
            customer: '',
            product: '',
            store: '',
      };
        this.onEdit = this.onEdit.bind(this);
    }


    componentWillReceiveProps(nextProps) {
        this.setState({
            id: nextProps.id,
            customer: nextProps.customer,
            product: nextProps.product,
            store: nextProps.store,
            date: nextProps.date,
            customerId: nextProps.customerId,
            productId: nextProps.productId,
            storeId: nextProps.storeId,
        });
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

    onEdit() {
      const item = this.state;
        this.props.onEdit(item);
    };
    render() {
        return (
            <React.Fragment>
                <div className="modal fade" id="editModal" size="small" style={style} role="dialog" aria-labelledby="editModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title" id="editModalLabel">Edit Sales</h4>
                            </div>

                            <div className="modal-body">
                                <Form>
                                    <div className="form-group">
                                        <label>DATE SOLD</label>
                                        <input type="text" className="form-control" value={this.state.date}
                                            onChange={(e) => this.dateHandler(e)}
                                        ></input>
                                        <div style={{ color: 'red' }}>
                                            {this.props.state.dateError}
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="font-noraml">Customer</label>
                                        <div className="input-group">
                                            <select className="form-control chosen-select" style={dropDownStyle} value={this.state.customerId}
                                                onChange={(e) => this.customerHandler(e)}>
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
                                            <select className="form-control chosen-select" style={dropDownStyle} value={this.state.productId}
                                                onChange={(e) => this.productHandler(e)}>
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
                                            <select className="form-control chosen-select" style={dropDownStyle} value={this.state.storeId}
                                                onChange={(e) => this.storeHandler(e)}>
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
                                <Button color="black" data-dismiss="modal">Cancel
                                     {this.props.state.dateError = ""}
                                    {this.props.state.customerError = ""}
                                    {this.props.state.productError = ""}
                                    {this.props.state.storeError = ""}
                                    </Button>
                                <Button onClick={this.onEdit} className="ui green button"
                                    icon='checkmark'
                                    labelPosition='right'
                                    content="Edit">
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>

            </React.Fragment>
        );
    }
}
export default SaleEdit;