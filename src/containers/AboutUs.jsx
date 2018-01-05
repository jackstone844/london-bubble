import React from 'react';
import {Button} from 'react-bootstrap';

class About extends React.Component {
    render() {
        return (
            <div className="row">
                <div className="col col-md-6 col-md-offset-3 container-fluid jumbotron">
                    <h3>About</h3>
                    <hr />
                    <p>Hackney Wick, London</p>
                    <p>Duis a turpis sed lacus dapibus elementum sed eu lectus.</p>
                    <Button bsStyle="primary">Primary</Button>
                </div>
            </div>
        );
    }
}

export default About;