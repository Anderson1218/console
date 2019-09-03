import React from "react";
import "./App.css";
import { Route, Switch, Redirect } from "react-router-dom";

import Homepage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component";
import CheckoutPage from "./pages/checkout/checkout.component";
import SignInPage from "./pages/signin/sign-in-page.component";
import SignUpPage from "./pages/signup/sign-up-page.component";

// import Header from "./components/header/header.component";
// import ColorPanel from "./components/color-panel/color-panel.component";
import { auth, createUserProfileDocument } from "./firebase/firebase.utils";
import { connect } from "react-redux";
import { setCurrentUser } from "./redux/user/user.action";
import { createStructuredSelector } from "reselect";
import { selectCurrentUser } from "./redux/user/user.selectors";

class App extends React.Component {
  unsubscribeFromAuth = null;

  componentDidMount() {
    const { setCurrentUser } = this.props;
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      console.log("auth changed!", userAuth);
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        //to check if the database has updated at that ref
        //observable pattern
        userRef.onSnapshot(snapShot => {
          setCurrentUser({
            id: snapShot.id,
            ...snapShot.data()
          });
        });
      } else {
        setCurrentUser(userAuth);
      }
    });
  }

  //to avoid memeory leak
  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div>
        {/* <Header /> */}
        <Switch>
          {/* <Route exact path="/" component={Homepage} /> */}
          <Route
            exact
            path="/"
            render={() =>
              this.props.currentUser ? <Homepage /> : <Redirect to="/signin" />
            }
          />
          <Route path="/shop" component={ShopPage} />
          <Route
            exact
            path="/signin"
            render={() =>
              this.props.currentUser ? <Redirect to="/" /> : <SignInPage />
            }
          />
          <Route exact path="/signup" component={SignUpPage} />
          <Route exact path="/checkout" component={CheckoutPage} />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
});
const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
