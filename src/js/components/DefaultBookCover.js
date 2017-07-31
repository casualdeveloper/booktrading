import React, { Component } from "react";

export default class DefaultBookCover extends Comment {
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div className="default-book-cover">
                <h3>{this.props.title}</h3>
            </div>
        );
    }
}