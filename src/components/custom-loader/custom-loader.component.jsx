import React from "react";
import { Dimmer, Loader } from "semantic-ui-react";

const CustomLoader = () => (
  <Dimmer active>
    <Loader size="large" content={"Loading..."} />
  </Dimmer>
);

export default CustomLoader;
