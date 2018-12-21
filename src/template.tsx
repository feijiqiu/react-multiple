import * as React from 'react';
import * as ReactDOM from 'react-dom';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import Template from "./template/index";

ReactDOM.render(
    <Template/>,
    document.getElementById('root') as HTMLElement
);
registerServiceWorker();
