import React from 'react';

import { withStyles } from 'material-ui/styles';

import Snackbar from 'material-ui/Snackbar';
import IconButton from 'material-ui/IconButton';
import CloseIcon from 'material-ui-icons/Close';

const styles = theme => ({
    close: {
        width: theme.spacing.unit * 4,
        height: theme.spacing.unit * 4,
    },
});

class SimpleSnackbar extends React.Component {
    state = {
        open: false,
    };

    handlenotifClick = () => {
        this.setState({ open: true });
    };

    handleRequestClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        //console.log(reason,event.target.innerText);
        this.props.ss(false);

    };

    constructor(props){
        super(props);
        this.handlenotifClick=this.handlenotifClick.bind(this);

    }



    render() {
        const { classes } = this.props;
        return (
            <div>

                <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    open={this.props.notiftoggle}
                    autoHideDuration={3000}
                    onRequestClose={this.handleRequestClose}
                    SnackbarContentProps={{
                        'aria-describedby': 'message-id',
                    }}
                    message={<span id="message-id">{this.props.message}</span>}
                    action={[

                        <IconButton
                            key="close"
                            aria-label="Close"
                            color="inherit"
                            className={classes.close}
                            onClick={this.handleRequestClose}
                        >
                            <CloseIcon />
                        </IconButton>,
                    ]}
                />
            </div>
        );
    }
}



export default withStyles(styles)(SimpleSnackbar);