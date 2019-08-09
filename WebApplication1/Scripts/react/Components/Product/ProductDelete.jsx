import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Table, Button, Icon, Form, Modal } from 'semantic-ui-react';
const style = {
    top: 20 + '%'
}
class ProductDelete extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <React.Fragment>
                <div className="modal fade" id="deleteModal" size={'small'} style={style} role="dialog" aria-labelledby="deleteModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title" id="deleteModalLabel">Delete Product</h4>
                            </div>
                            <div className="modal-body">
                                Are you sure?
                            </div>
                            <div className="modal-footer">
                                <Button color="black" data-dismiss="modal">Cancel</Button>
                                <Button onClick={() => this.props.onDelete(this.props.id)} className="ui red button"
                                    icon='delete'
                                    labelPosition='right'
                                    content="Delete">
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}
export default ProductDelete;