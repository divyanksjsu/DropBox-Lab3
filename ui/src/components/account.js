import React from 'react';
//import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Button from 'material-ui/Button';
import Dialog from 'material-ui/Dialog';
import List, { ListItem, ListItemText } from 'material-ui/List';
import * as API from '../api/API';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import Typography from 'material-ui/Typography';
import CloseIcon from 'material-ui-icons/Close';
import Slide from 'material-ui/transitions/Slide';


const styles = {
    appBar: {
        position: 'relative',
    },
    flex: {
        flex: 1,
    },
};

class accountDialog extends React.Component {
    state = {
        open: false,
        activities:[]
    };

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleRequestClose1 = () => {
        this.setState({ open: false });
        this.props.ss(false);
    };


    renderAccountList () {
        if (this.state.activities.length!==0) {
            return (


                <List>
                    <h1>About</h1>
                    <ListItem>
                        <ListItemText primary="Interests" secondary={this.state.activities[0]}  />
                        <ListItemText primary="User Overview" secondary={this.state.activities[1]}  />
                        <ListItemText primary="Education" secondary={this.state.activities[2]}  />
                        <ListItemText primary="Contact" secondary={this.state.activities[3]}  />
                    </ListItem>

                </List>
            )
        }

        return <p>No Account info, come back later.</p>
    }

    componentWillMount(){
        API.getAccountInfo(this.props.username)
            .then((res) => {
                this.setState({activities:res});
                console.log("account",this.state.activities);
            });
    }

    render() {
        const { classes } = this.props;
        return (
            <div>
                <Button onClick={this.handleClickOpen}>My Account Info</Button>
                <Dialog
                    fullScreen
                    open={this.state.open}
                    onRequestClose={this.handleRequestClose1}
                    transition={<Slide direction="up" />}
                >
                    <AppBar className={classes.appBar}>
                        <Toolbar>
                            <IconButton color="contrast" onClick={this.handleRequestClose1} aria-label="Close">
                                <CloseIcon />
                            </IconButton>
                            <Typography type="title" color="inherit" className={classes.flex}>
                                My Account
                            </Typography>

                        </Toolbar>
                    </AppBar>
                    {this.renderAccountList()}
                </Dialog>
            </div>
        );
    }
}



export default withStyles(styles)(accountDialog);