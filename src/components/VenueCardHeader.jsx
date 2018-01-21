import React from 'react';
import PropTypes from 'prop-types';

class Header extends React.Component {
    render() { 

        const appStateInstance = this.props.stateInstance;

        let fontSize = {
            fontSize : '40px'
        }

        let areaCode = () => { return <h1 style={fontSize}> {appStateInstance.areacode} </h1> }

        return (
            <div className='row force-background-white'>
                <div className='col-xs-6'>
                    <h3>{appStateInstance.name.toUpperCase()}</h3>
                    <p>{appStateInstance.category}</p>
                </div>
                <div className='col-xs-6 text-right'>
                    {appStateInstance.areacode ? areaCode() : ''}
                </div>
            </div>
        )
    }
}

Header.propTypes = {
    stateInstance: PropTypes.object.isRequired
};

export default Header;