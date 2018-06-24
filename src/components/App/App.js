import React, { Component } from 'react';
import Participants from '../Participants/Participants';
import './App.css';

class App extends Component {

    jsWinResize() {
        let iHei = document.getElementById('root').clientHeight - document.getElementById('idAppHeader').clientHeight - 30;
        document.getElementById('idAppBody3').setAttribute("style","min-height:" + iHei + "px");
    }

    componentDidMount() {
        window.addEventListener('resize', this.jsWinResize);
        setTimeout(function(){ window.dispatchEvent(new Event('resize')) }, 100);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.jsWinResize)
    }

    render() {
        return (
            <div className="App">
                <header id="idAppHeader">
                    <div>
                        <img src="logo.png" alt="Nord Software" />
                        <span>Nord Software</span>
                    </div>
                </header>
                <div id="idAppBody1">
                    <div id="idAppBody2">
                        <div id="idAppBody3">
                           <Participants />
                        </div>
                    </div>
                </div>
            </div>
    )
  }
}

export default App;
