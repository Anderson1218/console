import React from "react";
import "./App.css";
import { Route, Switch, Redirect } from "react-router-dom";
import PrivateRoute from "./components/private-route/private-route.component";
import { Dimmer, Loader } from "semantic-ui-react";

import Layout from "./components/layout/layout.component";
import Homepage from "./pages/homepage/homepage.component";
import ShopPage from "./pages/shop/shop.component";
import CheckoutPage from "./pages/checkout/checkout.component";
import SignInPage from "./pages/signin/sign-in-page.component";
import SignUpPage from "./pages/signup/sign-up-page.component";

import { auth, createUserProfileDocument } from "./firebase/firebase.utils";
import { connect } from "react-redux";
import { setCurrentUser } from "./redux/user/user.action";
import { createStructuredSelector } from "reselect";
import {
  selectCurrentUser,
  selectUserIsLoading
} from "./redux/user/user.selectors";

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
        //Auth === null
        setCurrentUser(userAuth);
      }
    });
  }

  //to avoid memeory leak
  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    const { isLoading, currentUser } = this.props;
    return isLoading ? (
      <Dimmer active>
        <Loader size="large" content={"Loading..."} />
      </Dimmer>
    ) : (
      <Layout currentUser={currentUser}>
        <Switch>
          <PrivateRoute
            exact
            path="/"
            isAuthenticated={currentUser}
            component={Homepage}
          />
          <PrivateRoute
            path="/shop"
            isAuthenticated={currentUser}
            component={ShopPage}
          />
          <PrivateRoute
            exact
            path="/checkout"
            isAuthenticated={currentUser}
            component={CheckoutPage}
          />
          <Route
            exact
            path="/signin"
            render={() => (currentUser ? <Redirect to="/" /> : <SignInPage />)}
          />
          <Route
            exact
            path="/signup"
            render={() => (currentUser ? <Redirect to="/" /> : <SignUpPage />)}
          />
        </Switch>
      </Layout>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  isLoading: selectUserIsLoading
});
const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
