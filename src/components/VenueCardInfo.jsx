import React from 'react';
import PropTypes from 'prop-types';
const FontAwesome = require('react-fontawesome');
const { SocialIcon, SocialIcons } = require('react-social-icons');

export default class Icons extends React.Component {

    render() {
        /** 
         * A reference to a single venue using this component
         */
        const appStateInstance = this.props.stateInstance;

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

        let categoryList = {
            textAlign: 'center',
            marginBottom: '50px'
        }

        /**
         * Build array to pass into <SocialIcons /> (react-social-icons
         * component)
         */
        let iconArray = [];
        const iconIdentifier = () => {
            let icons = ['website','pinterest','facebook','instagram','twitter']
            icons.map(function(icon){
                if (appStateInstance[icon]) iconArray.push(appStateInstance[icon])
            })
        }
        iconIdentifier();

        const convertTags = (array) => {
            let tags = array.toString().split(',').join(' | ')
            return tags;
        }

        return (
            <div style={paddingStyle}>
                <div className="social-icons-container">
                    <SocialIcons className="social-icons-container" urls={iconArray} color='black' style={iconStyle}/>
                </div>

                <div className='col' style={categoryList}>
                    <p> {appStateInstance.tags ? convertTags(appStateInstance.tags) : ''} </p>
                </div>

                {/*<div className='col'>
                    <p><FontAwesome
                        className='icon-location-arrow icon-1x'
                        name='location-icon'
                        tag='i'
                    /> {stateInstance.location}</p>
                </div>*/}
 
                <div className='col'>
                    <p> {appStateInstance.location} </p>
                </div>

                <div className='col'>
                    <p> {appStateInstance.contact ? appStateInstance.contact : '' } </p>
                </div>

                <div className='col'>
                    <span> {appStateInstance.dateAdded ? appStateInstance.dateAdded : '2018-01-01' } </span>
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
