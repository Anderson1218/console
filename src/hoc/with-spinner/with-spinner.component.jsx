import React from "react";
import Spinner from "react-bootstrap/Spinner";

const styles = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "70vh"
};

const WithSpinner = WrappedComponent => ({ isLoading, ...otherProps }) => {
  return isLoading ? (
    <div style={styles}>
      <Spinner animation="border" role="status">
        <span className="sr-only">Loading...</span>
      </Spinner>
    </div>
  ) : (
    <WrappedComponent {...otherProps} />
  );
};

export default WithSpinner;
