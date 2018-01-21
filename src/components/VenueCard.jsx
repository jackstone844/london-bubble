import React from 'react';
import Icons from './VenueCardInfo.jsx';
import Header from './VenueCardHeader.jsx';
import Photo from './VenueCardImage.jsx';
import PropTypes from 'prop-types';

export default class VenueCard extends React.Component {
    render() {
 
        const appStateInstance = this.props.stateInstance;

        return (
            <div className="col col-md-6 col-md-offset-3 container-fluid jumbotron">
                <div>
                    <Header stateInstance={appStateInstance} />
                    <Photo stateInstance={appStateInstance} />
                    <Icons stateInstance={appStateInstance} />
                </div>
            </div>
        )
    } 
}

VenueCard.propTypes = {
    stateInstance: PropTypes.object.isRequired
};

