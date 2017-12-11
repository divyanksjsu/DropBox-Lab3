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
import * as API from '../api/API';

const styles = {
    appBar: {
        position: 'relative',
    },
    flex: {
        flex: 1,
    },
};

class FullScreenDialog extends React.Component {
    state = {
        open: false,
        activities:[]
    };

    handleClickOpen = () => {
        this.setState({ open: true });
    };

    handleRequestClose = () => {
        this.setState({ open: false });
        this.props.ss(false);
    };

    componentWillMount(){
        API.getActivities(this.props.username)
            .then((res) => {
                this.setState({activities:res});
                console.log("got activities",this.state.activities);
            });
    }

    renderActivityList () {
        if (this.state.activities.length!==0) {
            return (
                <div className="container">
                    <div className="row">
                <List>{
                    this.state.activities.map((ci,index) =>

                    <ListItem key={ci}>
                        <ListItemText primary={ci}  />
                    </ListItem>

                )}
        </List>
                    </div>
                </div>
            )
        }

        return <p>No Activities, come back later.</p>
    }

    render() {
        const { classes } = this.props;
        return (

            <div>
                <Button onClick={this.handleClickOpen}>Activities</Button>
                <Dialog
                    fullScreen
                    open={this.state.open}
                    onRequestClose={this.handleRequestClose}
                    //transition={<Slide direction="up" />}
                    style={{ overflowX: 'hidden', overflowY: 'auto' }}
                >
                    <AppBar className={classes.appBar}>
                        <Toolbar>
                            <IconButton color="contrast" onClick={this.handleRequestClose} aria-label="Close">
                                <CloseIcon />
                            </IconButton>
                            <Typography type="title" color="inherit" className={classes.flex}>
                                My Activities
                            </Typography>

                        </Toolbar>
                    </AppBar>
                    {this.renderActivityList()}
                </Dialog>
            </div>

        );
    }
}



export default withStyles(styles)(FullScreenDialog);