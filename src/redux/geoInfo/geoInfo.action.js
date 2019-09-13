import GeoInfoActionTypes from "./geoInfo.types";

export const setNearbyRestaurants = restaurants => ({
  type: GeoInfoActionTypes.SET_NEARBY_RESTAURANTS,
  payload: restaurants
});

export const setCenterOfMap = center => ({
  type: GeoInfoActionTypes.SET_CENTER_OF_MAP,
  payload: center
});
