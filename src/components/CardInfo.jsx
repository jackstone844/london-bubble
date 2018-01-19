import React from 'react';
import PropTypes from 'prop-types';
const FontAwesome = require('react-fontawesome');
const { SocialIcon, SocialIcons } = require('react-social-icons');

/**
 * This component is a 'dumb' component. It is passed a single venue from it's parent as a prop, and it 
 * returns:
 *      - Five icons using hrefs 
 *      - The date that the venue was added to the platform 
 */

export default class Icons extends React.Component {
    render() {
        /** 
         * A reference to a single venue using this component
         */
        const stateInstance = this.props.stateInstance;

        /**
         * Inline style giving padding to the components 
         * container div
         */
        let paddingStyle = {
            paddingTop: '15px'
        };

        /**
         * Inline style giving a margin around each icon
         */
        let iconStyle = {
            margin: '10px'
        }

        let centerAlign = {
            textAlign: 'center'
        }

        /**
         * Build array to pass into <SocialIcons /> (react-social-icons
         * component)
         */
        let iconArray = [];

        const iconIdentifier = () => {
            let icons = ['website','pinterest','facebook','instagram','twitter']
            icons.map(function(icon){
                if (stateInstance[icon]) iconArray.push(stateInstance[icon])
            })
        }
        iconIdentifier();

        return (
            <div style={paddingStyle}>
                <div className="social-icons-container">
                    <SocialIcons className="social-icons-container" urls={iconArray} color='black' style={iconStyle}/>
                </div>
                <div className='col' style={centerAlign}>
                    <p> Brewery | Canal | Pizza | Outdoor Seating </p>
                </div>
                <div className='col'>
                    <p><FontAwesome
                        className='icon-location-arrow icon-1x'
                        name='location-icon'
                        tag='i'
                    /> {stateInstance.location}</p>
                </div>
                <div className='col'>
                    <span> 2017-12-12 </span>
                </div>

            </div>
        );
    }
}

/**
 * PropTypes requirements defined for the component
 */
Icons.propTypes = {
    stateInstance: PropTypes.object.isRequired
};
