import React from "react";
import { Header, Icon, Dropdown, Image } from "semantic-ui-react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import {
  selectDisplayName,
  selectPhotoURL
} from "../../redux/user/user.selectors";
import { Route } from "react-router-dom";
import { signOutStartAsync } from "../../redux/user/user.action";

const dropdownOptions = signOutStartAsync => [
  // {
  //   key: "avatar",
  //   text: <span>Change Avatar</span>
  // },
  {
    key: "signout",
    text: <span onClick={signOutStartAsync}>Sign Out</span>
  }
];

const UserPanel = ({ photoURL, displayName, signOutStartAsync }) => {
  return (
    <div style={{ padding: "20px" }}>
      {/* App Header */}
      <Header inverted as="h2">
        <Route
          exact
          path="/"
          render={() => (
            <>
              <Icon name="chat" />
              <Header.Content>Chat</Header.Content>
            </>
          )}
        />
        <Route
          path="/shop"
          render={() => (
            <>
              <Icon name="shop" />
              <Header.Content>Shop</Header.Content>
            </>
          )}
        />
        <Route
          path="/checkout"
          render={() => (
            <>
              <Icon name="money" />
              <Header.Content>checkout</Header.Content>
            </>
          )}
        />
        <Route
          path="/map"
          render={() => (
            <>
              <Icon name="map" />
              <Header.Content>Map</Header.Content>
            </>
          )}
        />
      </Header>
      {/* User Dropdown  */}
      <Header style={{ padding: "0.25em" }} as="h4" inverted>
        <Dropdown
          trigger={
            <span>
              <Image src={photoURL} avatar spaced="right" />
              {displayName}
            </span>
          }
          options={dropdownOptions(signOutStartAsync)}
        />
      </Header>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  displayName: selectDisplayName,
  photoURL: selectPhotoURL
});

const mapDispatchToProps = dispatch => ({
  signOutStartAsync: () => dispatch(signOutStartAsync())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserPanel);
