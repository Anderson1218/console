import React from "react";
import { Menu } from "semantic-ui-react";
import CartIcon from "../cart-icon/cart-icon.component";
import CartDropdown from "../cart-dropdown/cart-dropdown.component";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectCartHidden } from "../../redux/cart/cart.selectors";

const CartPanel = ({ hidden }) => {
  return (
    <Menu.Menu style={{ paddingBottom: "2em" }}>
      <Menu.Item>
        <CartIcon />
      </Menu.Item>
      {hidden ? null : <CartDropdown />}
    </Menu.Menu>
  );
};

const mapStateToProps = createStructuredSelector({
  hidden: selectCartHidden
});

export default connect(mapStateToProps)(CartPanel);
