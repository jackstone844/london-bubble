import React from 'react';
import { connect } from 'react-redux';
import { getVenue } from '../actions/HomeFeedActions.js';
import Loading from '../components/Loading.jsx';
import VenueFeed from '../components/HomeFeed.jsx';
import SearchBar from '../components/SearchBar.jsx';
import { 
    FormGroup,
    FormControl,
} from 'react-bootstrap';

export class Home extends React.Component {
    // Construct the component
    // props and state can be set
    constructor(props){
        super(props);

        this.state = {
            HomeFeedStatus: 'initial',
        }

        this.searchHandler = this.searchHandler.bind(this)

        this.venueInstance = this.venueInstance.bind(this)

        this.updateState = this.updateState.bind(this)
    }
    
    /**
     * Async call to FireBase once the Home
     * container has mounted
     * 
     * @return {Object} - Updated props on resolve 
     * @return {Object} - Error thrown on reject
    */
    componentDidMount() {
        if (!this.props.state.HomeFeed.venues) this.props.onGetVenue();
        if (this.props.state.HomeFeed.venues) this.setState({
            HomeFeedStatus: 'updated',
            HomeFeedVenues: this.props.state.HomeFeed.venues
        });
    }

    componentDidUpdate() {
        if (this.props.state.HomeFeed.venues && this.state.HomeFeedStatus === 'initial') this.setState({
            HomeFeedStatus: 'updated',
            HomeFeedVenues: this.props.state.HomeFeed.venues
        })
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

    searchHandler = function (event) {
        let searchTerm = event.target.value.toLowerCase();
        this.venueArraySearchReducer(this.props.state.HomeFeed.venues, this.updateState, searchTerm)
    };

    venueArraySearchReducer = function(obj, callback, searchTerm) {
        let keyValArray = Object.entries(obj);
        let VenueObjects = [];
        let MatchingSearches = []
        for (let i = 0; i < keyValArray.length; i++) {
            VenueObjects.push(keyValArray[i][1])
        }
        for (let t = 0; t < VenueObjects.length; t++) {
            if (VenueObjects[t].name.toLowerCase().indexOf(searchTerm.toLowerCase()) >= 0) {
                MatchingSearches.push(VenueObjects[t])
            }
        }
        return callback(MatchingSearches);
    }

    updateState (MatchingSearches) {
        this.setState({
            HomeFeedVenues: MatchingSearches
        }, function(){
            console.log(this.state)
        })
    }

    render() { 
        // Define in render so as to update each time
        // the component is re-rendered function is called
        //const state = this.props.state;
        //const venues = this.props.state.HomeFeed.venues;
        return (
                <div className="row">
                    { this.state.HomeFeedStatus === 'initial' ?
                        <div className="loading-container">    
                            <Loading />
                        </div>
                    :
                        <div>
                            <div className="col col-md-6 col-md-offset-3 container-fluid col-search">  
                                <h2> Search our collection </h2>
                                <FormGroup>
                                    <FormControl type="text" placeholder="Search" id="navBarSearchForm" onChange={this.searchHandler}/>
                                </FormGroup>
                            </div>
                            <div>
                                {this.venueArrayCreater(this.state.HomeFeedVenues, this.venueInstance)}
                            </div>
                        </div>
                    }
                </div>
        );
    }
}

/* Bind redux to the home container */
    
/* Two functions that map dispatch 
and state into the Home components
props */


/**
 * Injects the state into Home component props
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
 * Injects the dispatch object & onGetVenue
 * function into Home component
 * (react-redux bindings)
 * 
 * @param {Object} dispatch - Redux dispatch object
 * @return {Object} - Redux dispatch object
 * @return {Object} - onGetVenue function
*/
function mapDispatchToProps(dispatch) {
    return{
        dispatch,
        onGetVenue: () => dispatch(getVenue())
    };
}

/**
 * Takes mapDispatchToProps & mapStateToProps
 * functions and maps their return values 
 * into Home component
 * (react-redux bindings)
 * 
 * @param {Object} mapStateToProps
 * @param {Object} mapDispatchToProps
 * @param {Object} Home - Home Component
*/
const homeContainer = connect(mapStateToProps, mapDispatchToProps)(Home);

export default homeContainer; 

