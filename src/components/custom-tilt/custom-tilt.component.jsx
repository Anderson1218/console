import React from "react";
import Tilt from "react-tilt";

const imgUrl =
  "https://scontent.ftpe7-3.fna.fbcdn.net/v/t1.0-1/p160x160/51479936_1563908063712666_1276508643088400384_n.jpg?_nc_cat=108&_nc_oc=AQnws6OG8F1juJkpoGoxNJCyzpulB0zYgebx06Qr8TmuKFQZxU3mcTS4hB-L-K2Brnc&_nc_ht=scontent.ftpe7-3.fna&oh=849d00cdef415a3fe5c13237f3e6ed18&oe=5DFBD4DE";

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
      alignSelf: "flex-start"
    }}
  >
    <img alt="img" src={imgUrl} style={{ marginLeft: "1.5rem" }} />
  </Tilt>
);

export default CustomTilt;
