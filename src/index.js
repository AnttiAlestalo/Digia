import React from 'react';
import ReactDOM from 'react-dom';
import Popup from 'react-popup';
import './index.css';
import './popup.css';
import App from './components/App/App';

ReactDOM.render(<App />, document.getElementById('root'));

ReactDOM.render(<Popup />, document.getElementById('idDivPopup'));
