import React from 'react';
import Icons from './CardInfo.jsx';
import Header from './CardHeader.jsx';
import Photo from './CardImage.jsx';
import PropTypes from 'prop-types';

export default class VenueFeed extends React.Component {
    render() {
 
        const stateInstance = this.props.stateInstance;

        return (
            <div className="col col-md-6 col-md-offset-3 container-fluid jumbotron">
                <div>
                    <Header stateInstance={stateInstance} />
                    <Photo stateInstance={stateInstance} />
                    <Icons stateInstance={stateInstance} />
                </div>
            </div>
        )
    } 
}

VenueFeed.propTypes = {
    stateInstance: PropTypes.object.isRequired
};

