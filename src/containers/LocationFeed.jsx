import React from 'react';
import { connect } from 'react-redux';
import { getLocations } from '../actions/LocationFeedActions.js';
import { getVenue } from '../actions/HomeFeedActions.js';
import Loading from '../components/Loading.jsx';
import LocationFeed from '../components/LocationFeed.jsx';
import PropTypes from 'prop-types';

export class Locations extends React.Component {

    // Construct the component
    // props and state can be set
    constructor(props){
        super(props);
    }

     /**
     * Async call to FireBase once the Home
     * container has mounted
     * 
     * @return {Object} - Updated props on resolve 
     * @return {Object} - Error thrown on reject
    */
    componentDidMount() {
        if (!this.props.state.LocationFeed.locations) this.props.onGetLocation()
        if (!this.props.state.HomeFeed.venues) this.props.onGetVenue()
    }

    /**
     * Creates an array of venue objects and 
     * calls a callback with the new array as 
     * the param
     *
     * @param {Object} obj - The object of venues returned from FireBase
     * @callback venueInstance 
     * @returns {Object} - 'n' number of VenueFeed components
    */
    locationArrayCreater = function(obj, state, callback) {
        let keyValArray = Object.entries(obj);
        let LocationObjects = [];
        for (let i = 0; i < keyValArray.length; i++) {
            LocationObjects.push(keyValArray[i][1])
        }
        return callback(LocationObjects, state);
    }

    /**
     * Return 'n' number of VenueFeed components
     * to calling function. Passes each venue 
     * object as the components state prop and an
     * index as the components key prop
     *
     * @param {Object[]} - Array of venue objected
     * @returns: 'n' number of VenueFeed components
     *
    */
    locationInstance = function (locationArray, state) {
        return locationArray.map(function(location, index){
            return <LocationFeed key={index} state={state} stateInstance={location} />
        })
    }

    render() {
        // Define in render so as to update each time
        // the component is re-rendered function is called

        const state = this.props.state
        const locations = this.props.state.LocationFeed.locations

        return (
            <div className="row">
                { state.LocationFeed.isFetching === true || state.HomeFeed.isFetching === true ?
                    <div className="loading-container">
                        <Loading /> 
                    </div>
                :   
                    <div>
                        {this.locationArrayCreater(locations, this.props, this.locationInstance)}
                    </div>
                }
            </div>
        );
    }
}

/* Bind redux to the locations container */
    
/* Two functions that map dispatch 
and state into the location components
props */


/**
 * Injects the state into locations component props
 * (react-redux bindings)
 * 
 * @param {Object} state - Redux state
 * @return {Object} - Redux state
*/
const mapStateToProps = (state) => {
    return {
        state 
    };
};

/**
 * Injects the dispatch object & onGetLocation
 * function into location component
 * (react-redux bindings)
 * 
 * @param {Object} dispatch - Redux dispatch object
 * @return {Object} - Redux dispatch object
 * @return {Object} - onGetLocation function
*/
function mapDispatchToProps(dispatch) {
    return{
        dispatch,
        onGetLocation: () => dispatch(getLocations()),
        onGetVenue: () => dispatch(getVenue())
    };
}

/**
 * Takes mapDispatchToProps & mapStateToProps
 * functions and maps their return values 
 * into location component
 * (react-redux bindings)
 * 
 * @param {Object} mapStateToProps
 * @param {Object} mapDispatchToProps
 * @param {Object} Home - location Component
*/
const locationsContainer = connect(mapStateToProps, mapDispatchToProps)(Locations);


export default locationsContainer;