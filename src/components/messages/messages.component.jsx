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
    messagesLoading: true,
    numUniqueUsers: "",
    searchTerm: "",
    searchLoading: false,
    searchResults: []
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

  countUniqueUsers = messages => {
    const uniqueUsers = messages.reduce((acc, message) => {
      if (!acc.includes(message.user.name)) {
        acc.push(message.user.name);
      }
      return acc;
    }, []);
    const plural = uniqueUsers.length > 1 || uniqueUsers.length === 0;
    const numUniqueUsers = `${uniqueUsers.length} user${plural ? "s" : ""}`;
    this.setState({ numUniqueUsers });
  };

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
      this.countUniqueUsers(loadedMessages);
    });
  };

  displayChannelName = channel => (channel ? `#${channel.name}` : "");

  handleSearchChange = event => {
    this.setState(
      {
        searchTerm: event.target.value,
        searchLoading: true
      },
      () => this.handleSearchMessages()
    );
  };

  handleSearchMessages = () => {
    const channelMessages = [...this.state.messages];
    const regex = new RegExp(this.state.searchTerm, "gi");
    const searchResults = channelMessages.reduce((acc, message) => {
      if (
        (message.content && message.content.match(regex)) ||
        message.user.name.match(regex)
      ) {
        acc.push(message);
      }
      return acc;
    }, []);
    this.setState({ searchResults });
    setTimeout(() => this.setState({ searchLoading: false }), 1000);
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
    const {
      messages,
      numUniqueUsers,
      searchTerm,
      searchResults,
      searchLoading
    } = this.state;
    const { currentUser, currentChannel } = this.props;
    return (
      <React.Fragment>
        <MessageHeader
          channelName={this.displayChannelName(currentChannel)}
          numUniqueUsers={numUniqueUsers}
          handleSearchChange={this.handleSearchChange}
          searchLoading={searchLoading}
        />

        <Segment>
          <Comment.Group className="messages">
            {searchTerm
              ? this.renderMessages(searchResults)
              : this.renderMessages(messages)}
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
