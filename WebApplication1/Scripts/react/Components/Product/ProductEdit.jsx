import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Table, Button, Icon, Form, Modal } from 'semantic-ui-react';
const style = {
    top: 20 + '%'
}
class ProductEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            name: '',
            price: ''
        };
        this.onEdit = this.onEdit.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            id: nextProps.id,
            name: nextProps.name,
            price: nextProps.price,
        });
    }

    nameHandler(e) {
        this.setState({ name: e.target.value });
    }
    priceHandler(e) {
        this.setState({ price: e.target.value });
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
                                <h4 className="modal-title" id="editModalLabel">Edit Product</h4>
                            </div>

                            <div className="modal-body">
                                <form>
                                    <div className="form-group">
                                        <label>NAME</label>
                                        <input type="text" className="form-control" value={this.state.name}
                                            onChange={(e) => this.nameHandler(e)}></input>
                                         <div style={{ color: 'red' }}>
                                                 { this.props.state.nameError }
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label>PRICE</label>
                                        <input type="text" className="form-control" value={this.state.price}
                                            onChange={(e) => this.priceHandler(e)}></input>
                                        <div style={{ color: 'red' }}>
                                            {this.props.state.priceError}
                                        </div>
                                    </div>
                                </form>

                            </div>

                            <div className="modal-footer">
                                 <Button color="black" data-dismiss="modal">Cancel
                                     {this.props.state.nameError = ""}
                                     {this.props.state.priceError = ""}
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
export default ProductEdit;