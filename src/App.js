import React, { lazy, Suspense } from "react";
import "./App.css";
import { Route, Switch, Redirect } from "react-router-dom";
import PrivateRoute from "./components/private-route/private-route.component";
import CustomLoader from "./components/custom-loader/custom-loader.component";
import Layout from "./components/layout/layout.component";
import NotFoundPage from "./pages/not-found-page/not-found-page.component";
import ErrorBundary from "./components/error-boundary/error-bundary.component";
import { auth, createUserProfileDocument } from "./firebase/firebase.utils";
import { connect } from "react-redux";
import {
  setCurrentUser,
  getCurrentLocationStartAsync
} from "./redux/user/user.action";
import { createStructuredSelector } from "reselect";
import {
  selectCurrentUser,
  selectUserIsLoading
} from "./redux/user/user.selectors";

const HomePage = lazy(() => import("./pages/homepage/homepage.component"));
const ShopPage = lazy(() => import("./pages/shop/shop.component"));
const CheckoutPage = lazy(() => import("./pages/checkout/checkout.component"));
const SignInPage = lazy(() => import("./pages/signin/sign-in-page.component"));
const SignUpPage = lazy(() => import("./pages/signup/sign-up-page.component"));
const GoogleMapPage = lazy(() =>
  import("./pages/google-map-page/google-map-page.container")
);

class App extends React.Component {
  unsubscribeFromAuth = null;

  componentDidMount() {
    const { setCurrentUser, getCurrentLocationStartAsync } = this.props;
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);
        //to check if the database has updated at that ref
        //observable pattern
        userRef.onSnapshot(snapShot => {
          setCurrentUser({
            id: snapShot.id,
            ...snapShot.data()
          });
          getCurrentLocationStartAsync();
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
      <CustomLoader />
    ) : (
      <Layout currentUser={currentUser}>
        <Suspense fallback={<CustomLoader />}>
          <ErrorBundary>
            <Switch>
              <PrivateRoute
                exact
                path="/"
                isAuthenticated={currentUser}
                component={HomePage}
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
              <PrivateRoute
                exact
                path="/map"
                isAuthenticated={currentUser}
                component={GoogleMapPage}
              />
              <Route
                exact
                path="/signin"
                render={() =>
                  currentUser ? <Redirect to="/" /> : <SignInPage />
                }
              />
              <Route
                exact
                path="/signup"
                render={() =>
                  currentUser ? <Redirect to="/" /> : <SignUpPage />
                }
              />
              <Route component={NotFoundPage} />
            </Switch>
          </ErrorBundary>
        </Suspense>
      </Layout>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  isLoading: selectUserIsLoading
});
const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user)),
  getCurrentLocationStartAsync: () => dispatch(getCurrentLocationStartAsync())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
