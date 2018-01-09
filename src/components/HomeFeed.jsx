import React from 'react';
import Icons from './CardInfo.jsx';
import Header from './CardHeader.jsx';
import Photo from './CardImage.jsx';
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

