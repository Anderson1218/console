import React from "react";
import { Grid } from "semantic-ui-react";

// import SidePanel from "../side-panel/side-panel.component";
import Messages from "../messages/messages.component";
import MetaPanel from "../meta-panel/meta-panel.component";

import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectCurrentUser } from "../../redux/user/user.selectors";
import { selectCurrentChannel } from "../../redux/channel/channel.selectors";

import "./chat.styles.scss";

const Chat = props => {
  //currentChannel is null in first render
  return (
    <>
      {/* <SidePanel /> */}
      <Grid.Column style={{ marginLeft: 320 }}>
        {props.currentChannel && (
          <Messages
            currentUser={props.currentUser}
            currentChannel={props.currentChannel}
          />
        )}
      </Grid.Column>
      <Grid.Column width={4}>
        <MetaPanel />
      </Grid.Column>
    </>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  currentChannel: selectCurrentChannel
});

export default connect(mapStateToProps)(Chat);
