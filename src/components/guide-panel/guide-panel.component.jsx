import React from "react";
import { Sidebar, Menu, Divider, Button } from "semantic-ui-react";
import { Link } from "react-router-dom";

class GuidePanel extends React.Component {
  render() {
    return (
      <Sidebar
        as={Menu}
        icon="labeled"
        inverted
        vertical
        visible
        width="very thin"
      >
        <Divider />
        <Button as={Link} to="/" icon="home" size="small" color="blue" />
        <Divider />
        <Button icon="add" size="small" color="blue" />
        <Divider />
        <Button as={Link} to="/shop" icon="shop" size="small" color="blue" />
        <Divider />
        <Button
          as={Link}
          to="/checkout"
          icon="money"
          size="small"
          color="blue"
        />
      </Sidebar>
    );
  }
}

export default GuidePanel;
