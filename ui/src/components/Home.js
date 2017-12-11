import React, {Component} from 'react';
import * as API from '../api/API';


import { withRouter } from 'react-router-dom';
import TextField from 'material-ui/TextField';
import Typography from 'material-ui/Typography';
import Background from '../small db.png';
// import arrow from '../565629-200.png';
// import Dropdown from 'react-dropdown';
import Button from 'material-ui/Button';
import Menu, { MenuItem } from 'material-ui/Menu';
//import FolderTree from 'react-folder-tree';
import NewFolder from './newfolder';
import FolderIcon from 'material-ui-icons/Folder';
import Share from './share';
import Account from './account';
import AddMember from './addmember';
import fileDownload from 'react-file-download';
import Activity from './activities';
import Notification from './notification';
import NestedFolders from './nestedfolders';

var myusername;
// const options = [
//     'one', 'two', 'three'
// ];
class Home extends Component {

    state={
        files:[],
        starrredfiles:[],
        folders:[],
        anchorEl: null,
        open: false,
        notif:false,
        notifmessage:'',
        path:""
    };
    handleClick = event => {
        this.setState({ open: true, anchorEl: event.currentTarget });

    };


    handleRequestClose = (event) => {
        //this.setState({ open: false });
        const menuvalue=event.target.innerText;
        console.log("my",event.target.innerText);
        if(menuvalue==="Logout")
        {
            this.setState({ open: false });
            API.Logout();
            localStorage.removeItem("uname");
            this.props.route("/login");
        }
        if(menuvalue==="")
        {
            this.setState({ open: false });

        }

    };
    ss=(val)=>{

        this.setState({ open: val });
        this.setState({notif:false});
    };

    handleFileUpload = (event) => {

        const payload = new FormData();
        var f = event.target.files[0];

        if(!this.isEmpty(f.name)){
            console.log(f.name);
        }else{
            console.log();
        }
        payload.append('mypic', event.target.files[0]);
        payload.append('uploadpath', this.state.path);
        console.log(payload);
        API.uploadFile(payload)
            .then((res) => {
                var x=this.state.path;
                this.setState({path:""});

                if (res.status === 201) {
                    API.addActivity(myusername, f.name, "added");

                    console.log("done");
                    if (x==="") {
                        this.setState({files: this.state.files.concat([f.name])});
                        this.setState({notifmessage: "File uploaded successfully"}, () =>
                            this.setState({notif: true}));
                    }
                    else
                    {
                        this.setState({notifmessage: "File uploaded inside folder: "+x}, () =>
                            this.setState({notif: true}));
                    }

                }
            });

    };



    removefile(filename){

        API.deleteFile(myusername,filename)
            .then((res) => {
                if (res.status === 201) {
                    this.unStarFile(filename);
                    this.setState({files:this.state.files.filter(file => file !== filename)});
                    API.addActivity(myusername,filename,"deleted");
                    console.log("file deletion done");
                    this.setState({notifmessage:"File removed successfully"},()=>
                        this.setState({notif:true}));

                }
            });


    }

    addStarredFile(index){
        let itemtobeadded=this.state.files[index];
        console.log("inside starred file");
        console.log(itemtobeadded);
        API.addstarfile(itemtobeadded,myusername)
            .then((res) => {
                if (res.status === 201) {

                    this.setState({starrredfiles: this.state.starrredfiles.concat([itemtobeadded])});
                    console.log("file star done");

                }
            });

    }
    unStarFile(filename){

        console.log("inside deletestarred file");
        API.deletestarfile(myusername,filename)
            .then((res) => {
                if (res.status === 201) {

                    this.setState({starrredfiles: this.state.starrredfiles.filter(sf => sf !==filename )});
                    console.log("delete star done");

                }
            });

    }
    isEmpty(obj) {
        for(var prop in obj) {
            if(obj.hasOwnProperty(prop))
                return false;
        }

        return true;
    }

