import React from 'react';
import { 
    Image
} from 'react-bootstrap';
import PropTypes from 'prop-types';


export default class Photo extends React.Component {
    render() {

        const state = this.props.state;

        return [
            <hr key={1} />,
            <Image key={2} src={state.image} responsive rounded />,
            <hr key={3} />
        ];
    }
}

Photo.propTypes = {
    state: PropTypes.object.isRequired
};
