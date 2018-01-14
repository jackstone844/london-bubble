import React from 'react';
import PropTypes from 'prop-types';
import { Image } from 'react-bootstrap';


export default class LocationPhoto extends React.Component {
    constructor(props){
        super(props);
    }

    render() {

        const state = this.props.state
        const stateInstance = this.props.stateInstance;

        let routeToVenues = function() {
            return state.history.push({
                pathname: 'locations/venues',
                state : {
                    state: state.state,
                    stateInstance : stateInstance
                }
            })
        };

        let paddingStyle = {
            paddingTop: '10px',
            paddingBottom: '10px'
        };

        return (
            <div style={paddingStyle}>
                <Image key={2} src={stateInstance.image} onClick={routeToVenues} responsive rounded />
            </div>
        )
    }
}

LocationPhoto.propTypes = {
    stateInstance: PropTypes.object.isRequired
};
