import React from 'react';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import Dialog, {
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from 'material-ui/Dialog';

export default class FormDialog extends React.Component {
    state = {
        open: false,
        textFieldValue:'',
        username:''
    };

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleRequestClose = (event) => {
        this.setState({ open: false });
        console.log("action",event.target.innerHTML);
        if(this.state.username!=='' && event.target.innerHTML==="Add"){
            console.log("newmemberdialog",this.state.username);
            this.props.addm(this.props.foldername,this.state.username);
        }
        //console.log(this.state.textFieldValue);
    };



    render() {
        return (
            <div>
                <Button className="bg-primary vert-offset-top-1"  onClick={this.handleClickOpen}><i className="fa fa-user" >+</i></Button>
                <Dialog open={this.state.open} onRequestClose={this.handleRequestClose}>
                    <DialogTitle><i className="fa fa-user" aria-hidden="true"> Add New Member</i></DialogTitle>
                    <DialogContent>

                        <DialogContentText>
                            Enter username:
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="uname"
                            onChange={e => this.setState({ username: e.target.value })}
                            type="text"
                            fullWidth
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleRequestClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={this.handleRequestClose} color="primary">
                            Add
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}