import React from "react";
import "./custom-info-window.styles.scss";
const CustomInfoWindow = props => {
  const { place } = props;
  return (
    <div className="custom-info-window">
      <div style={{ fontSize: 16 }}>{place.name}</div>
      <div style={{ fontSize: 14 }}>
        <span style={{ color: "grey" }}>{place.rating} </span>
        <span style={{ color: "orange" }}>
          {String.fromCharCode(9733).repeat(Math.floor(place.rating))}
        </span>
        <span style={{ color: "lightgrey" }}>
          {String.fromCharCode(9733).repeat(5 - Math.floor(place.rating))}
        </span>
      </div>
      <div style={{ fontSize: 14, color: "grey" }}>
        {"$".repeat(place.price_level)}
      </div>
      {place.opening_hours && (
        <div style={{ fontSize: 14, color: "green" }}>
          {place.opening_hours.open_now ? "Open" : "Closed"}
        </div>
      )}
      <div style={{ fontSize: 14, color: "grey" }}>{place.vicinity}</div>
    </div>
  );
};

export default CustomInfoWindow;
