import React from "react";
import { connect } from "react-redux";
import { addItem } from "../../redux/cart/cart.actions";
import "./collection-item.styles.scss";
// import CustomButton from "../custom-button/custom-button.component";
import { Card, Image, Button } from "semantic-ui-react";

const CollectionItem = ({ item, addItem }) => {
  const { name, price, imageUrl } = item;
  // return (
  //   <div className="collection-item">
  //     <div
  //       className="image"
  //       style={{
  //         backgroundImage: `url(${imageUrl})`
  //       }}
  //     />
  //     <div className="collection-footer">
  //       <span className="name">{name}</span>
  //       <span className="price">{price}</span>
  //     </div>
  //     <CustomButton onClick={() => addItem(item)} inverted>
  //       Add to Cart
  //     </CustomButton>
  //   </div>
  // );
  return (
    <Card
      style={{
        backgroundColor: "rgba(0, 0, 0, 0.3)",
        boxShadow: "none",
        height: "95%",
        margin: "5px"
      }}
    >
      <Image src={imageUrl} wrapped ui={false} />
      <Card.Content>
        <Card.Header>{name}</Card.Header>
        <Card.Description>
          <span>{`$ ${price}`}</span>
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button icon="plus" color="facebook" onClick={() => addItem(item)} />
      </Card.Content>
    </Card>
  );
};

const mapDispatchToProps = dispatch => ({
  addItem: item => dispatch(addItem(item))
});

export default connect(
  null,
  mapDispatchToProps
)(CollectionItem);
