import { createSelector } from "reselect";

const selectGeoInfo = state => state.geoInfo;

export const selectRestaurants = createSelector(
  [selectGeoInfo],
  geoInfo => geoInfo.restaurants
);

export const selectCenterOfMap = createSelector(
  [selectGeoInfo],
  geoInfo => geoInfo.center
);
