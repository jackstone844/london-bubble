import React from 'react';
import { 
    Image
} from 'react-bootstrap';
const FontAwesome = require('react-fontawesome');

const Loading = () => {

    return <FontAwesome
                className='icon-spinner icon-spin icon-5x'
                name='loading-icon'
                tag='i'         
            /> 
};

export default Loading;
