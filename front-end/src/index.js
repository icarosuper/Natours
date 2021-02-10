import React from 'react';
import ReactDOM from 'react-dom';
import Routes from './routes';
import {Navbar} from "./components/navbar/navbar";
import {BrowserRouter} from 'react-router-dom'
import '../src/styles/index.css'
import {Box} from "@material-ui/core";

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <Box style={{
                backgroundImage: "url('https://images-flugel.s3.amazonaws.com/1612960828449')",
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                backgroundSize: 'cover'
            }}>
                <Navbar/>
                <Box display={'flex'} flexGrow={1} minHeight={'90vh'}>
                    <Routes/>
                </Box>
            </Box>
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

