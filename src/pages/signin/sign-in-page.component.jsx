import React from "react";

import "./sign-in-page.styles.scss";
import SignIn from "../../components/sign-in/sign-in.component";
import CustomTilt from "../../components/custom-tilt/custom-tilt.component";

const SignInPage = () => (
  <>
    <div className="sign-in-page">
      <CustomTilt />
      <SignIn />
    </div>
  </>
);

export default SignInPage;
