import React from "react";
import { Grid } from "semantic-ui-react";
import MessageHeader from "../message-header/message-header.component";
import Messages from "../messages/messages.component";
import MessageForm from "../message-form/message-form.component";
// import MetaPanel from "../meta-panel/meta-panel.component";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectCurrentUser } from "../../redux/user/user.selectors";
import { selectCurrentChannel } from "../../redux/channel/channel.selectors";
import { firestore } from "../../firebase/firebase.utils";

import "./chat.styles.scss";

class Chat extends React.Component {
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
      this.addMessageListener(currentChannel.id);
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.currentChannel.id !== this.props.currentChannel.id) {
      this.unsubscribeFromMessages();
      this.addMessageListener(this.props.currentChannel.id);
    }
  }

  componentWillUnmount() {
    this.unsubscribeFromMessages();
  }

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
        (message.user && message.user.name && message.user.name.match(regex))
      ) {
        acc.push(message);
      }
      return acc;
    }, []);
    this.setState({ searchResults });
    setTimeout(() => this.setState({ searchLoading: false }), 1000);
  };

  render() {
    const { currentUser, currentChannel } = this.props;
    const {
      messages,
      searchResults,
      searchTerm,
      numUniqueUsers,
      searchLoading
    } = this.state;

    return (
      <>
        <Grid.Column width={6} style={{ marginLeft: 320 }}>
          <MessageHeader
            channelName={currentChannel ? `#${currentChannel.name}` : ""}
            numUniqueUsers={numUniqueUsers}
            handleSearchChange={this.handleSearchChange}
            searchLoading={searchLoading}
          />
          <Messages
            currentUser={currentUser}
            currentChannel={currentChannel}
            messages={messages}
            searchResults={searchResults}
            searchTerm={searchTerm}
          />
          <MessageForm
            currentUser={currentUser}
            currentChannel={currentChannel}
          />
        </Grid.Column>
        {/* <Grid.Column width={4}>
        <MetaPanel />
      </Grid.Column> */}
      </>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  currentChannel: selectCurrentChannel
});

export default connect(mapStateToProps)(Chat);
