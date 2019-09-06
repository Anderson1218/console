import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import CheckoutItem from "../../components/checkout-item/checkout-item.component";
import {
  selectCartItems,
  selectCartItemsCategoryCount
} from "../../redux/cart/cart.selectors";
import { Pagination } from "semantic-ui-react";
import "./checkout.styles.scss";

class CheckoutPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      numberOfItemsPerPage: 3
    };
  }

  getTruncatedCartItems = () => {
    const { cartItems } = this.props;
    const { currentPage, numberOfItemsPerPage } = this.state;
    return cartItems.slice(
      (currentPage - 1) * numberOfItemsPerPage,
      currentPage * numberOfItemsPerPage
    );
  };

  getTotalPages = () => {
    const { currentPage, numberOfItemsPerPage } = this.state;
    const totalPages = Math.ceil(
      this.props.cartItemCategoryCount / numberOfItemsPerPage
    );
    if (currentPage > totalPages) {
      this.setState({ currentPage: currentPage - 1 });
    }
    return totalPages;
  };

  render() {
    const { currentPage } = this.state;
    const truncatedCartItems = this.getTruncatedCartItems();
    const totalPages = this.getTotalPages();

    return (
      <div className="checkout-page">
        <div className="checkout-header">
          <div className="header-block">
            <span>Product</span>
          </div>
          <div className="header-block">
            <span>Product Name</span>
          </div>
          <div className="header-block">
            <span>Quantity</span>
          </div>
          <div className="header-block">
            <span>Price</span>
          </div>
          <div className="header-block">
            <span>Remove</span>
          </div>
        </div>
        {truncatedCartItems.map(cartItem => (
          <CheckoutItem key={cartItem.id} cartItem={cartItem} />
        ))}
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

const mapStateToProps = createStructuredSelector({
  cartItems: selectCartItems,
  cartItemCategoryCount: selectCartItemsCategoryCount
});

export default connect(mapStateToProps)(CheckoutPage);
