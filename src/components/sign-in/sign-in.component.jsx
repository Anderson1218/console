import React from "react";
import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";
import { Link } from "react-router-dom";
import {
  emailSignInStartAsync,
  googleSignInStartAsync
} from "../../redux/user/user.action";
import { connect } from "react-redux";

import "./sign-in.styles.scss";

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
  }

  handleSubmit = e => {
    e.preventDefault();
    const { email, password } = this.state;
    this.props.emailSignInStartAsync(email, password);
    this.setState({
      email: "",
      password: ""
    });
  };

  handleChange = e => {
    const { value, name } = e.target;
    this.setState({ [name]: value });
  };

  render() {
    return (
      <div className="sign-in">
        <h2>I already have an account</h2>
        <span>Sign in with your email and password</span>

        <form onSubmit={this.handleSubmit}>
          <FormInput
            name="email"
            type="email"
            value={this.state.email}
            handleChange={this.handleChange}
            label="email"
            required
          />
          <FormInput
            name="password"
            type="password"
            value={this.state.password}
            handleChange={this.handleChange}
            label="password"
            required
          />
          <div className="buttons">
            <CustomButton type="submit">Sign In</CustomButton>
            <CustomButton
              onClick={this.props.googleSignInStartAsync}
              isGoogleSignIn
            >
              Sign in with Google
            </CustomButton>
          </div>
          <Link to="/signup">go to sign up</Link>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  emailSignInStartAsync: (email, password) =>
    dispatch(emailSignInStartAsync(email, password)),
  googleSignInStartAsync: () => dispatch(googleSignInStartAsync())
});

export default connect(
  null,
  mapDispatchToProps
)(SignIn);
