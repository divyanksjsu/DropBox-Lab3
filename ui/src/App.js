import React, {Component} from 'react';
import './App.css';
import {BrowserRouter} from 'react-router-dom';
import MyDropBox from "./components/mydropbox";


// import HomePage from "./components/HomePage";

class App extends Component {
    render() {
        return (
            <div className="App">

                <BrowserRouter>
                    <MyDropBox/>
                </BrowserRouter>

            </div>
        );
    }
}

export default App;