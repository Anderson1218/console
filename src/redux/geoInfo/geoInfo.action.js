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

//to be refactor
export const sortRestaurantsByRating = restaurants => {
  const sortedRestaurants = [...restaurants].sort((a, b) => {
    return a.rating - b.rating;
  });

  return {
    type: GeoInfoActionTypes.SORT_RESTAURANTS_BY_RATING,
    payload: sortedRestaurants
  };
};

//to be refactor
export const sortRestaurantsByDistance = restaurants => {
  const sortedRestaurants = [...restaurants].sort((a, b) => {
    return a.distanceDegree - b.distanceDegree;
  });

  return {
    type: GeoInfoActionTypes.SORT_RESTAURANTS_BY_DISTANCE,
    payload: sortedRestaurants
  };
};

export const setCenterOfMap = center => ({
  type: GeoInfoActionTypes.SET_CENTER_OF_MAP,
  payload: center
});

export const toggleRestaurantInfoWindow = restaurantId => ({
  type: GeoInfoActionTypes.TOGGLE_RESTAURANT_INFOWINDOW,
  payload: restaurantId
});
