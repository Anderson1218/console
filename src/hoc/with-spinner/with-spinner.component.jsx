import React from "react";
import { Dimmer, Loader } from "semantic-ui-react";

const styles = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "70vh"
};

const WithSpinner = WrappedComponent => ({ isLoading, ...otherProps }) => {
  return isLoading ? (
    <div style={styles}>
      <Dimmer active>
        <Loader size="large" content={"Loading..."} />
      </Dimmer>
    </div>
  ) : (
    <WrappedComponent {...otherProps} />
  );
};

export default WithSpinner;
