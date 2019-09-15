import React from "react";
import { Menu, Header, Popup, Dropdown } from "semantic-ui-react";
import { connect } from "react-redux";
import {
  selectRestaurants,
  selectInfoWindow
} from "../../redux/geoInfo/geoinfo.selectors";
import { createStructuredSelector } from "reselect";
import {
  sortRestaurantsByRating,
  sortRestaurantsByDistance,
  setCenterOfMap,
  toggleRestaurantInfoWindow
} from "../../redux/geoInfo/geoInfo.action";

const RestaurantPanel = ({
  restaurants = [],
  sortRestaurantsByRating,
  sortRestaurantsByDistance,
  setCenterOfMap,
  toggleRestaurantInfoWindow,
  infoWindow
}) => {
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
            <Dropdown.Item
              onClick={() => sortRestaurantsByDistance(restaurants)}
            >
              sort by distance
            </Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Menu.Item>
      {restaurants.length > 0 &&
        restaurants.map((restaurant, index) => (
          <Popup
            key={restaurant.id}
            trigger={
              <Menu.Item
                onClick={() => {
                  setCenterOfMap({
                    latitude: restaurant.geometry.location.lat(),
                    longitude: restaurant.geometry.location.lng()
                  });
                  toggleRestaurantInfoWindow(restaurant.id);
                }}
                active={
                  infoWindow.restaurantId === restaurant.id && infoWindow.isOpen
                }
              >{`${index + 1}. ${restaurant.name}`}</Menu.Item>
            }
            position="right center"
            basic
          >
            <Popup.Header>超好吃!!</Popup.Header>
          </Popup>
        ))}
    </Menu.Menu>
  );
};

const mapStateToProps = createStructuredSelector({
  restaurants: selectRestaurants,
  infoWindow: selectInfoWindow
});

const mapDispatchToProps = dispatch => ({
  sortRestaurantsByRating: restaurants =>
    dispatch(sortRestaurantsByRating(restaurants)),
  sortRestaurantsByDistance: restaurants =>
    dispatch(sortRestaurantsByDistance(restaurants)),
  setCenterOfMap: center => dispatch(setCenterOfMap(center)),
  toggleRestaurantInfoWindow: restaurantId =>
    dispatch(toggleRestaurantInfoWindow(restaurantId))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RestaurantPanel);
