import React, { Component } from "react";
import {Loader, Dimmer, Image as ImageSemantic } from "semantic-ui-react"

let defaultImage = "http://via.placeholder.com/300x450?text=Loading";

export const init = (defImg, onLoad) => {
    if(defImg)
        defaultImage = defImg
    preloadDefaultImage(onLoad);
}

export const preloadDefaultImage = (onLoad = function(){return;}) => {
    let img = new Image();
    img.src = defaultImage;
    img.addEventListener("load", function() {
        onLoad();
    }, false);
}

export default class LazyImage extends Component {
    constructor(props){
        super(props);
        this.defaultImage = props.defaultimage || defaultImage;

        this.state = {
            imageLoading: true,
        }
        this._loadImage = this._loadImage.bind(this);
        this._loadImage();

    }

    _loadImage(){
        let img = new Image();
        img.src = this.props.image;
        let this2 = this;
        img.addEventListener("load", function() {
            this2.setState({imageLoading: false});
        }, false);
    }

    render(){
        const LoadingComponent = (
             <div>
                <Dimmer active={this.state.imageLoading}>
                    <Loader>Loading</Loader>
                </Dimmer>
                <ImageSemantic src={this.defaultImage} />
            </div>
        );

        return(
            <div>
                {this.state.imageLoading
                    ?LoadingComponent
                    :this.props.children
                }
            </div>
        );
    }
}