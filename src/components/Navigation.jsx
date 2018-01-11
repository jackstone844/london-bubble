import React from 'react';
import {
  NavLink,
  Route
} from "react-router-dom";
import { 
    Navbar, 
    Nav, 
    NavItem, 
    NavbarHeader, 
    FormGroup,
    FormControl,
    Button,
    Form
} from 'react-bootstrap';
import img from '../../public/images/logo-new.png';

import Home from '../containers/HomeFeed.jsx';
import Locations from '../containers/LocationFeed.jsx';
import LocationFeedVenues from '../components/LocationFeedVenues.jsx';

export default class Navigation extends React.Component {
    render() {
        
        return [
          
            <Navbar key={1} default fixedTop collapseOnSelect>
                <Navbar.Header>
                    <Navbar.Brand>
                        <img src={img} style={{height: '100px' }} />
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav>
                        <NavItem href="/">
                            <NavLink exact activeClassName='active' to='/'>Home</NavLink>
                        </NavItem>
                        <NavItem href="/locations">
                            <NavLink activeClassName='active' to='/locations'>Locations</NavLink>
                        </NavItem>
                    </Nav>
                    <Navbar.Form pullRight>
                        <FormGroup>
                            <FormControl type="text" placeholder="Search" id="navBarSearchForm"/>
                        </FormGroup>
                    </ Navbar.Form>
                </Navbar.Collapse>
            </Navbar>,

            <Route key={2} exact path="/" component={Home} store />,
            <Route key={3} exact path="/locations" component={Locations} store />,
            <Route key={4} exact path="/locations/venues" component={LocationFeedVenues} />
            
        ];
    }
}