import React from 'react';
import { connect } from 'react-redux';
import { getVenue } from '../actions/HomeFeedActions.js';
import Loading from '../components/Loading.jsx';
import VenueFeed from '../components/HomeFeed.jsx';

export default class LocationFeedVenues extends React.Component {
    
    // Construct the component
    // props and state can be set
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
    venueArrayCreater = function(obj, callback) {
        let keyValArray = Object.entries(obj);
        let VenueObjects = [];
        for (let i = 0; i < keyValArray.length; i++) {
            VenueObjects.push(keyValArray[i][1])
        }
        return callback(VenueObjects);
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
    venueInstance = function (venueArray) {
        return venueArray.map(function(venue, index){
            return <VenueFeed key={index} stateInstance={venue} />
        })
    }

    /* This Works to filter category on locaiton 
    venueInstance = function (venueArray) {
        return venueArray.map(function(venue, index){
            if (venue.category == 'Clapham South') {
            return <VenueFeed key={index} state={venue} />
            }
        })
    }
    */
    

    render() { 
        // Define in render so as to update each time
        // the component is re-rendered function is called
        //const state = this.props.state;
        //const venues = this.props.state.HomeFeed.venues;
        console.log(this.props)
        /*return (
                <div className="row">
                    { state.HomeFeed.isFetching === true ?
                        <div className="loading-container">    
                            <Loading />
                        </div>
                    :   
                        <div>
                            {this.venueArrayCreater(venues, this.venueInstance)}
                        </div>
                    }
                </div>
        );*/
        return (
            <p> hi </p>
        )
    }
}

