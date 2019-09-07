import React from "react";
import { connect } from "react-redux";
import "./collection.styles.scss";
import CollectionItem from "../../components/collection-item/collection-item.component";
import { selectCollection } from "../../redux/shop/shop.selectors";
import { Pagination } from "semantic-ui-react";

class CollectionPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      numberOfItemsPerPage: 8
    };
  }

  getTruncatedCollectionItems = () => {
    const { items } = this.props.collection;
    const { currentPage, numberOfItemsPerPage } = this.state;
    return items.slice(
      (currentPage - 1) * numberOfItemsPerPage,
      currentPage * numberOfItemsPerPage
    );
  };

  getTotalPages = () => {
    const { items } = this.props.collection;
    const { currentPage, numberOfItemsPerPage } = this.state;
    const totalPages = Math.ceil(
      Object.keys(items).length / numberOfItemsPerPage
    );
    if (currentPage > totalPages) {
      this.setState({ currentPage: currentPage - 1 });
    }
    return totalPages;
  };

  render() {
    if (!this.props.collection) {
      return <h1>Product does not exist</h1>;
    }
    const { title } = this.props.collection;
    const { currentPage } = this.state;
    const truncatedCollectionItems = this.getTruncatedCollectionItems();
    const totalPages = this.getTotalPages();

    return (
      <div className="collection-page">
        <h2 className="title">{title}</h2>
        <div className="items">
          {truncatedCollectionItems.map(item => (
            <CollectionItem key={item.id} item={item} />
          ))}
        </div>
        <Pagination
          onPageChange={(e, data) =>
            this.setState({ currentPage: data.activePage })
          }
          size="huge"
          inverted
          activePage={currentPage}
          totalPages={totalPages}
          style={{ marginTop: "20px" }}
        />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  collection: selectCollection(ownProps.match.params.collectionId)(state)
});

export default connect(mapStateToProps)(CollectionPage);
