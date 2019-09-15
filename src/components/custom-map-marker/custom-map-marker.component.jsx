import React from "react";
import CustomInfoWindow from "../custom-map-info-window/custom-info-window.component";
import "./custom-map-marker.styles.scss";

const CustomMapMarker = props => {
  return (
    <div className="marker-container">
      <img className="custom-marker" src={props.imageURL} alt="marker" />
      {props.show && <CustomInfoWindow place={props.place} />}
    </div>
  );
};

export default CustomMapMarker;
