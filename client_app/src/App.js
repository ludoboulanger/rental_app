import logo from './logo.svg';
import React, {useState} from 'react';
import axios from 'axios';
import './App.css';

const api = axios.create({
    baseURL: 'http://localhost:8000',
})

function App() {

    const [message, setMessage] = useState('Backend response will be written here');
    const [color, setColor] = useState("red");

    function onTestClick() {
        api.get('/').then((res) => {
            setMessage(res.data);
            setColor("lime");
        }).catch(err => {
            setMessage(err.message);
            setColor("red");
        })
    }


    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo"/>
                <p>
                    Edit <code>src/App.js</code> and save to reload.
                </p>
                <button onClick={onTestClick}>
                    Test backend
                </button>
                <h3 style={{color: color}}>{message}</h3>
                <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Learn React
                </a>
            </header>
        </div>
    );
}

export default App;
