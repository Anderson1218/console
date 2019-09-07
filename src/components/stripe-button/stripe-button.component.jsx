import React from "react";
import StripeCheckout from "react-stripe-checkout";
import { clearAllItemsFromCart } from "../../redux/cart/cart.actions";
import { connect } from "react-redux";

const StripeCheckoutButton = ({ price, clearAllItemsFromCart }) => {
  //stripe requires price in cents
  const priceForStripe = price * 100;
  const publishableKey = "pk_test_XVXMKAffgMXfx8XPTHK4EfeD00hfUqDTDH";
  const onToken = token => {
    //make API call to Backend
    // console.log(token);
    clearAllItemsFromCart();
    alert("Payment Successful");
  };
  return (
    <StripeCheckout
      label="Pay Now!"
      name="An Store"
      billingAddress
      shippingAddress
      image=""
      description={`Total $${price}`}
      amount={priceForStripe}
      panelLabel="Pay"
      token={onToken}
      stripeKey={publishableKey}
    />
  );
};

const mapDispatchToProps = dispatch => ({
  clearAllItemsFromCart: () => dispatch(clearAllItemsFromCart())
});

export default connect(
  null,
  mapDispatchToProps
)(StripeCheckoutButton);
