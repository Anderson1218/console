import React from "react";
import moment from "moment";
import { Comment, Image } from "semantic-ui-react";
import "./message.styles.scss";

const isOwnMessage = (message, user) => {
  return message.user.id === user.id ? "message__self" : "";
};

const isImage = message => {
  return message.hasOwnProperty("image") && !message.hasOwnProperty("content");
};

const timeFromNow = timestamp => moment.unix(timestamp.seconds).fromNow();

const Message = ({ message, user }) => (
  <Comment>
    <Comment.Avatar src={message.user.avatar} />
    <Comment.Content className={isOwnMessage(message, user)}>
      <Comment.Author as="a" style={{ color: "rgb(52, 152, 219)" }}>
        {message.user.name}
      </Comment.Author>
      <Comment.Metadata style={{ color: "rgba(255,255,255,0.2)" }}>
        {timeFromNow(message.timestamp)}
      </Comment.Metadata>
      {isImage(message) ? (
        <Image src={message.image} className="message__image" />
      ) : (
        <Comment.Text style={{ color: "#dcddde" }}>
          {message.content}
        </Comment.Text>
      )}
    </Comment.Content>
  </Comment>
);

export default Message;
