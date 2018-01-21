import React from 'react';
import { connect } from 'react-redux';
import { getVenue } from '../actions/HomeFeedActions.js';
import Loading from '../components/LoadingSpinner.jsx';
import VenueCard from '../components/VenueCard.jsx';
import { 
    FormGroup,
    FormControl,
} from 'react-bootstrap';

export class Home extends React.Component {
    /**
     * Initialise state & bind functions in the 
     * constructor.
     * 
     * React automatically sets this.props 
     * so it can be access anywhere in the component
     * except in the constructor. 
     * 
     * If I want to access this.props in the constructor
     * then I must pass props to the constructor 
     * and call super to give us access to the parent 
     * constructor. 
     * 
     * If I want to use 'this' in the constrcutor, then
     * I must call super().
     * 
     * @param {Object} props 
     */
    constructor(props){
        super(props);

        /**
         * Initialise the components state before
         * the first render() method is called.
         */
        this.state = {
            HomeFeedStatus: 'initial',
        }

        /**
         * For the searchHandler Fn, I must
         * bind 'this' to the components class 
         * otherwise 'this' will be bound to the 
         * caller and thus the Fn will be undefined.
         * I could, however, define searchHandler
         * as an arrow Fn and not have to bind
         * this to the class because arrow Fns 
         * do not change the scope of this.
         */
        this.searchHandler = this.searchHandler.bind(this)
    }
    
    /**
     * Async call to FireBase once the Home
     * container has mounted.
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

    /**
     * Updates the state when the FireBase promise
     * resolves and the components state hasn't yet 
     * been updated. 
     * Taking a copy of the mapStateToProps venues 
     * as this will be the App Level State and thus
     * I do not want to mutate it during search 
     * filering.
     * !! Important to check that HomeFeedStatus 
     * is 'initial' so that setState isn't called
     * in an infinite loop.
     * 
     * @return {Object} - Updated component state
    */
    componentDidUpdate() {
        if (this.props.state.HomeFeed.venues && this.state.HomeFeedStatus === 'initial') this.setState({
            HomeFeedStatus: 'updated',
            HomeFeedVenues: this.props.state.HomeFeed.venues
        })
    }

    /**
     * Creates an array of venue objects and 
     * calls a callback with the new array as 
     * the param.
     *
     * @param {Object} obj - The object of venues returned from FireBase
     * @callback venueInstance 
     * @returns {Object} - venueInstance callback
    */ 
    venueArrayCreater = function(obj, callback) {
        let VenueObjects = [];
        for (var n in obj) {
            VenueObjects.push(obj[n])
        }
        return callback(VenueObjects);
    }

    /**
     * Return 'n' number of VenueCard components
     * to calling function. Passes each venue 
     * object as the components state prop and an
     * index as the components key prop.
     *
     * @param {Object[]} - Array of venue objected
     * @returns - 'n' number of VenueCard components
     *
    */
    venueInstance = function (venueArray) {
        return venueArray.map(function(venue, index){
                return <VenueCard key={index} stateInstance={venue} />
        })
    }

    /**
     * onChange event on the search bar calls 
     * the searchHandler Fn. 
     * Assigns the searchTerm & then calls the 
     * venueArraySearchReducer Fn to update the state
     * with the venues that match the searchTerm - 
     * setState triggers render() and the view is 
     * updated.
     * 
     * the onChange handler is able to call it using 
     * the class's 'this' scope because the Fn was 
     * bound to 'this' in the class's constructor.
     * 
     * @param {Object} event - Object of onChange element attributes
     */
    searchHandler = function (event) {
        let searchTerm = event.target.value.toLowerCase();
        this.venueArraySearchReducer(this.props.state.HomeFeed.venues, this.updateState, searchTerm)
    };

    /**
     * Creates an array of venue objects and then
     * checks if each of the venue objects within 
     * the array has an index of the searchTerm. 
     * Then uses the first array (VenueObjects) 
     * to create a new array of venue objects 
     * that match the search term (matchingSearches).
     * Then calls a callback, passing the 
     * matchingSearches array as the param.
     * 
     * @param {Object} obj - The object of venues returned from FireBase
     * @callback updateState
     * @param {String} searchTerm - The search term entered in the search bar
     * 
     * @returns - updateState callback
     */
    venueArraySearchReducer  = function(obj, callback, searchTerm) {
        let MatchingSearches = [];
        for (var n in obj) {
            if (obj[n].name.toLowerCase().indexOf(searchTerm.toLowerCase()) >= 0) MatchingSearches.push(obj[n])
        }
        return callback(MatchingSearches);
    }

    /**
     * set state of HomeFeedVenues as only
     * the venues that matched the search term. 
     * setState calls the components render() 
     * method and thus the view now uses the 
     * new state to return its venues. 
     * Uses an arrow Fn to show that arrow Fns 
     * do not change the scope of 'this' - 
     * I do not need to bind an arrow Fn to 'this'
     * in the constructor to maintain the state 
     * of 'this' as a reference to the Class.
     * 
     * @param {Object[]} MatchingSearches - array of venues that matched the search term
     * @return - new component state
     */
    updateState = (MatchingSearches) => {
        this.setState({
            HomeFeedVenues: MatchingSearches
        }, function(){
            console.log(this.state)
        })
    }

    render() {
        /**
         * I can define the App State in the render 
         * method so that it updates with each render. 
         * The App State is mapped to props using 
         * react-redux bindings
         */
        const appState = this.props.state;
        const appStateVenues = this.props.state.HomeFeed.venues;

        return (
                <div className="row">
                    { this.state.HomeFeedStatus === 'initial' ?
                        <div className="loading-container">    
                            <Loading />
                        </div>
                    :
                        <div>
                            <div className="col col-md-6 col-md-offset-3 container-fluid col-search center-heading">  
                                <h2> Search our venues </h2>
                                <FormGroup className="col-xs-offset-2">
                                    <FormControl type="text" placeholder="" id="navBarSearchForm" onChange={this.searchHandler}/>
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

