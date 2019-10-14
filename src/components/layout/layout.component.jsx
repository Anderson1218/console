import React from "react";
import { Grid, Container } from "semantic-ui-react";
import GuidePanel from "../guide-panel/guide-panel.component";
import SidePanel from "../side-panel/side-panel.component";
import Particles from "react-particles-js";
import "./layout.styles.scss";

const particlesOptions = {
  particles: {
    number: {
      value: 50,
      density: {
        enable: true,
        value_area: 800
      }
    }
  }
};

const Layout = props => {
  return (
    <Container fluid>
      <Grid
        style={{
          height: "100vh",
          overflow: "scroll"
        }}
      >
        <Particles className="particles" params={particlesOptions} />
        <Grid.Column width={1}>
          {props.currentUser && <GuidePanel />}
        </Grid.Column>
        <Grid.Column width={3}>
          {props.currentUser && <SidePanel />}
        </Grid.Column>
        <Grid.Column width={12}>{props.children}</Grid.Column>
      </Grid>
    </Container>
  );
};

export default Layout;
