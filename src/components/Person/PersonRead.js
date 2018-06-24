import React from 'react';
import {Icon} from 'react-fa';

class PersonRead extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            person: props.person
        };
        this.jsEditRow = this.jsEditRow.bind(this);
    }

    jsEditRow() {
        this.props.onClick();
    }

    render() {
        let jsonPerson = this.state.person;
        return (
            <tr>
                <td onClick={this.jsEditRow}>
                    { jsonPerson.fName }
                </td>
                <td onClick={this.jsEditRow}>
                    { jsonPerson.fEmail }
                </td>
                <td onClick={this.jsEditRow}>
                    { jsonPerson.fPhone }
                </td>
                <td>
                    <Icon name="pencil" onClick={this.jsEditRow} /> <Icon name="trash" onClick={this.props.jsDeletePerson} />
                </td>
            </tr>
        )
    }
}

export default PersonRead