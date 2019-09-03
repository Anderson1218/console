import React from "react";
import { Route } from "react-router-dom";
import { connect } from "react-redux";
import { fetchCollectionStartAsync } from "../../redux/shop/shop.action";
import CollectionsOverviewContainer from "../../components/collections-overview/collections-overview.container";
import CollectionPageContainer from "../collection/collection.container";
import Header from "../../components/header/header.component";

class ShopPage extends React.Component {
  componentDidMount() {
    const { fetchCollectionStartAsync } = this.props;
    fetchCollectionStartAsync();
  }

  render() {
    const { match } = this.props;
    return (
      <div className="shop-page">
        <Header />
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
      </div>
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
