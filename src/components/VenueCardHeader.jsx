import React from 'react';
import PropTypes from 'prop-types';

class Header extends React.Component {
    render() { 

        const stateInstance = this.props.stateInstance;

        let areaCode = () => { return <h1> {stateInstance.areacode} </h1> }

        return (
            <div className='row force-background-white'>
                <div className='col-xs-6'>
                    <h3>{stateInstance.name.toUpperCase()}</h3>
                    <p>{stateInstance.category}</p>
                </div>
                <div className='col-xs-6 text-right'>
                    {stateInstance.areacode ? areaCode() : ''}
                </div>
            </div>
        )
    }
}

Header.propTypes = {
    stateInstance: PropTypes.object.isRequired
};

export default Header;