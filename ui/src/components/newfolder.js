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
        if(this.state.textFieldValue!=='' && event.target.innerHTML==="Add"){
            console.log(this.state.textFieldValue);
            this.props.add(this.state.textFieldValue,this.state.username);
        }
        //console.log(this.state.textFieldValue);
    };



    render() {
        return (
            <div>
                <Button className="bg-primary vert-offset-top-1"  onClick={this.handleClickOpen}>New Shared Folder</Button>
                <Dialog open={this.state.open} onRequestClose={this.handleRequestClose}>
                    <DialogTitle>Create new shared folder</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Enter folder name:
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            onChange={e => this.setState({ textFieldValue: e.target.value })}
                            type="text"
                            fullWidth
                        />
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