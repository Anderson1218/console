import React from "react";
import { Segment, Comment } from "semantic-ui-react";

import MessageHeader from "../message-header/message-header.component";
import Message from "../message/message.component";
import MessageForm from "../message-form/message-form.component";

import "./messages.styles.scss";

import { firestore } from "../../firebase/firebase.utils";

class Messages extends React.Component {
  state = {
    messages: [],
    messagesLoading: true
  };

  componentDidMount() {
    const { currentChannel, currentUser } = this.props;
    if (currentChannel && currentUser) {
      this.addListeners(currentChannel.id);
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.currentChannel.id !== this.props.currentChannel.id) {
      this.unsubscribeFromMessages();
      this.addListeners(this.props.currentChannel.id);
    }
  }

  componentWillUnmount() {
    this.unsubscribeFromMessages();
  }

  addListeners = channelId => {
    this.addMessageListener(channelId);
  };

  addMessageListener = channelId => {
    const messagesRef = firestore
      .collection("channels")
      .doc(channelId)
      .collection("messages");
    this.unsubscribeFromMessages = messagesRef.onSnapshot(snapshot => {
      let loadedMessages = [];
      snapshot.forEach(doc => {
        loadedMessages.push(doc.data());
      });
      loadedMessages.sort((a, b) => a.timestamp.seconds - b.timestamp.seconds);
      this.setState({
        messages: loadedMessages,
        messagesLoading: false
      });
    });
  };

  renderMessages = messages =>
    messages.length > 0 &&
    messages.map(message => (
      <Message
        key={message.timestamp}
        message={message}
        user={this.props.currentUser}
      />
    ));

  render() {
    const { messages } = this.state;
    const { currentUser, currentChannel } = this.props;
    return (
      <React.Fragment>
        <MessageHeader />

        <Segment>
          <Comment.Group className="messages">
            {this.renderMessages(messages)}
          </Comment.Group>
        </Segment>

        <MessageForm
          currentUser={currentUser}
          currentChannel={currentChannel}
        />
      </React.Fragment>
    );
  }
}

export default Messages;
