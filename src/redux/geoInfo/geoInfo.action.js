import GeoInfoActionTypes from "./geoInfo.types";

export const setNearbyRestaurants = restaurants => ({
  type: GeoInfoActionTypes.SET_NEARBY_RESTAURANTS,
  payload: restaurants
});

export const sortRestaurantsByRating = restaurants => {
  const sortedRestaurants = [...restaurants].sort((a, b) => {
    return a.rating - b.rating;
  });

  return {
    type: GeoInfoActionTypes.SORT_RESTAURANTS_BY_RATING,
    payload: sortedRestaurants
  };
};

export const sortRestaurantsByDistance = restaurants => {
  const sortedRestaurants = [...restaurants].sort((a, b) => {
    return a.distance - b.distance;
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
