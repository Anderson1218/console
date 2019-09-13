import React from "react";

const CustomMapMarker = ({ imageURL }) => (
  <img
    style={{
      height: "3em",
      weight: "3em"
    }}
    src={imageURL}
    alt="marker"
  />
);

export default CustomMapMarker;
