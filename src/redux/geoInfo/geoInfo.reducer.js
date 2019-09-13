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
    default:
      return state;
  }
};

export default geoInfoReducer;
