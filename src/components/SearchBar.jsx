import React from 'react';
import { NavLink, Route } from "react-router-dom";
import { FormGroup, FormControl, } from 'react-bootstrap';

export default class SearchBar extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        
        return (
            <div>
                <FormGroup>
                    <FormControl type="text" placeholder="Search" id="navBarSearchForm"/>
                </FormGroup>
            </div>
        )
               
    }
}