import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Table, Button, Form, Modal } from 'semantic-ui-react';
const style = {
    top: 20 + '%'
}
class StoreCreate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            address: '',
        };
        this.onCreate = this.onCreate.bind(this);
    }
    nameHandler(e) {

        this.setState({ name: e.target.value });

    }
    addressHandler(e) {

        this.setState({ address: e.target.value });

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
                                <h4 className="modal-title" id="createModalLabel">Create Store</h4>
                            </div>

                            <div className="modal-body">
                                <Form>
                                    <div className="form-group">
                                        <label>NAME</label>
                                        <input type="text" className="form-control" name="StoreName" placeholder='Name'
                                            onChange={(e) => this.nameHandler(e)}></input>
                                        <div style={{ color: 'red' }}>
                                            {this.props.state.nameError}
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label>ADDRESS</label>
                                        <input type="text" className="form-control" name="StoreAddress" placeholder='Address'
                                            onChange={(e) => this.addressHandler(e)}></input>
                                        <div style={{ color: 'red' }}>
                                            {this.props.state.addressError}
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
export default StoreCreate;