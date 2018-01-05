import React from 'react';
import { 
    Image
} from 'react-bootstrap';
import PropTypes from 'prop-types';

class Header extends React.Component {
    render() {

        const state = this.props.state;

        return [
            <h3 key={1}>{state.name}</h3>,
            <p key={2}>{state.category}</p> 
        ]
    }
}

Header.propTypes = {
    state: PropTypes.object.isRequired
};


export default Header;