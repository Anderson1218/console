import React from "react";
import { Segment, Comment } from "semantic-ui-react";
import Message from "../message/message.component";

class Messages extends React.Component {
  messagesEndRef = React.createRef();

  componentDidUpdate() {
    if (this.messagesEndRef) {
      this.scrollToBottom();
    }
  }

  scrollToBottom = () => {
    this.messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
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
    const { messages, searchResults, searchTerm } = this.props;
    return (
      <Segment style={{ background: "rgba(54,57,63,0.3)" }}>
        <Comment.Group style={{ height: "550px", overflowY: "scroll" }}>
          {searchTerm
            ? this.renderMessages(searchResults)
            : this.renderMessages(messages)}
          <div ref={this.messagesEndRef} />
        </Comment.Group>
      </Segment>
    );
  }
}

export default Messages;
