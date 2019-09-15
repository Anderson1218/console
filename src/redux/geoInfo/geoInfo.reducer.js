import GeoInfoActionTypes from "./geoInfo.types";

const INITIAL_STATE = {
  center: {
    latitude: null,
    longitude: null
  },
  restaurants: [],
  infoWindow: {
    restaurantId: null,
    isOpen: false
  }
};

const geoInfoReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GeoInfoActionTypes.SET_NEARBY_RESTAURANTS:
      return {
        ...state,
        restaurants: action.payload,
        infoWindow: {
          restaurantId: null,
          isOpen: false
        }
      };
    case GeoInfoActionTypes.SET_CENTER_OF_MAP:
      return {
        ...state,
        center: action.payload
      };
    case GeoInfoActionTypes.SORT_RESTAURANTS_BY_RATING:
      const restaurantsSortedByRating = state.restaurants
        .slice()
        .sort((a, b) => {
          return a.rating - b.rating;
        });
      return {
        ...state,
        restaurants: restaurantsSortedByRating
      };
    case GeoInfoActionTypes.SORT_RESTAURANTS_BY_DISTANCE:
      const restaurantsSortedByDistance = state.restaurants
        .slice()
        .sort((a, b) => {
          return a.distanceDegree - b.distanceDegree;
        });
      return {
        ...state,
        restaurants: restaurantsSortedByDistance
      };
    case GeoInfoActionTypes.TOGGLE_RESTAURANT_INFOWINDOW:
      if (state.infoWindow.restaurantId === action.payload) {
        return {
          ...state,
          infoWindow: {
            ...state.infoWindow,
            isOpen: !state.infoWindow.isOpen
          }
        };
      }
      return {
        ...state,
        infoWindow: {
          restaurantId: action.payload,
          isOpen: true
        }
      };
    default:
      return state;
  }
};

export default geoInfoReducer;