    addFolder(foldername,otheruser) {
        console.log("new folder from Home:",foldername);

        console.log("inside add folder Home.js");

        API.addnewfolder(foldername,myusername,otheruser)
            .then((res) => {
                if (res.status === 201) {
                    console.log(this.state.folders);
                    this.setState({folders: this.state.folders.concat([foldername])});
                    console.log("new folder finally added");

                }
            });
    }
    addMember(foldername,otheruser) {
        console.log("add member from Home:",foldername);

        console.log("inside add member Home.js");

        API.addnewmember(foldername,otheruser)
            .then((res) => {
                if (res.status === 201) {
                    console.log(this.state.folders);
                    //this.setState({folders: this.state.folders.concat([foldername])});
                    console.log("new member finally added");
                    alert("new member added successfully");

                }
            });
    }
    share(filename,email)
    {
        API.sendemail(filename,email)
            .then((res) => {
                if (res.status === 201) {

                    console.log("sent email finally");
                    var ms="Successfully sent file to: "+email;
                    alert(ms);

                }
            });
    }
    deletegroup(foldername)
    {
        API.Deletegroup(foldername,myusername)
            .then((res) => {
                if (res.status === 201) {
                    alert("Folder successfully deleted");
                    API.getfolders(myusername)
                        .then((folders) => {
                            this.setState({folders:folders});
                            console.log("got ur folders:"+folders.length);
                            if (folders.length!==0 && folders[0]!==''){
                                console.log("printing files");
                                this.setState({folders:folders});
                            }


                        });
                }
            });
    }
    constructor(props,context) {
        super(props,context);
        console.log("prop",this.props.username);
        this.addFolder = this.addFolder.bind(this);
        this.addMember = this.addMember.bind(this);
        if(!this.isEmpty(this.props.username)){
            console.log("props username not empty..setting session");
            window.localStorage.setItem("uname", this.props.username);
            myusername = this.props.username;
        }
        else {
            if(!window.localStorage.getItem("uname") )
                {
                    console.log("in checking props and redirecting to login");
                    //this.props.route("/login");

                    window.location.href = "/login";
                }
            else
                {
                    myusername = window.localStorage.getItem("uname");
                }


            }

    }

    componentDidMount(){

        API.getmyfiles(myusername)
            .then((files) => {

                    console.log("got ur files:::"+files);
                    if (files.length!==0){
                        console.log("printing files");
                        this.setState({files:files});
                    }


            });
        API.getstarredfiles(myusername)
            .then((files) => {

                console.log("got ur * files:::"+files.length);
                if (files.length!==0 && files[0]!==''){
                    console.log("printing files");
                    this.setState({starrredfiles:files});
                }


            });
        API.getfolders(myusername)
            .then((folders) => {

                console.log("got ur folders:"+folders.length);
                if (folders.length!==0 && folders[0]!==''){
                    console.log("printing files");
                    this.setState({folders:folders});
                }


            });

    }

    renderFileList () {


            if (this.state.files.length!==0 || this.state.folders.length!==0) {
                return (


                    <div className="table-responsive">

                        <table className="table table-striped table_outer">
                            <thead><tr><th className="text-center">Recent Files</th></tr></thead>
                            <tbody>
                            {this.state.folders.map((ci,index) =>

                                <div className="panel panel-default" >

                                <tr className="row"   key={ci}  >
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

                                        <FolderIcon/>{ci}<NestedFolders username={myusername} foldername={ci}/>




                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

                                        <AddMember addm={this.addMember} foldername={ci}/>
                                        <button className="btn btn-warning btn-sm" style={{height:"35px",marginTop:"18px"}}
                                                onClick={() => {this.deletegroup(ci)}}><i className="fa fa-trash"></i>
                                        </button>
                                </tr>

                                            </div>




                            )}


                            {this.state.files.map((ci,index) =>
                                <tr className="row" key={ci}  >
                                    <td className="col-md-6">{ci}</td>

                                    <div>

                                    <td className="col-md-6">
                                        <button className="btn btn-warning btn-sm"
                                                onClick={() => {this.addStarredFile(index)}}> &#9733;
                                        </button>
                                        <button className="btn btn-danger btn-sm"
                                                onClick={() => {this.removefile(ci)}}> <i className="fa fa-trash"></i>
                                        </button>
                                        <button className="btn btn-info btn-sm"
                                                onClick={() => {
                                                    API.downloadFile(myusername,ci)
                                                    .then((res) => {

                                                        console.log("file:"+res);
                                                        fileDownload(res.data,ci);

                                                    });
                                                }}> <i className="fa fa-arrow-down"></i>
                                        </button>


                                    </td>
                                    </div>
                                    <div>
                                        <Share share={this.share} filename={ci}/>
                                    </div>

                                </tr>
                            )}

                            </tbody>
                        </table>

                    </div>

                )
            }

        return <p>Not uploaded a file yet? Try uploading a file.</p>
    }

