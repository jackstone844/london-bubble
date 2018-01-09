import React from 'react';
import PropTypes from 'prop-types';
const FontAwesome = require('react-fontawesome');


export default class Icons extends React.Component {
    render() {

        const stateInstance = this.props.stateInstance;

        return (
            <div>
                <div className='col'>
                    <p><FontAwesome
                        className='icon-location-arrow icon-1x'
                        name='location-icon'
                        // size='2x'
                        tag='i'
                    /> {stateInstance.location}</p>
                </div>
                <div className='col'>
                    <p><FontAwesome
                        className='icon-laptop icon-1x'
                        name='website-icon'
                        // size='2x'
                        tag='i'
                    /> {stateInstance.website}</p>
                </div>
                <div className='col'>
                    <p><FontAwesome
                        className='icon-instagram icon-1x'
                        name='instagram-icon'
                        // size='2x'
                        tag='i'
                    /> {stateInstance.instagram} </p>
                </div>
                <div className='col'>
                    <span> 2017-12-12 </span>
                </div>
            </div>
        );
    }
}

Icons.propTypes = {
    stateInstance: PropTypes.object.isRequired
};
