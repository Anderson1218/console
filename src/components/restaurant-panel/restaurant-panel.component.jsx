import React from "react";
import { Menu, Header } from "semantic-ui-react";
import { connect } from "react-redux";
import { selectRestaurants } from "../../redux/geoInfo/geoinfo.selectors";
import { createStructuredSelector } from "reselect";

const RestaurantPanel = ({ restaurants = [] }) => {
  return (
    <Menu.Menu style={{ paddingBottom: "2em" }}>
      <Menu.Item>
        <Header color="red">Restaurant List</Header>
      </Menu.Item>
      {restaurants.length > 0 &&
        restaurants.map(restaurant => (
          <Menu.Item
            key={restaurant.id}
            name={restaurant.name}
            style={{ opacity: 0.7 }}
          >
            {restaurant.name}
          </Menu.Item>
        ))}
    </Menu.Menu>
  );
};

const mapStateToProps = createStructuredSelector({
  restaurants: selectRestaurants
});

export default connect(mapStateToProps)(RestaurantPanel);