    renderStarFileList () {
        if (this.state.starrredfiles.length!==0) {
            return (

                <div className="table-responsive">

                    <table className="table table-striped table_outer">
                        <thead><tr><th className="text-center">Starred Files</th></tr></thead>
                        <tbody>

                        {this.state.starrredfiles.map((ci,index) =>
                            <tr className="row" key={ci}  >
                                <td className="col-md-6">{ci}</td>

                                <td className="col-md-6">
                                    <button className="btn btn-warning btn-sm"
                                            onClick={() => {this.unStarFile(ci)}}>☆
                                    </button>
                                </td>
                            </tr>
                        )}

                        </tbody>
                    </table>



                </div>

            )
        }

        return <p>When you star items, they’ll show up here for easy access.</p>
    }



    render() {

        return (
            <div className="container-fluid">
                <div className="navbar" style={{backgroundColor:"Blue", height:"140px", width:"1350px"}}>
                    <div className="img-responsive" >
                        <img className="img-responsive" style={{marginLeft: "550px", display: "flex"}} src={Background} alt=""/>
                    </div>
                </div>
                <div className="row">


                    <div className="col-md-3 change-Background">

                        <div className="text" >

                            <h1>Home </h1>
                            <h1>Files</h1>
                            <h1>Paper</h1>
                            <Notification notiftoggle={this.state.notif} ss={this.ss} message={this.state.notifmessage}/>

                        </div>

                    </div>

                    <div className="col-md-6">
                        <div className="col-md-1">
                            <h1 className="text" style={{marginLeft: "250px"}}><strong>Home</strong></h1>
                        </div>

                        {this.renderStarFileList()}

                        {this.renderFileList()}


                    </div>

                    <div className="col-md-3 change-Background">

                        <div className="form-group has-feedback">
                            <div className="input-group" style={{width:250}}>
                                <span className="input-group-addon" style={{backgroundColor: "#D3D3D3"}}><span role="img" aria-label="Search" className="glyphicon glyphicon-search">&#128269;</span></span>
                                <input type="text"  className="form-control" id="inputGroupSuccess1" placeholder="Search..." />
                            </div>
                        </div>


                        <div>
                            <Button
                                aria-owns={this.state.open ? 'simple-menu' : null}
                                aria-haspopup="true"
                                onClick={this.handleClick}
                                className="bg-primary"
                            >
                                {"My account"}
                            </Button>
                            <Menu
                                id="simple-menu"
                                anchorEl={this.state.anchorEl}
                                open={this.state.open}
                                onRequestClose={this.handleRequestClose}

                            >
                                <MenuItem  onClick={this.handleRequestClose}><Activity ss={this.ss} username={myusername}/></MenuItem>
                                <MenuItem  onClick={this.handleRequestClose}><Account ss={this.ss} username={myusername}/></MenuItem>
                                <MenuItem  onClick={this.handleRequestClose}>Logout</MenuItem>
                            </Menu>
                        </div>
                        <div className="vert-offset-top-7">
                            <div className="form-group">
                                <input
                                    className="form-control"
                                    type="text"
                                    label="uploadpath"
                                    placeholder="Upload path seperated by '/'"
                                    value={this.state.password}
                                    onChange={(event) => {
                                        this.setState({
                                            path:event.target.value
                                        });
                                    }}
                                />
                            </div>
                            <form>

                        <TextField
                            className={'fileupload'}
                            type="file"
                            name="mypic"


                            onChange={this.handleFileUpload}
                        />
                            </form>

                        </div>
                        <div className="">
                        <NewFolder add={this.addFolder}/>

                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(Home);