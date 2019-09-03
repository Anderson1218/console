import React from "react";
import firebase from "../../firebase/firebase.utils";
import { firestore } from "../../firebase/firebase.utils";
import { Segment, Button, Input } from "semantic-ui-react";
import FileModal from "../file-modal/file-modal.component";
import "./message-form.styles.scss";

class MessageForm extends React.Component {
  state = {
    message: "",
    loading: false,
    errors: [],
    modal: false
  };

  openModal = () => this.setState({ modal: true });

  closeModal = () => this.setState({ modal: false });

  uploadFile = (file, metadata) => {
    console.log(file, metadata);
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
    const { errors, message, loading, modal } = this.state;
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
            content="Send Messages"
            labelPosition="left"
            icon="edit"
          />
          <Button
            onClick={this.openModal}
            color="teal"
            content="Upload Media"
            labelPosition="right"
            icon="cloud upload"
          />
        </Button.Group>
        <FileModal
          modal={modal}
          closeModal={this.closeModal}
          uploadFile={this.uploadFile}
        />
      </Segment>
    );
  }
}

export default MessageForm;
