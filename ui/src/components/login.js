import React, {Component} from 'react';
import PropTypes from 'prop-types';
//import Background from '../Dropbox-splash.jpg';
import FB from '../filebox.png';



class Login extends Component {

    static propTypes = {
        handleSubmit: PropTypes.func.isRequired
    };

    state = {
        email: '',
        password: ''
    };

    componentWillMount() {
        // if(localStorage.getItem("uname"))
        // {
        //     window.location.href = "/home";
        // }
        this.setState({
            email: '',
            password: ''
        });
    }


    render() {
        // var divStyle = {
        //     height: "500%",
        //     backgroundImage: 'url(' + Background + ')'
        // };
        return (

            <div className="container">
            <div className="change-Backgroundlogin" style={{backgroundColor: "#C71585"}}>
                <img className="img-responsive " src="https://cfl.dropboxstatic.com/static/images/logo_catalog/dropbox_logo_glyph_2015_m1-vfleInWIl.svg" style={ {height:60,width:100}} alt=""  />
                <img className="img-responsive " src={FB} style={ {height:80,width:100}} alt="" />

            </div>
                <div className="row"  >
               <div className="col-md-6 col-md-6 vert-offset-top-7 change-Backgroundlogin">
                    {/*<img className="img-responsive " src={Background} alt=""/>*/}
                   <img alt="" src="https://cfl.dropboxstatic.com/static/images/empty_states/rebrand_m1/sign-in-illo-vfl_t3XMB.png"/>
                </div>


                <div className="col-md-6 vert-offset-top-7 change-Backgroundlogin">
                    <form >
                        <div className="rowC">
                            <h1 >Sign in </h1>or <a href="/signup" >create an account</a>

                        </div>

                        <div className="form-group">
                            <input
                                className="form-control"
                                type="email"
                                label="Username"
                                placeholder="Enter email"
                                value={this.state.email}
                                onChange={(event) => {
                                    this.setState({
                                        email: event.target.value
                                    });
                                }}
                            />
                        </div>

                        <div className="form-group">
                            <input
                                className="form-control"
                                type="password"
                                label="password"
                                placeholder="Enter Password"
                                value={this.state.password}
                                onChange={(event) => {
                                    this.setState({
                                        password: event.target.value
                                    });
                                }}
                            />
                        </div>
                        <div className="modal-body row">
                            <button
                                className="btn btn-primary"
                                type="button"
                                onClick={() => this.props.handleSubmit(this.state)}>
                                Sign in
                            </button>


                        </div>

                    </form>
                </div>
            </div>
            </div>
        );
    }
}

export default Login;