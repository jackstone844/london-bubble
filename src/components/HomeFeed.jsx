import React from 'react';
import Icons from './HomeFeedInfo.jsx';
import Header from './HomeFeedHeader.jsx';
import Photo from './HomeFeedImage.jsx';
import PropTypes from 'prop-types';

export default class VenueFeed extends React.Component {
    render() {

        const state = this.props.state;

        return (
            <div className="col col-md-6 col-md-offset-3 container-fluid jumbotron">
                <div>
                    <Header state={state} />
                    <Photo state={state} />
                    <Icons state={state} />
                </div>
            </div>
        )
    }
}

VenueFeed.propTypes = {
    state: PropTypes.object.isRequired
};

