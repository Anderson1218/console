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
        columns="equal"
        style={{
          height: "100vh"
        }}
      >
        <Particles className="particles" params={particlesOptions} />
        {props.currentUser && <GuidePanel />}
        {props.currentUser && <SidePanel />}
        {props.children}
      </Grid>
    </Container>
  );
};

export default Layout;
