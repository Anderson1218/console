import React from "react";
import "./collection-preview.styles.scss";
import CollectionItem from "../collection-item/collection-item.component";
import { withRouter } from "react-router-dom";
import { Header } from "semantic-ui-react";

const CollectionPreview = ({ title, items, history, match, routeName }) => (
  <div className="collection-preview">
    <Header
      as="h1"
      color="teal"
      onClick={() => history.push(`${match.path}/${routeName}`)}
    >
      {title} (click here to see more!)
    </Header>
    <div className="preview">
      {items
        .filter((item, index) => index < 4)
        .map(item => (
          <CollectionItem key={item.id} item={item} />
        ))}
    </div>
  </div>
);

export default withRouter(CollectionPreview);
