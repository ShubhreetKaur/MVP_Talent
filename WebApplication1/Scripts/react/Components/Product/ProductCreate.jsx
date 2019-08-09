import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Table, Button, Form, Modal } from 'semantic-ui-react';
const style = {
    top: 20 + '%'
}
class ProductCreate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            price: '',
        };
        this.onCreate = this.onCreate.bind(this);
    }
    nameHandler(e) {

        this.setState({ name: e.target.value });

    }
    priceHandler(e) {

        this.setState({ price: e.target.value });

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
                                <h4 className="modal-title" id="createModalLabel">Create Product</h4>
                            </div>

                            <div className="modal-body">
                                <Form>
                                    <div className="form-group">
                                        <label>NAME</label>
                                        <input type="text" className="form-control" name="ProductName" placeholder='Name'
                                            onChange={(e) => this.nameHandler(e)}></input>
                                        <div style={{ color: 'red' }}>
                                            {this.props.state.nameError}
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label>PRICE</label>
                                        <input type="text" className="form-control" name="ProductPrice" placeholder='Price'
                                            onChange={(e) => this.priceHandler(e)}></input>
                                        <div style={{ color: 'red' }}>
                                            {this.props.state.priceError}
                                        </div>
                                    </div>
                                </Form>
                            </div>
                            <div className="modal-footer">
                                <Button color="black" data-dismiss="modal">Cancel
                                    </Button>
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
export default ProductCreate;