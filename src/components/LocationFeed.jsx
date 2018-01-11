import React from 'react';
import LocationPhoto from './LocationFeedImage.jsx';
import PropTypes from 'prop-types';

export default class LocationFeed extends React.Component {
    constructor(props){
        super(props);

    }
    render() {
        
        const state = this.props.state;
        const stateInstance = this.props.stateInstance;

        return (
            <div className="col col-md-6 col-md-offset-3 container-fluid jumbotron">
                <div>
                    <a>
                        <LocationPhoto state={state} stateInstance={stateInstance} />
                    </a>
                </div>
            </div>
        )
    }
}

LocationFeed.propTypes = {
    state: PropTypes.object.isRequired,
    stateInstance: PropTypes.object.isRequired
};

