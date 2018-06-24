import React from "react";

const ImageCard = props => (
    <div className="col-sm-3">
    <div className="card bg-dark text-white">
        <img className="card-img" src={props.src} alt={props.alt} onClick={() => props.onClick(props.id)}/>

    </div>
    </div>
);

export default ImageCard;