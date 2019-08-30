import React from "react";
import { Grid } from "semantic-ui-react";

import ColorPanel from "../color-panel/color-panel.component";
import SidePanel from "../side-panel/side-panel.component";
import Messages from "../messages/messages.component";
import MetaPanel from "../meta-panel/meta-panel.component";

const Chat = () => (
  <Grid columns="equal" className="app" style={{ background: "#eee" }}>
    <ColorPanel />
    <SidePanel />

    <Grid.Column style={{ marginLeft: 320 }}>
      <Messages />
    </Grid.Column>

    <Grid.Column width={4}>
      <MetaPanel />
    </Grid.Column>
  </Grid>
);

export default Chat;
