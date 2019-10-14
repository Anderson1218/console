import React from "react";

import "./sign-up-page.styles.scss";
import SignUp from "../../components/sign-up/sign-up.component";
import CustomTilt from "../../components/custom-tilt/custom-tilt.component";

const SignUpPage = () => (
  <div className="sign-up-page">
    <CustomTilt />
    <SignUp />
  </div>
);

export default SignUpPage;
