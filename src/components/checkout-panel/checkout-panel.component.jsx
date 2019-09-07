import React from "react";
import { Menu, Header } from "semantic-ui-react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import StripeCheckoutButton from "../../components/stripe-button/stripe-button.component";
import { selectCartTotal } from "../../redux/cart/cart.selectors";

const CheckoutPanel = ({ total }) => {
  return (
    <Menu.Menu style={{ paddingBottom: "2em" }}>
      <Menu.Item>
        <div
          style={{ color: "white", fontSize: "large" }}
        >{`Total: $${total}`}</div>
      </Menu.Item>
      <Menu.Item>
        <StripeCheckoutButton price={total} />
      </Menu.Item>
      <Menu.Item>
        <Header color="red">Card number for testing</Header>
        <li>4242 4242 4242 4242</li>
        <li>Exp:01/20</li>
        <li>CVV:123</li>
      </Menu.Item>
    </Menu.Menu>
  );
};

const mapStateToProps = createStructuredSelector({
  total: selectCartTotal
});

export default connect(mapStateToProps)(CheckoutPanel);
