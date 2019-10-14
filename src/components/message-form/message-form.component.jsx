import React from "react";
import firebase from "../../firebase/firebase.utils";
import { firestore, storage } from "../../firebase/firebase.utils";
import { Segment, Button, Input } from "semantic-ui-react";
import FileModal from "../file-modal/file-modal.component";
import ProgressBar from "../progress-bar/progress-bar.component";

import uuidv4 from "uuid/v4";
import "./message-form.styles.scss";

class MessageForm extends React.Component {
  state = {
    message: "",
    loading: false,
    errors: [],
    modal: false,
    storageRef: storage.ref(),
    uploadTask: null,
    uploadState: "",
    percentUploaded: 0
  };

  openModal = () => this.setState({ modal: true });

  closeModal = () => this.setState({ modal: false });

  uploadFile = (file, metadata) => {
    const { currentChannel } = this.props;
    const pathToUpload = currentChannel.id;
    const ref = firestore
      .collection("channels")
      .doc(currentChannel.id)
      .collection("messages")
      .doc();
    const filePath = `chat/public/${uuidv4()}.jpg`;

    this.setState(
      {
        uploadState: "uploading",
        uploadTask: this.state.storageRef.child(filePath).put(file, metadata)
      },
      () => {
        this.state.uploadTask.on(
          "state_changed",
          snap => {
            const percentUploaded = Math.round(
              (snap.bytesTransferred / snap.totalBytes) * 100
            );
            this.setState({ percentUploaded });
          },
          err => {
            console.error(err);
            this.setState({
              errors: this.state.errors.concat(err),
              uploadState: "error",
              uploadTask: null
            });
          },
          () => {
            this.state.uploadTask.snapshot.ref
              .getDownloadURL()
              .then(downloadUrl => {
                this.sendFileMessage(downloadUrl, ref, pathToUpload);
              })
              .catch(err => {
                this.setState({
                  errors: this.state.errors.concat(err),
                  uploadState: "error",
                  uploadTask: null
                });
              });
          }
        );
      }
    );
  };

  sendFileMessage = (fileUrl, ref, pathToUpload) => {
    ref
      .set(this.createMessage(fileUrl))
      .then(() => {
        this.setState({ uploadState: "done" });
      })
      .catch(err => {
        console.error(err);
        this.setState({
          errors: this.state.errors.concat(err)
        });
      });
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  createMessage = (fileUrl = null) => {
    const { currentUser } = this.props;
    const message = {
      timestamp: firebase.firestore.Timestamp.fromDate(new Date()),
      user: {
        id: currentUser.id,
        name: currentUser.displayName,
        avatar: currentUser.photoURL
      }
    };
    if (fileUrl !== null) {
      message["image"] = fileUrl;
    } else {
      message["content"] = this.state.message;
    }
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
    const {
      errors,
      message,
      loading,
      modal,
      uploadState,
      percentUploaded
    } = this.state;
    return (
      <Segment
        className="message__form"
        style={{
          background: "rgba(54,57,63,0.3)",
          marginBottom: "2rem",
          width: "50em"
        }}
      >
        <Input
          transparent
          fluid
          name="message"
          onChange={this.handleChange}
          value={message}
          style={{ marginBottom: "0.7em" }}
          labelPosition="left"
          autoComplete="off"
          className={
            errors.some(error => error.message.includes("message"))
              ? "error"
              : ""
          }
          placeholder="Write your message"
        />
        <Button.Group icon widths="2">
          <Button
            inverted
            onClick={this.sendMessage}
            disabled={loading}
            content="Send Messages"
            labelPosition="left"
            icon="edit"
          />
          <Button
            inverted
            onClick={this.openModal}
            disabled={uploadState === "uploading"}
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
        <ProgressBar
          uploadState={uploadState}
          percentUploaded={percentUploaded}
        />
      </Segment>
    );
  }
}

export default MessageForm;
