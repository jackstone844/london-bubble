import React from 'react';
import PropTypes from 'prop-types';
import { Image } from 'react-bootstrap';
import LoadingImage from './LoadingImage';
import Img from 'react-image';


export default class LocationPhoto extends React.Component {
    constructor(props){
        super(props);

        this.routeToVenues = this.routeToVenues.bind(this);
    }

    routeToVenues = function() {
        return this.props.state.history.push({
            pathname: 'locations/venues',
            state : {
                state: this.props.state.state,
                stateInstance : this.props.stateInstance
            }
        })
    }; 
 
    render() {

        const appState = this.props.state
        const appStateInstance = this.props.stateInstance;

        let paddingStyle = {
            paddingTop: '0px',
            paddingBottom: '0px',
        };

        return (
            <div style={paddingStyle}>
                <Img
                    src={[
                        appStateInstance.image,
                    ]}
                    loader={<LoadingImage />}
                    onClick={this.routeToVenues}
                    className='img-responsive img-rounded'
                />
                {/*<Image key={2} src={appStateInstance.image} onClick={this.routeToVenues} responsive rounded />*/}
            </div>
        )
    }
}

LocationPhoto.propTypes = {
    stateInstance: PropTypes.object.isRequired
};
