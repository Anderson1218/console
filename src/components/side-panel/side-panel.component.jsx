import React from "react";
import UserPanel from "../user-panel/user-panel.component";
import { Menu } from "semantic-ui-react";
import Channels from "../channels/channels.component";
import { Route } from "react-router-dom";
import CartPanel from "../cart-panel/cart-panel.component";
import CheckoutPanel from "../checkout-panel/checkout-panel.component";
import RestaurantPanel from "../restaurant-panel/restaurant-panel.component";
// import DirectMessages from "../direct-messages/direct-messages.component";

const SidePanel = () => {
  return (
    <Menu
      size="large"
      inverted
      fixed="left"
      vertical
      style={{ background: "#4c3c4c", fontSize: "1.2rem" }}
      className="side-panel"
    >
      <UserPanel />
      <Route exact path="/" component={Channels} />
      {/* <Route exact path="/" component={DirectMessages} /> */}
      <Route path="/shop" component={CartPanel} />
      <Route exact path="/checkout" component={CheckoutPanel} />
      <Route exact path="/map" component={RestaurantPanel} />
    </Menu>
  );
};

export default SidePanel;
