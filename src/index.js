import React from "react";
import ReactDOM from 'react-dom';
import "./index.css";
import {App} from "./App";
import {BrowserRouter} from "react-router-dom";
import {Route, Routes} from "react-router";
import Search from "./components/Search";

export function Main() {
    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<App/>}/>
                <Route path="/search" element={<Search/>}/>
            </Routes>
        </BrowserRouter>
    );
}

ReactDOM.render(
    <React.StrictMode>
        <Main />
    </React.StrictMode>,
    document.getElementById("root")
);
