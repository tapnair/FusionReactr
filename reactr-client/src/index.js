/*
 * Copyright (c) 2022 Patrick Rainsberry
 * Permission to use, copy, modify, and distribute this software in object code form
 * for any purpose and without fee is hereby granted, provided that the above copyright
 * notice appears in all copies and that both that copyright notice and the limited
 * warranty and restricted rights notice below appear in all supporting documentation.
 *
 * THIS PROGRAM IS PROVIDED "AS IS" AND WITH ALL FAULTS. THE PUBLISHER SPECIFICALLY
 * DISCLAIMS ANY IMPLIED WARRANTY OF MERCHANTABILITY OR FITNESS FOR A PARTICULAR USE.
 * THE PUBLISHER DOES NOT WARRANT THAT THE OPERATION OF THE PROGRAM WILL BE
 * UNINTERRUPTED OR ERROR FREE.
 */
import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals'

import './index.css';

import {QueryClient, QueryClientProvider} from "react-query";
import {ReactQueryDevtools} from "react-query/devtools";

import {ThemeProvider} from "@mui/material/styles";
import {createTheme} from "@mui/material/styles";

import {ParameterTableController} from "./components/ParameterTableController/parameterTableController";
import {themeOptions} from "./muiTheme";
import {checkADSK} from "./connector/fusionReceiver";


// For use with React-Query
const queryClient = new QueryClient();

// Material UI Custom Theme
const theme = createTheme(themeOptions);

// You can use some nice debug tools by enabling this flag
const ENABLE_REACT_QUERY_DEBUG = false;

//Main React App, Wrapping with Material UI styles and React-Query
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <ThemeProvider theme={theme}>
            <QueryClientProvider client={queryClient}>
                <ParameterTableController queryClient={queryClient}/>
                {ENABLE_REACT_QUERY_DEBUG && <ReactQueryDevtools initialIsOpen />}
            </QueryClientProvider>
        </ThemeProvider>
    </React.StrictMode>
);

// Here we will set up the listener for incoming messages from the Fusion add-in
if (window.addEventListener) {
    window.addEventListener("load", () => checkADSK(queryClient), false);
}
else {
    window.onload = () => checkADSK(queryClient);
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
