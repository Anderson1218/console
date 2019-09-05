import React from "react";
import StripeCheckout from "react-stripe-checkout";

const StripeCheckoutButton = ({ price }) => {
  //stripe requires price in cents
  const priceForStripe = price * 100;
  const publishableKey = "pk_test_XVXMKAffgMXfx8XPTHK4EfeD00hfUqDTDH";
  const onToken = token => {
    //make API call to Backend
    console.log(token);
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
      panelLabel="Give Money"
      token={onToken}
      stripeKey={publishableKey}
    />
  );
};

export default StripeCheckoutButton;
