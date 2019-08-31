import React from "react";
import UserPanel from "../user-panel/user-panel.component";
import { Menu } from "semantic-ui-react";
import Channels from "../channels/channels.component";

class SidePanel extends React.Component {
  render() {
    return (
      <Menu
        size="large"
        inverted
        fixed="left"
        vertical
        style={{ background: "#4c3c4c", fontSize: "1.2rem" }}
      >
        <UserPanel />
        <Channels />
      </Menu>
    );
  }
}

export default SidePanel;
