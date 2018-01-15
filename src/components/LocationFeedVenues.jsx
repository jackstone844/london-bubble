import React from 'react';
import { connect } from 'react-redux';
import { getVenue } from '../actions/HomeFeedActions.js';
import Loading from '../components/Loading.jsx';
import VenueFeed from '../components/HomeFeed.jsx';

export default class LocationFeedVenues extends React.Component {
    
    constructor(props){
        super(props);

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
    venueArrayCreater = function(obj, filterObj, callback) {
        let keyValArray = Object.entries(obj);
        let VenueObjects = [];
        for (let i = 0; i < keyValArray.length; i++) {
            VenueObjects.push(keyValArray[i][1])
        }
        return callback(VenueObjects, filterObj);
    }

    /**
     * Return 'n' number of VenueFeed components
     * to calling function. 
     * Filters by location passed as stateInstance
     * Passes each venue object as the components
     * state prop and an index as the components key prop
     *
     * @param {Object[]} - Array of venue objected
     * @returns: 'n' number of VenueFeed components
     *
    */
    venueInstance = function (venueArray, filterObj) {
        return venueArray.map(function(venue, index){
            if (venue.category == filterObj.category) {
                return <VenueFeed key={index} stateInstance={venue} />
            }
        })
    }  

    render() { 
        // Define in render so as to update each time
        // the component is re-rendered function is called
        const state = this.props.location.state;
        const venues = this.props.location.state.state.HomeFeed.venues;
        const venuesInstance = this.props.location.state.stateInstance;
        return (
                <div className="row">
                        
                        {
                            console.log(venuesInstance)
                        }

                        <div>
                            {this.venueArrayCreater(venues, venuesInstance, this.venueInstance)}
                        </div>
                    
                </div>
        );
    }
}

