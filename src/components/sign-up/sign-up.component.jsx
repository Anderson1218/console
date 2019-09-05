import React from "react";
import { signUpStartAsync, clearErrorInfo } from "../../redux/user/user.action";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectUserError } from "../../redux/user/user.selectors";
import { Grid, Form, Segment, Header, Message } from "semantic-ui-react";
import { Link } from "react-router-dom";

class SignUp extends React.Component {
  state = {
    displayName: "",
    email: "",
    password: "",
    confirmPassword: "",
    errors: []
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { displayName, email, password } = this.state;
    if (this.isFormValid()) {
      this.props.signUpStartAsync(email, password, displayName);
    } else {
      alert("front-end validation fail!");
    }
  };

  isFormValid = () => {
    let errors = [];
    let error;
    if (this.isFormEmpty(this.state)) {
      error = { message: "Fill in all fields" };
      this.setState({ errors: errors.concat(error) });
      return false;
    } else if (!this.isPasswordValid(this.state)) {
      error = { message: "Password is invalid" };
      this.setState({ errors: errors.concat(error) });
      return false;
    } else {
      return true;
    }
  };

  isFormEmpty = ({ displayName, email, password, confirmPassword }) => {
    return (
      !displayName.length ||
      !email.length ||
      !password.length ||
      !confirmPassword.length
    );
  };

  isPasswordValid = ({ password, confirmPassword }) => {
    if (password.length < 6 || confirmPassword.length < 6) {
      return false;
    } else if (password !== confirmPassword) {
      return false;
    } else {
      return true;
    }
  };
  // displayErrors = errors => {
  //   return errors.map((error, i) => <p key={i}>{error.message}</p>);
  // };

  render() {
    const { displayName, email, password, confirmPassword } = this.state;
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
              Register
            </Header>
            <Form onSubmit={this.handleSubmit} size="huge">
              <Segment stacked inverted>
                <Form.Field>
                  <input
                    style={{ background: "rgba(0,0,0,.1)", color: "white" }}
                    name="displayName"
                    placeholder="Display Name"
                    onChange={this.handleChange}
                    value={displayName}
                    type="text"
                    autoComplete="off"
                  />
                </Form.Field>
                <Form.Field>
                  <input
                    style={{ background: "rgba(0,0,0,.1)", color: "white" }}
                    name="email"
                    placeholder="Email Address"
                    onChange={this.handleChange}
                    value={email}
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
                    type="password"
                    autoComplete="off"
                  />
                </Form.Field>
                <Form.Field>
                  <input
                    style={{ background: "rgba(0,0,0,.1)", color: "white" }}
                    name="confirmPassword"
                    placeholder="Confirm Password"
                    onChange={this.handleChange}
                    value={confirmPassword}
                    type="password"
                    autoComplete="off"
                  />
                </Form.Field>
                <Form.Button primary fluid size="small" type="submit">
                  Register
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
              Already have an account?{" "}
              <Link to="/signin" onClick={this.props.clearErrorInfo}>
                Login
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
  signUpStartAsync: (email, password, displayName) =>
    dispatch(signUpStartAsync(email, password, displayName)),
  clearErrorInfo: () => dispatch(clearErrorInfo())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUp);
