import React from "react";
import { Segment, Comment } from "semantic-ui-react";

import MessageHeader from "../message-header/message-header.component";
import MessageForm from "../message-form/message-form.component";

import "./messages.styles.scss";

class Messages extends React.Component {
  render() {
    return (
      <>
        <MessageHeader />

        <Segment>
          <Comment.Group className="messages">{/* Messages */}</Comment.Group>
        </Segment>

        <MessageForm />
      </>
    );
  }
}

export default Messages;
