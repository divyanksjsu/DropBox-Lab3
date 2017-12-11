import React from 'react';
//import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import Dialog from 'material-ui/Dialog';
import List, { ListItem, ListItemText } from 'material-ui/List';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import Typography from 'material-ui/Typography';
import CloseIcon from 'material-ui-icons/Close';
import Slide from 'material-ui/transitions/Slide';
import TextField from 'material-ui/TextField';
import * as API from '../api/API';

const styles = {
    appBar: {
        position: 'relative',
    },
    flex: {
        flex: 1,
    },
};
var originalpath="/";

class FullScreenDialog extends React.Component {
    state = {
        open: false,
        folders:[],
        folderpath:'/'+this.props.foldername+"/",
        files:[]
    };

    handleClickOpen = () => {
        //this.setState({ open: true });
        API.getnestedfolders(this.props.username, this.props.foldername+"/")          //callback
            .then((res) => {
                this.setState({folders: res,folderpath: this.props.foldername+"/"},()=>{});
                console.log("nested folders", this.state.folders);

            });
        API.getnestedfiles(this.props.username, this.props.foldername+"/")          //callback
            .then((res) => {
                this.setState({files: res,folderpath: this.props.foldername+"/"},()=>{this.setState({ open: true });});
                //console.log("nested files final", this.state.files);
            });
    };

    handleRequestClose = () => {
        this.setState({ open: false });
        //this.props.ss(false);
    };

    handlefolderOpen=(foldername)=> {
        console.log("foldername", foldername);


        this.setState({folderpath: this.state.folderpath + foldername + "/"}, () => {

            API.getnestedfolders(this.props.username, this.state.folderpath)          //callback
                .then((res) => {
                    this.setState({folders: res});
                    console.log("nested folders", this.state.folders);
                });
            API.getnestedfiles(this.props.username, this.state.folderpath)          //callback
                .then((res) => {
                    this.setState({files: res});
                    console.log("nested files final", this.state.files);
                });

        })
    }



    // componentDidMount(){
    //     this.setState({folderpath:this.state.folderpath+this.props.foldername+"/"});
    //
    // }

    renderFolderList () {
        if (this.state.folders.length!==0 || this.state.files.length!==0) {
            return (
                <div>
                <List>{
                    this.state.folders.map((ci,index) =>

                        <ListItem key={ci}>
                            <div>
                            <ListItemText primary={ci }   />
                            <button className="bg-primary" onClick={()=>this.handlefolderOpen(ci)}>Open Folder</button>
                            </div>


                        </ListItem>

                    )}
                </List>
                <List>{
                        this.state.files.map((ci,index) =>

                            <ListItem key={ci}>
                                <div>
                                    <ListItemText primary={ci }   />

                                </div>


                            </ListItem>

                        )}
                </List>
                </div>

            )
        }

        return <p>No Files or Folders, Try adding them.</p>
    }

    render() {
        const { classes } = this.props;
        return (
            <div>
                <button  onClick={this.handleClickOpen}>Open</button>
                <Dialog
                    fullScreen
                    open={this.state.open}
                    onRequestClose={this.handleRequestClose}
                    transition={<Slide direction="up" />}
                >
                    <AppBar className={classes.appBar}>
                        <Toolbar>
                            <IconButton color="contrast" onClick={this.handleRequestClose} aria-label="Close">
                                <CloseIcon />
                            </IconButton>
                            <Typography type="title" color="inherit" className={classes.flex}>
                                Open Folder
                            </Typography>

                        </Toolbar>
                    </AppBar>
                    {this.renderFolderList()}
                </Dialog>
            </div>
        );
    }
}



export default withStyles(styles)(FullScreenDialog);