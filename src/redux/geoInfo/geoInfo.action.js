import GeoInfoActionTypes from "./geoInfo.types";

export const setNearbyRestaurants = restaurants => {
  //Assuming that restaurants are sorted by distance in default
  restaurants.forEach((restaurant, index) => {
    restaurant.distanceDegree = index;
  });

  return {
    type: GeoInfoActionTypes.SET_NEARBY_RESTAURANTS,
    payload: restaurants
  };
};

export const sortRestaurantsByRating = () => {
  return {
    type: GeoInfoActionTypes.SORT_RESTAURANTS_BY_RATING
  };
};

export const sortRestaurantsByDistance = () => {
  return {
    type: GeoInfoActionTypes.SORT_RESTAURANTS_BY_DISTANCE
  };
};

export const setCenterOfMap = (latitude, longitude) => ({
  type: GeoInfoActionTypes.SET_CENTER_OF_MAP,
  payload: {
    latitude,
    longitude
  }
});

export const toggleRestaurantInfoWindow = restaurantId => ({
  type: GeoInfoActionTypes.TOGGLE_RESTAURANT_INFOWINDOW,
  payload: restaurantId
});
