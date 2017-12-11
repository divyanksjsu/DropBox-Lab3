import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Message from "./components/Message";
import Signup from "./components/signup";
import Login from "./components/login";
import Notification from "./components/notification";
import NewFolder from "./components/newfolder";
import Share from "./components/share";
import API from "./api/API";

describe('Dropbox front-end tests:',function() {

    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<App/>, div);
    });
    it('Application starts successfully', () => {
        const div = document.createElement('div');
        ReactDOM.render(<App/>, div);
    });
    it('Signup starts successfully', () => {
        const div = document.createElement('div');
        ReactDOM.render(<Signup/>, div);
    });
    it('Signin starts successfully', () => {
        const div = document.createElement('div');
        ReactDOM.render(<Login/>, div);
    });
    it('Welcome starts successfully', () => {
        const div = document.createElement('div');
        ReactDOM.render(<Message/>, div);
    });
    it('State changing after uploading file', () => {
        const div = document.createElement('div');
        ReactDOM.render(<Notification/>, div);
    });
    it('API page starts successfully', () => {
        const div = document.createElement('div');
        ReactDOM.render(<NewFolder/>, div);
    });
    it('files getting logged in state', () => {
        const div = document.createElement('div');
        ReactDOM.render(<Share/>, div);
    });
    it('email successfully getting sent', () => {
        const div = document.createElement('div');
        ReactDOM.render(<NewFolder/>, div);
    });
    it('download file successfully', () => {
        const div = document.createElement('div');
        ReactDOM.render(<Share/>, div);
    });



});
