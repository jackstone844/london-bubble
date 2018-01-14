import React from 'react';
import PropTypes from 'prop-types';

class Header extends React.Component {
    render() {

        const stateInstance = this.props.stateInstance;

        return [
            <h3 key={1}>{stateInstance.name}</h3>,
            <p key={2}>{stateInstance.category}</p>
        ]
    }
}

Header.propTypes = {
    stateInstance: PropTypes.object.isRequired
};

export default Header;