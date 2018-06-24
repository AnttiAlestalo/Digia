import React from 'react';
import $ from 'jquery';
import {Icon} from 'react-fa';
import Popup from 'react-popup';
import * as lib from "../../library";
import './Participants.css';
import PersonRead from '../Person/PersonRead';
import PersonEdit from '../Person/PersonEdit';

class Participants extends React.Component {
    constructor() {
        super();
        this.state = {
            aHeaders: ["fName", "fEmail", "fPhone"],
            aSearch: ["", "", ""],
            jsonEditPerson: null,
            strSortBy: "fName",
            bDescending: false,
            aParticipants: []
        };
        this.jsUpdatePerson = this.jsUpdatePerson.bind(this);
        this.jsSavePerson = this.jsSavePerson.bind(this);
        this.jsDeletePerson = this.jsDeletePerson.bind(this);
        this.jsClosePerson = this.jsClosePerson.bind(this);
        this.jsSearchTable = this.jsSearchTable.bind(this)
    }

    componentDidMount() {
        let strUrl = window.location.href.indexOf("localhost") > 0 ? window.location.href + "/participants.json" : "http://www.aad.fi/aad/react1.nsf/vwPersons?OpenView&" + Date.now();
        $.getJSON(strUrl, function(aJson) {
            aJson.pop();
            this.setState({
                aParticipants: aJson
            });
        }.bind(this))
        .fail(function(xhr) {
            console.log("ERROR");
            console.log(xhr.responseText);
        })
    }

    jsAddPerson() {
        if (this.state.jsonEditPerson !== null && this.state.jsonEditPerson.id === "0") {
            Popup.create({
                title: "Error",
                content: "Please save first the current new person.",
                buttons: { right: ['ok'] }
            });
            return;
        }
        let aParticipants = this.state.aParticipants.slice();
        let jsonNewPerson = {"id":"0", "fName":"", "fEmail": "", "fPhone": ""};
        aParticipants.unshift(jsonNewPerson);
        this.setState({
            jsonEditPerson: jsonNewPerson,
            aParticipants: aParticipants
        })
    }

    jsEditPerson(id) {
        let aParticipants = this.state.aParticipants.slice();
        let index;
        if (this.state.jsonEditPerson !== null && this.state.jsonEditPerson.id === "0") {
            index = aParticipants.findIndex( person => person.id === "0" );
            aParticipants.splice(index, 1);
        }
        index = aParticipants.findIndex( person => person.id === id );
        this.setState({
            jsonEditPerson: aParticipants[index],
            aParticipants: aParticipants
        })
    }

    jsUpdatePerson(strFieldName, strFieldValue) {
        let jsonPerson = JSON.parse(JSON.stringify(this.state.jsonEditPerson));
        jsonPerson[strFieldName] = strFieldValue;
        this.setState({
            jsonEditPerson: jsonPerson
        });
    }

    jsClosePerson() {
        if (this.state.jsonEditPerson.id === "0") {
            let aParticipants = this.state.aParticipants.slice();
            let index = aParticipants.findIndex( person => person.id === "0" );
            aParticipants.splice(index, 1);
            this.setState({
                aParticipants: aParticipants,
                jsonEditPerson: null
            })
        } else {
            this.setState({
                jsonEditPerson: null
            })
        }
    }

    jsSavePerson() {
        let jsonPerson = this.state.jsonEditPerson;
        let strUrl = jsonPerson.id === "0" ? "http://www.aad.fi/aad/react1.nsf/frmPerson?CreateDocument" : "http://www.aad.fi/aad/react1.nsf/0/" + jsonPerson.id + "?SaveDocument";
        let strJson = $('#idFormPerson').serialize();
        $.ajax({
            type: "POST",
            url: strUrl,
            data: strJson,
            success: function(strResponse){
                if (strResponse.indexOf("^OK^") < 0) {
                    alert("AJAX Error: " + strResponse);
                    return;
                }
                let aParticipants = this.state.aParticipants.slice();
                let index = aParticipants.findIndex( item => item.id === jsonPerson.id );
                aParticipants[index] = this.state.jsonEditPerson;
                if (jsonPerson.id === "0") {
                    aParticipants[index].id = lib.jsLeft(lib.jsStrRight(strResponse, "^OK^"), 32);
                }
                aParticipants.sort( lib.jsSort("fName", false, false) );
                this.setState({
                    aParticipants: aParticipants,
                    jsonEditPerson: null
                })
            }.bind(this),
            error: function (xhr){
                alert("AJAX Error: " + xhr.status + " " + xhr.statusText)
            }
        })
    }

