import React from "react";
import { Grid } from "semantic-ui-react";
import GuidePanel from "../guide-panel/guide-panel.component";
import SidePanel from "../side-panel/side-panel.component";

const Layout = props => {
  return (
    <>
      <Grid columns="equal" style={{ background: "#eee" }}>
        {props.currentUser && <GuidePanel />}
        {props.currentUser && <SidePanel />}
        {props.children}
      </Grid>
    </>
  );
};

export default Layout;
