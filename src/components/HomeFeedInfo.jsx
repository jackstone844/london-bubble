import React from 'react';
import { 
    Image
} from 'react-bootstrap';
import PropTypes from 'prop-types';
const FontAwesome = require('react-fontawesome');


export default class Icons extends React.Component {
    render() {

        const state = this.props.state;

        return (
            <div>
                <div className='col'>
                    <p><FontAwesome
                        className='icon-location-arrow icon-1x'
                        name='location-icon'
                        // size='2x'
                        tag='i'
                    /> {state.location}</p>
                </div>
                <div className='col'>
                    <p><FontAwesome
                        className='icon-laptop icon-1x'
                        name='website-icon'
                        // size='2x'
                        tag='i'
                    /> {state.website}</p>
                </div>
                <div className='col'>
                    <p><FontAwesome
                        className='icon-instagram icon-1x'
                        name='instagram-icon'
                        // size='2x'
                        tag='i'
                    /> {state.instagram} </p>
                </div>
                <div className='col'>
                    <span> 2017-12-12 </span>
                </div>
            </div>
        );
    }
}

Icons.propTypes = {
    state: PropTypes.object.isRequired
};
