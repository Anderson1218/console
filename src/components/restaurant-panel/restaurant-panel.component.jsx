import React from "react";
import { Menu, Header, Popup, Dropdown } from "semantic-ui-react";
import { connect } from "react-redux";
import { selectRestaurants } from "../../redux/geoInfo/geoinfo.selectors";
import { createStructuredSelector } from "reselect";
import { sortRestaurantsByRating } from "../../redux/geoInfo/geoInfo.action";

const RestaurantPanel = ({ restaurants = [], sortRestaurantsByRating }) => {
  return (
    <Menu.Menu style={{ paddingBottom: "2em" }}>
      <Menu.Item>
        <Dropdown
          as={Header}
          text="Restaurant List"
          icon="sort"
          floating
          labeled
          button
          inverted
        >
          <Dropdown.Menu>
            <Dropdown.Item onClick={() => sortRestaurantsByRating(restaurants)}>
              sort by rating
            </Dropdown.Item>
            <Dropdown.Item>sort by distance</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Menu.Item>
      {restaurants.length > 0 &&
        restaurants.map(restaurant => (
          <Popup
            key={restaurant.id}
            trigger={<Menu.Item name={restaurant.name}></Menu.Item>}
            position="right center"
            basic
          >
            <Popup.Header>{restaurant.name}</Popup.Header>
            <Popup.Content>{`Rating: ${restaurant.rating}`}</Popup.Content>
            <Popup.Content>{`Address: ${restaurant.vicinity}`}</Popup.Content>
          </Popup>
        ))}
    </Menu.Menu>
  );
};

const mapStateToProps = createStructuredSelector({
  restaurants: selectRestaurants
});

const mapDispatchToProps = dispatch => ({
  sortRestaurantsByRating: restaurants =>
    dispatch(sortRestaurantsByRating(restaurants))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RestaurantPanel);
