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
        email:''
    };

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleRequestClose = (event) => {
        this.setState({ open: false });
        console.log("action",event.target.innerHTML);
        if(this.state.email!=='' && event.target.innerHTML==="Send file"){
            console.log("newmemberdialog",this.state.email);
            this.props.share(this.props.filename,this.state.email);
        }
        //console.log(this.state.textFieldValue);
    };



    render() {
        return (
            <div>
                <button className="bg-primary vert-offset-top-1" style={{height:"30px"}} onClick={this.handleClickOpen}><i className="fa fa-share"></i></button>
                <Dialog open={this.state.open} onRequestClose={this.handleRequestClose}>
                    <DialogTitle><i className="fa fa-envelope" aria-hidden="true"> Share with an e-mail</i></DialogTitle>
                    <DialogContent>

                        <DialogContentText>
                            Enter email:
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="uname"
                            onChange={e => this.setState({ email: e.target.value })}
                            type="text"
                            fullWidth
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleRequestClose} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={this.handleRequestClose} color="primary">
                            Send file
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}