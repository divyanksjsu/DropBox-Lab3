import axios from 'axios';

const api = process.env.REACT_APP_CONTACTS_API_URL || 'http://localhost:3456';


const headers = {
    'Accept': 'application/json'
};

export const doLogin = (payload) =>
    fetch(`${api}/users/dologin`, {
        method: 'POST',
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        credentials:'include',
        body: JSON.stringify(payload)
    }).then(res => {
        console.log(res);
        return res;
    })
        .catch(error => {
            console.log("This is error");
            return error;
        });

export const Signup = (payload) =>
    axios.post(api + '/users/signup', payload)
        .then(res => {
            console.log('response from server signup', res.data.message);
            return res;
        })
        .catch(error => {
            console.log("This is error");
            return error;
        });

export const uploadFile = (payload) =>
    axios.post(api + '/files/upload', payload,{withCredentials:true})
        .then(res => {
            console.log('response from server fileupload', res.data);

            return res;
        })
        .catch(error => {
            console.log(error,"This is error in fileupload API");
            return error;
        });
export const deleteFile = (un,fn) =>
    axios.post(api + '/files/deletefile', {username:un,filename:fn})
        .then(res => {
            console.log('response from server deletefile', res.data.message);

            return res;
        })
        .catch(error => {
            console.log("This is error in deletefile API");
            return error;
        });
export const downloadFile = (username,filename) =>
    axios.post(api + '/files/download', {uname:username,filename:filename})
        .then(res => {
            console.log('response from server filedownload', res);

            return res;
        })
        .catch(error => {
            console.log("This is error in filedownload API");
            return error;
        });
export const addActivity = (username,filename,acttype) =>
    axios.post(api + '/files/addactivity', {uname:username,filename:filename,type:acttype})

        .catch(error => {
            console.log("This is error in filedownload API");
            return error;
        });
export const getActivities = (username) =>
    axios.post(api + '/files/getactivity', {uname:username})
        .then(res => {
            console.log('response from server getActivities', res);
            if (res.data.length!==0){
                //var array = res.data.split('<br>');
                //array.length=array.length-1;
                //console.log(array);
                return res.data;
            }
            else
            {
                return [];
            }
        })
        .catch(error => {
            console.log("This is error in getActivities API");
            return error;
        });

export const getAccountInfo = (username) =>
    axios.post(api + '/files/getAccountinfo', {uname:username})
        .then(res => {
            console.log('response from server getAccountInfo', res);
            if (res.data.length!==0){
                console.log(JSON.stringify(res.data));
                return res.data;
            }
            else
            {
                return [];
            }
        })
        .catch(error => {
            console.log("This is error in getActivities API");
            return error;
        });

export const getmyfiles = (uname) =>
    axios.post(api + '/files/myfiles',{uname:uname})
        .then(res => {
            console.log('response from server getmyfiles in API call', res.data);
            if (res.data.length!==0){
                // var array = res.data.split('<br>');
                // array.length=array.length-1;
                // console.log(array);
                return res.data;
            }
            else
            {
                return [];
            }
        })
        .catch(error => {
            console.log("This is error");
            return [];
        });
export const getstarredfiles = (uname) =>
    axios.post(api + '/files/getstarfiles',{uname:uname},{withCredentials:true})
        .then(res => {
            console.log('response from server get*files in API call', res.data);
            if (res.data.length!==0){

                return res.data;
            }
            else
            {
                return [];
            }
        })
        .catch(error => {
            console.log("This is error",error);
            return [];
        });
export const getfolders = (uname) =>
    axios.post(api + '/files/getfolders',{uname:uname})
        .then(res => {
            console.log('response from server getfolders in API call', res.data);
            if (res.data.length!==0){
                return res.data;
            }
            else
            {
                return [];
            }
        })
        .catch(error => {
            console.log("This is error");
            return [];
        });
export const getnestedfolders = (uname,path) =>
    axios.post(api + '/files/getnestedfolders',{uname:uname,path:path})
        .then(res => {
            console.log('response from server getnestedfodlers in API call', res.data);
            if (res.data.length!==0){
                var array = res.data.split('<br>');
                array.length=array.length-1;
                console.log(array);
                return array;
            }
            else
            {
                return [];
            }
        })
        .catch(error => {
            console.log("This is error");
            return [];
        });
export const getnestedfiles = (uname,path) =>
    axios.post(api + '/files/getnestedfiles',{uname:uname,path:path})
        .then(res => {
            console.log('response from server getnestedfiles in API call', res.data);
            if (res.data.length!==0){
                var array = res.data.split('<br>');
                array.length=array.length-1;
                console.log(array);
                return array;
            }
            else
            {
                return [];
            }
        })
        .catch(error => {
            console.log("This is error");
            return [];
        });
export const addstarfile = (fname,uname) =>
    axios.post(api + '/files/star', {fname:fname,uname:uname},{withCredentials:true})
        .then(res => {
            console.log('response from server signup', res.data.message);
            return res;
        })
        .catch(error => {
            console.log("This is error");
            return error;
        });
export const deletestarfile = (uname,fname) =>
    axios.post(api + '/files/deletestarfile', {fname:fname,uname:uname})
        .then(res => {
            console.log('response from server deletestarfile', res.data.message);
            return res;
        })
        .catch(error => {
            console.log("This is error in deletestarfile");
            return error;
        });
export const addnewfolder = (fname,uname,otheruser) =>
    axios.post(api + '/files/addNewFolder', {fname:fname,uname:uname,ouser:otheruser})
        .then(res => {
            console.log('response from server addnewfolder', res.data,res.status);
            return res;
        })
        .catch(error => {
            console.log("This is error");
            return error;
        });
export const addnewmember = (fname,otheruser) =>
    axios.post(api + '/files/addNewMember', {fname:fname,ouser:otheruser})
        .then(res => {
            console.log('response from server signup', res.data.message);
            return res;
        })
        .catch(error => {
            console.log("This is error");
            return error;
        });
export const Logout= (fname,otheruser) =>
    axios.get(api + '/users/logout')
        .then(res => {
            console.log('response from server logout');
            return res;
        })
        .catch(error => {
            console.log("This is error");
            return error;
        });
export const Deletegroup= (fname,email) =>
    axios.post(api + '/files/deletegroup', {foldername:fname,email:email},{withCredentials:true})
        .then(res => {
            console.log('response from server logout');
            return res;
        })
        .catch(error => {
            console.log("This is error");
            return error;
        });
export const sendemail = (fname,email) =>
    axios.post(api + '/files/sendemail', {fname:fname,email:email},{withCredentials:true})
        .then(res => {
            console.log('response from server sendmail', res.data.message);
            return res;
        })
        .catch(error => {
            console.log("This is error in send email");
            return error;
        });

// export const getmyfiles = () =>
//     fetch(`${api}/files/myfiles`, {
//         method: 'get',
//         headers: {
//             ...headers,
//             'Content-Type': 'application/json'
//         }
//     })
//         .then(res => console(res.body.message))
//
//         .catch(error => {
//             console.log("This is error.");
//             return error;
//         });
// export const uploadFile = (payload) =>
//     fetch(`${api}/files/upload`, {
//         method: 'POST',
//         body: payload
//     }).then(res => {
//         return res.status;
//     }).catch(error => {
//         console.log("This is error");
//         return error;
//     });