import GeoInfoActionTypes from "./geoInfo.types";

const INITIAL_STATE = {
  center: {
    latitude: null,
    longitude: null
  },
  restaurants: []
};

const geoInfoReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GeoInfoActionTypes.SET_NEARBY_RESTAURANTS:
      return {
        ...state,
        restaurants: action.payload
      };
    case GeoInfoActionTypes.SET_CENTER_OF_MAP:
      return {
        ...state,
        center: action.payload
      };
    case GeoInfoActionTypes.SORT_RESTAURANTS_BY_RATING:
      return {
        ...state,
        restaurants: action.payload
      };
    case GeoInfoActionTypes.SORT_RESTAURANTS_BY_DISTANCE:
      return {
        ...state,
        restaurants: action.payload
      };
    default:
      return state;
  }
};

export default geoInfoReducer;
