import React from 'react';
import Photo from './CardImage.jsx';
import PropTypes from 'prop-types';

export default class LocationFeed extends React.Component {
    render() {

        const state = this.props.state;

        return (
            <div className="col col-md-6 col-md-offset-3 container-fluid jumbotron">
                <div>
                    <Photo state={state} />
                </div>
            </div>
        )
    }
}

LocationFeed.propTypes = {
    state: PropTypes.object.isRequired
};

