import React from "react";
import { Grid, Header, Icon, Dropdown, Image } from "semantic-ui-react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import {
  selectDisplayName,
  selectPhotoURL
} from "../../redux/user/user.selectors";
import { signOutStartAsync } from "../../redux/user/user.action";
import { Link } from "react-router-dom";

const dropdownOptions = signOutStartAsync => [
  {
    key: "shopping",
    text: (
      <Link to="/shop" style={{ color: "black" }}>
        Go shopping
      </Link>
    )
  },
  {
    key: "avatar",
    text: <span>Change Avatar</span>
  },
  {
    key: "signout",
    text: <span onClick={signOutStartAsync}>Sign Out</span>
  }
];

const UserPanel = ({ photoURL, displayName, signOutStartAsync }) => {
  return (
    <Grid style={{ background: "#4c3c4c" }}>
      <Grid.Column>
        <Grid.Row style={{ padding: "1.2em", margin: 0 }}>
          {/* App Header */}
          <Header floated="left" inverted as="h2">
            <Icon name="code" />
            <Header.Content>Chat Panel</Header.Content>
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
        </Grid.Row>
      </Grid.Column>
    </Grid>
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
