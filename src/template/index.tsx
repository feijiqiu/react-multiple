import * as React from "react";
import {BrowserRouter} from "react-router-dom";
import App from "./App";

function Template() {
    return <BrowserRouter basename='/'>
            <App />
        </BrowserRouter>
}
export default Template;