import React from "react";
import firebase from "../../firebase/firebase.utils";
import { firestore } from "../../firebase/firebase.utils";
import { Segment, Button, Input } from "semantic-ui-react";
import "./message-form.styles.scss";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectCurrentUser } from "../../redux/user/user.selectors";
import { selectCurrentChannel } from "../../redux/channel/channel.selectors";

class MessageForm extends React.Component {
  state = {
    message: "",
    loading: false,
    errors: []
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  createMessage = () => {
    const { currentUser } = this.props;
    const message = {
      timestamp: firebase.firestore.Timestamp.fromDate(new Date()),
      user: {
        id: currentUser.id,
        name: currentUser.displayName,
        avatar: currentUser.photoURL
      },
      content: this.state.message
    };
    return message;
  };

  sendMessage = () => {
    const { currentChannel } = this.props;
    const { message } = this.state;
    const messagesRef = firestore
      .collection("channels")
      .doc(currentChannel.id)
      .collection("messages")
      .doc();

    if (message) {
      this.setState({ loading: true });
      messagesRef
        .set(this.createMessage())
        .then(() => {
          this.setState({ loading: false, message: "", errors: [] });
        })
        .catch(err => {
          console.error(err);
          this.setState({
            loading: false,
            errors: this.state.errors.concat(err)
          });
        });
    } else {
      this.setState({
        errors: this.state.errors.concat({ message: "Add a message" })
      });
    }
  };

  render() {
    const { errors, message, loading } = this.state;

    return (
      <Segment className="message__form">
        <Input
          fluid
          name="message"
          onChange={this.handleChange}
          value={message}
          style={{ marginBottom: "0.7em" }}
          label={<Button icon={"add"} />}
          labelPosition="left"
          className={
            errors.some(error => error.message.includes("message"))
              ? "error"
              : ""
          }
          placeholder="Write your message"
        />
        <Button.Group icon widths="2">
          <Button
            onClick={this.sendMessage}
            disabled={loading}
            color="orange"
            content="Add Reply"
            labelPosition="left"
            icon="edit"
          />
          <Button
            color="teal"
            content="Upload Media"
            labelPosition="right"
            icon="cloud upload"
          />
        </Button.Group>
      </Segment>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  currentChannel: selectCurrentChannel
});

export default connect(mapStateToProps)(MessageForm);
