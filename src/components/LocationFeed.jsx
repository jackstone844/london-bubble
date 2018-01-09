import React from 'react';
import Photo from './CardImage.jsx';
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
                    <Photo state={state} stateInstance={stateInstance} />
                </div>
            </div>
        )
    }
}

LocationFeed.propTypes = {
    state: PropTypes.object.isRequired,
    stateInstance: PropTypes.object.isRequired
};

