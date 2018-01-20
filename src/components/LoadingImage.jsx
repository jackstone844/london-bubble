import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import img from '../../public/images/image-loading-placeholder.png';


export default class LoadingImage extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        
        return (
            <ReactCSSTransitionGroup
                transitionName="loadingItem"
                transitionAppear={true}
                transitionAppearTimeout={500}
                transitionEnterTimeout={500}
                transitionLeaveTimeout={300}>
                <img className="feed__loading-item" src={img} />
            </ReactCSSTransitionGroup>
        )
               
    }
}