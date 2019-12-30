import React from "react";
import Tilt from "react-tilt";

const imgUrl = "https://avatars3.githubusercontent.com/u/8858082?s=460&v=4";

const CustomTilt = () => (
  <Tilt
    className="Tilt"
    options={{ max: 25 }}
    style={{
      height: "15rem",
      width: "15rem",
      boxShadow: "0.5em 0.5em 1em 0.5em rgba(0, 0, 0, 0.5)",
      display: "flex",
      justfyContent: "center",
      alignItems: "center",
      alignSelf: "flex-start",
      minWidth: "200px"
    }}
  >
    <div>
      <img
        alt="img"
        width="150px"
        src={imgUrl}
        style={{ marginLeft: "1.6rem" }}
      />
    </div>
  </Tilt>
);

export default CustomTilt;
