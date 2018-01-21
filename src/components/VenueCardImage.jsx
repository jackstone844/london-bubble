import React from 'react';
import PropTypes from 'prop-types';
import { Image } from 'react-bootstrap';
import LoadingImage from './LoadingImage';
import Img from 'react-image';


export default class Photo extends React.Component {
    constructor(props){
        super(props);
    }

    render() {

        const appStateInstance = this.props.stateInstance;

        let paddingStyle = {
            paddingTop: '10px',
            paddingBottom: '10px'
        };

        return (

            <div style={paddingStyle}>
                <Img
                    src={[
                        appStateInstance.image,
                    ]}
                    loader={<LoadingImage />}
                    className='img-responsive img-rounded'
                />
                {/*<Image key={2} src={stateInstance.image} onLoad={this.imageLoader} responsive rounded />*/}
            </div>
        )
    }
}

Photo.propTypes = {
    stateInstance: PropTypes.object.isRequired
};
