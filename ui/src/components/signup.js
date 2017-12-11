import React, {Component} from 'react';
//import PropTypes from 'prop-types';
import Background from '../images.png';
import FB from '../filebox.png';



class SignUp extends Component {



    state = {
        firstname:'',
        lastname:'',
        email:'',
        password:'',
        interests:'',
        useroverview:'',
        education:'',
        contact:''
    };



    componentWillMount(){

    }
    onClick(event) {

        if(this.validate()){
            this.props.handleSignup(this.state);
            this.setState({firstname:'',lastname:'',email:'',password:''});
            //this.props.route("/signup");

            this.refs.firstname.value="";
            this.refs.lastname.value="";
            this.refs.email.value="";
            this.refs.password.value="";
            this.refs.interests.value=""
            this.refs.useroverview.value="";
            this.refs.education.value="";
            this.refs.contact.value=""
        }

    }

    validate(){
        if (this.state.firstname==='' || this.state.lastname==='' || this.state.email==='' || this.state.password==='' || this.state.interests===''){
            alert("Fields cannot be blank");
            return false;
        }

        return true;
    }

    render() {
        // var divStyle = {
        //     height: "500%",
        //     backgroundImage: 'url(' + Background + ')',
        //
        // };
        return (
           <div className="container">
               <div>
                   <img className="img-responsive " src="https://cfl.dropboxstatic.com/static/images/logo_catalog/dropbox_logo_glyph_2015_m1-vfleInWIl.svg" style={ {height:60,width:100}} alt=""  />
                   <img className="img-responsive " src={FB} style={ {height:80,width:100}} alt="" />

               </div>
            <div className="row">
                <div className="col-md-6 col-md-6 vert-offset-top-7">
                    {/*<img className="img-responsive " src={Background} alt=""/>*/}
                    <img alt="" src="https://cfl.dropboxstatic.com/static/images/empty_states/rebrand_m1/sign-in-illo-vfl_t3XMB.png"/>
                </div>

                <div className="col-md-6">
                <form>


                    <div className="rowC">
                        <h1 >Create an account </h1>or <a href="/login" >Sign in</a>

                    </div>
                        <div className="form-group">


                            <div className="controls">
                                <input type="text" id="firstname" name="firstname" ref="firstname" onChange={(event) => {
                                    this.setState({
                                        firstname: event.target.value
                                    });
                                }} placeholder="First name" className="form-control"/>
                            </div>
                        </div>
                        <div className="form-group">
                             <div className="controls">
                                <input type="text" id="lastname" name="lastname"  ref="lastname" onChange={(event) => {
                                    this.setState({
                                        lastname: event.target.value
                                    });
                                }} placeholder="Last name" className="form-control"/>
                            </div>
                        </div>

                        <div className="form-group">
                            <div className="controls">
                                <input type="email" id="email" name="email" ref="email" onChange={(event) => {
                                    this.setState({
                                        email: event.target.value
                                    });
                                }} placeholder="Email" className="form-control"/>
                            </div>
                        </div>

                        <div className="form-group">
                             <div className="controls">
                                <input type="password" id="password" name="password" ref="password" onChange={(event) => {
                                    this.setState({
                                        password: event.target.value
                                    });
                                }} placeholder="Password" className="form-control"/>
                            </div>
                        </div>


                    <div className="form-group">
                        <div className="controls">
                            <input type="text" id="interests" name="interests" ref="interests" onChange={(event) => {
                                this.setState({
                                    interests: event.target.value
                                });
                            }} placeholder="Interests" className="form-control"/>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="controls">
                            <input type="text" id="useroverview" name="useroverview" ref="useroverview" onChange={(event) => {
                                this.setState({
                                    useroverview: event.target.value
                                });
                            }} placeholder="UserOverview" className="form-control"/>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="controls">
                            <input type="text" id="education" name="education" ref="education" onChange={(event) => {
                                this.setState({
                                    education: event.target.value
                                });
                            }} placeholder="Education" className="form-control"/>
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="controls">
                            <input type="text" id="contact" name="contact" ref="contact" onChange={(event) => {
                                this.setState({
                                    contact: event.target.value
                                });
                            }} placeholder="Contact" className="form-control"/>
                        </div>
                    </div>


                        <div className="form-group modal-body row">


                            <div className="inline">
                                <button className="btn btn-primary" type="button"
                                        onClick={this.onClick.bind(this)}>Create an account</button>
                            </div>
                        </div>

                {this.state.message}

                </form>
                </div>
            </div>
           </div>
                );
    }
}

export default SignUp;