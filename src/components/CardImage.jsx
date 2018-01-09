import React from 'react';
import PropTypes from 'prop-types';
import { Image } from 'react-bootstrap';


export default class Photo extends React.Component {
    render() {

        const state = this.props.state;

        let paddingStyle = {
            paddingTop: '10px',
            paddingBottom: '10px'
        };

        return (
            <div style={paddingStyle}>
                <Image key={2} src={state.image} responsive rounded />
            </div>
        )
    }
}

Photo.propTypes = {
    state: PropTypes.object.isRequired
};
