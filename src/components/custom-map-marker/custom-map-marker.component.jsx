import React from "react";
import CustomInfoWindow from "../custom-map-info-window/custom-info-window.component";

const CustomMapMarker = props => {
  const markerStyle = {
    border: "1px solid white",
    borderRadius: "50%",
    height: 20,
    width: 20,
    backgroundColor: props.show ? "red" : "blue",
    cursor: "pointer",
    zIndex: 10
  };

  return (
    <>
      <img style={markerStyle} src={props.imageURL} alt="marker" />
      {props.show && <CustomInfoWindow place={props.place} />}
    </>
  );
};

export default CustomMapMarker;