    jsDeletePerson(strId) {
        if (!window.confirm('Are you sure you want to delete this Person?')) return;
        let aParticipants = this.state.aParticipants.slice();
        let index = aParticipants.findIndex( person => person.id === strId );
        let strUrl = "http://www.aad.fi/aad/react1.nsf/vwPersons/" + strId + "?DeleteDocument";
        $.get(strUrl, function() {
            aParticipants.splice(index, 1);
            this.setState({
                jsonEditPerson: null,
                aParticipants: aParticipants
            })
        }.bind(this))
    }

    jsSortBy(strCol) {
        let aParticipants = this.state.aParticipants.slice();
        let bDescending = (strCol === this.state.strSortBy ? !this.state.bDescending : false);
        aParticipants.sort( lib.jsSort(strCol, (strCol === "fPhone"), bDescending) );
        this.setState({
            strSortBy: strCol,
            bDescending: bDescending,
            aParticipants: aParticipants
        })
    }

    jsSearchTable(event) {
        let aSearch = this.state.aSearch;
        aSearch[event.target.dataset.idx] = event.target.value;
        this.setState({
            aSearch: aSearch
        })
    }

    render() {
        let iEditPersonId = this.state.jsonEditPerson === null ? 0 : this.state.jsonEditPerson.id;
        let aParticipants = this.state.aParticipants.slice();
        if (this.state.aSearch[0] !== "") {
            aParticipants = aParticipants.filter(person => { return person.fName.toLowerCase().indexOf(this.state.aSearch[0].toLowerCase()) > -1 });
        }
        if (this.state.aSearch[1] !== "") {
            aParticipants = aParticipants.filter(person => { return person.fEmail.toLowerCase().indexOf(this.state.aSearch[1].toLowerCase()) > -1 });
        }
        if (this.state.aSearch[2] !== "") {
            aParticipants = aParticipants.filter(person => { return person.fPhone.toLowerCase().indexOf(this.state.aSearch[2].toLowerCase()) > -1 });
        }
        let aRows = aParticipants.map(person => {
            if (person.id === iEditPersonId) {
                return <PersonEdit
                    key={person.id}
                    person={this.state.jsonEditPerson}
                    jsSavePerson={this.jsSavePerson}
                    jsUpdatePerson={this.jsUpdatePerson}
                    jsClosePerson={this.jsClosePerson}
                />
            } else {
                return <PersonRead
                    key={person.id}
                    person={person}
                    onClick={() => this.jsEditPerson(person.id)}
                    jsDeletePerson={() => this.jsDeletePerson(person.id)}
                />
            }
        });

        let aIcons = this.state.aHeaders.map(strHeader => {
            return (this.state.strSortBy === strHeader ? (this.state.bDescending ? <Icon name="long-arrow-up" /> : <Icon name="long-arrow-down" />) : "")
        });

        return <React.Fragment>
            <table id="idParticipantsTable" className="cssTable">
                <caption>List of participants</caption>
                <thead>
                    <tr className="cssFilterRow">
                        <th>
                            <input name="fFilterName" data-idx="0" type="text" placeholder="Full name" value={this.state.aSearch[0]} onChange={this.jsSearchTable} className="cssFieldText" />
                        </th>
                        <th>
                            <input name="fFilterEmail" data-idx="1" type="text" placeholder="E-mail address" value={this.state.aSearch[1]} onChange={this.jsSearchTable} className="cssFieldText" />
                        </th>
                        <th>
                            <input name="fFilterPhone" data-idx="2" type="text" placeholder="Phone number" value={this.state.aSearch[2]} onChange={this.jsSearchTable} className="cssFieldText" />
                        </th>
                        <th><button type="button" className="cssButDef" onClick={() => this.jsAddPerson()}>Add new</button></th>
                    </tr>
                    <tr>
                        <th onClick={() => this.jsSortBy("fName")}>Name {aIcons[0]}</th>
                        <th onClick={() => this.jsSortBy("fEmail")}>E-mail address {aIcons[1]}</th>
                        <th onClick={() => this.jsSortBy("fPhone")}>Phone number {aIcons[2]}</th>
                        <th> </th>
                    </tr>
                </thead>
                <tbody>
                    {aRows}
                </tbody>
            </table>
        </React.Fragment>
    }
}

export default Participants