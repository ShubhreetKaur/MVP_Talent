import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Table, Button, Icon, Form, Modal } from 'semantic-ui-react';
const style = {
    top: 20 + '%'
}
class StoreEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            name: '',
            address: ''
        };
        this.onEdit = this.onEdit.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            id: nextProps.id,
            name: nextProps.name,
            address: nextProps.address,
        });
    }

    nameHandler(e) {
        this.setState({ name: e.target.value });
    }
    addressHandler(e) {
        this.setState({ address: e.target.value });
    }

    onEdit() {
        const item = this.state;
        this.props.onEdit(item);
    };

    render() {
        return (
            <React.Fragment>

                <div className="modal fade" id="editModal" size={'small'} style={style} role="dialog" aria-labelledby="editModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title" id="editModalLabel">Edit Store</h4>
                            </div>

                            <div className="modal-body">
                                <form>
                                    <div className="form-group">
                                        <label>NAME</label>
                                        <input type="text" className="form-control" value={this.state.name}
                                            onChange={(e) => this.nameHandler(e)}></input>
                                        <div style={{ color: 'red' }}>
                                            {this.props.state.nameError}
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label>ADDRESS</label>
                                        <input type="text" className="form-control" value={this.state.address}
                                            onChange={(e) => this.addressHandler(e)}></input>
                                        <div style={{ color: 'red' }}>
                                            {this.props.state.addressError}
                                        </div>
                                    </div>
                                </form>

                            </div>

                            <div className="modal-footer">
                                <Button color="black" data-dismiss="modal">Cancel
                                     {this.props.state.nameError = ""}
                                    {this.props.state.addressError = ""}
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
export default StoreEdit;