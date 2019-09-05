import React from "react";
import {
  emailSignInStartAsync,
  googleSignInStartAsync,
  clearErrorInfo
} from "../../redux/user/user.action";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectUserError } from "../../redux/user/user.selectors";
import { Grid, Form, Segment, Header, Message } from "semantic-ui-react";
import { Link } from "react-router-dom";

class SignIn extends React.Component {
  state = {
    email: "",
    password: "",
    errors: [],
    loading: false
  };

  displayErrors = errors =>
    errors.map((error, i) => <p key={i}>{error.message}</p>);

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = event => {
    event.preventDefault();
    if (this.isFormValid(this.state)) {
      this.setState({ errors: [], loading: true });
      this.props.emailSignInStartAsync(this.state.email, this.state.password);
    }
  };

  isFormValid = ({ email, password }) => email && password;

  handleInputError = (errors, inputName) => {
    return errors.some(error => error.message.toLowerCase().includes(inputName))
      ? "error"
      : "";
  };

  render() {
    const { email, password, errors, loading } = this.state;
    const { error } = this.props;

    return (
      <Grid
        textAlign="center"
        verticalAlign="middle"
        style={{
          width: "400px",
          background: "rgba(54,57,63,1)",
          borderRadius: "5px",
          padding: "30px"
        }}
      >
        <Grid.Row>
          <Grid.Column>
            <Header as="h2" icon inverted textAlign="center">
              Login
            </Header>
            <Form onSubmit={this.handleSubmit} size="huge">
              <Segment stacked inverted>
                <Form.Field>
                  <input
                    style={{ background: "rgba(0,0,0,.1)", color: "white" }}
                    name="email"
                    placeholder="Email Address"
                    onChange={this.handleChange}
                    value={email}
                    className={this.handleInputError(errors, "email")}
                    type="email"
                    autoComplete="off"
                  />
                </Form.Field>
                <Form.Field>
                  <input
                    style={{ background: "rgba(0,0,0,.1)", color: "white" }}
                    name="password"
                    placeholder="Password"
                    onChange={this.handleChange}
                    value={password}
                    className={this.handleInputError(errors, "password")}
                    type="password"
                    autoComplete="off"
                  />
                </Form.Field>
                <Form.Button
                  disabled={loading}
                  primary
                  fluid
                  size="small"
                  type="submit"
                >
                  Login
                </Form.Button>
                <Form.Button
                  disabled={loading}
                  primary
                  fluid
                  size="small"
                  onClick={this.props.googleSignInStartAsync}
                >
                  Login with Google
                </Form.Button>
              </Segment>
            </Form>
            {error && (
              <Message color="black">
                <h3>Error</h3>
                {error.message}
              </Message>
            )}
            <Message color="black">
              Need an account?{" "}
              <Link to="/signup" onClick={this.props.clearErrorInfo}>
                Register
              </Link>
            </Message>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  error: selectUserError
});

const mapDispatchToProps = dispatch => ({
  emailSignInStartAsync: (email, password) =>
    dispatch(emailSignInStartAsync(email, password)),
  googleSignInStartAsync: () => dispatch(googleSignInStartAsync()),
  clearErrorInfo: () => dispatch(clearErrorInfo())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignIn);
