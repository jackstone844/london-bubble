import React from 'react';
import PropTypes from 'prop-types';
import { Image } from 'react-bootstrap';


export default class Photo extends React.Component {
    constructor(props){
        super(props);
    }

    render() {

        const stateInstance = this.props.stateInstance;

        let paddingStyle = {
            paddingTop: '10px',
            paddingBottom: '10px'
        };

        return (
            <div style={paddingStyle}>
                <Image key={2} src={stateInstance.image} responsive rounded />
            </div>
        )
    }
}

Photo.propTypes = {
    stateInstance: PropTypes.object.isRequired
};
