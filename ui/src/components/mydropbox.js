import React, {Component} from 'react';
import { Route, withRouter } from 'react-router-dom';
import * as API from '../api/API';
import Login from "./login";
import SignUp from "./signup";
import Message from "./Message";
import Home from "./Home";




class MyDropBox extends Component {

    state = {
        isLoggedIn: false,
        message: '',
        username: {}
    };

    handleLogin = (userdata) => {

        if(userdata.email!=='' && userdata.password!==''){
        API.doLogin(userdata)
            .then((res) => {
                if (res.status === 201) {
                    this.setState({
                        isLoggedIn: true,
                        message: "Welcome to my App..!!",
                        username: userdata.email
                    },function(){
                    this.props.history.push("/Home")});
                }
                else if (res.status === 401) {
                    this.setState({
                        isLoggedIn: false,
                        message: "Wrong username or password. Try again..!!"
                    });
                    alert("Wrong username or password. Try again..!!");
                }
            });
    }
    else
        {
            alert("Please enter both username and password")

        }
    };
    handleSignup = (userdata) => {
        console.log(userdata);
        API.Signup(userdata)
            .then((res) => {
                if (res.status === 201) {
                    this.setState({
                        isLoggedIn: true,
                        message: res.data,
                        username: userdata.username
                    });
                    //this.props.history.push("/welcome");
                }
                else if (res.status === 401) {
                    this.setState({
                        isLoggedIn: false,
                        message: "An error occured..!!"
                    });
                }
            });
    };

    isEmpty(obj) {
        for(var prop in obj) {
            if(obj.hasOwnProperty(prop))
                return false;
        }

        return true;
    }



    render() {
        return (
            <div className="container-fluid">
                <Route exact path="/" render={() => (
                    <div>
                        {this.props.history.push("/login")}
                    </div>
                )}/>

                <Route exact path="/login" render={() => (
                    <div>
                        <Login  handleSubmit={this.handleLogin} route={this.props.history.push}/>
                    </div>
                )}/>

                <Route exact path="/signup" render={() => (
                    <div>
                        <SignUp handleSignup={this.handleSignup}  route={this.props.history.push} />
                        <Message message={this.state.message}/>
                    </div>
                )}/>

                <Route exact path="/Home" render={() => (
                    <div>
                        <Home username={this.state.username}  route={this.props.history.push}/>
                    </div>
                )}/>





            </div>
        );
    }
}

export default withRouter(MyDropBox);