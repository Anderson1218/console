import React from "react";
import { Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
import { fetchCollectionStartAsync } from "../../redux/shop/shop.action";
import CollectionsOverviewContainer from "../../components/collections-overview/collections-overview.container";
import CollectionPageContainer from "../collection/collection.container";
import { Grid } from "semantic-ui-react";
import NotFoundPage from "../not-found-page/not-found-page.component";

class ShopPage extends React.Component {
  componentDidMount() {
    const { fetchCollectionStartAsync } = this.props;
    fetchCollectionStartAsync();
  }

  render() {
    const { match } = this.props;
    return (
      <Grid.Column width={12} style={{ marginLeft: 320 }}>
        <Switch>
          <Route
            exact
            path={`${match.path}`}
            component={CollectionsOverviewContainer}
          />
          <Route
            exact
            path={`${match.path}/:collectionId`}
            component={CollectionPageContainer}
          />
          <Route component={NotFoundPage} />
        </Switch>
      </Grid.Column>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  fetchCollectionStartAsync: () => dispatch(fetchCollectionStartAsync())
});

export default connect(
  null,
  mapDispatchToProps
)(ShopPage);
