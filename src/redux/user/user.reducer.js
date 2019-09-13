import UserActionTypes from "./user.types";

const INITIAL_STATE = {
  currentUser: null,
  currentLocation: {
    latitude: null,
    longitude: null
  },
  isLoading: true,
  error: null,
  locationError: null
};

//every single reducer gets every single action got fire
const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UserActionTypes.SET_CURRENT_USER:
      return {
        ...state,
        isLoading: false,
        currentUser: action.payload
      };
    case UserActionTypes.GET_CURRENT_LOCATION_SUCCESS:
      return {
        ...state,
        currentLocation: action.payload
      };
    case UserActionTypes.GET_CURRENT_LOCATION_FAIL:
      return {
        ...state,
        locationError: action.payload
      };
    case UserActionTypes.SIGN_UP_START:
      return {
        ...state,
        isLoading: true
      };
    case UserActionTypes.EMAIL_SIGN_IN_START:
      return {
        ...state,
        isLoading: true
      };
    case UserActionTypes.GOOGLE_SIGN_IN_START:
      return {
        ...state,
        isLoading: true
      };
    case UserActionTypes.SIGN_OUT_START:
      return {
        ...state,
        isLoading: true
      };
    case UserActionTypes.SIGN_UP_SUCCESS:
      return {
        ...state,
        error: null
      };
    case UserActionTypes.SIGN_IN_SUCCESS:
      return {
        ...state,
        error: null
      };
    case UserActionTypes.SIGN_OUT_SUCCESS:
      return {
        ...state,
        error: null
      };
    case UserActionTypes.SIGN_IN_FAILURE:
    case UserActionTypes.SIGN_OUT_FAILURE:
    case UserActionTypes.SIGN_UP_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.payload
      };
    case UserActionTypes.CLEAR_ERROR_INFO:
      return {
        ...state,
        error: null
      };
    default:
      return state;
  }
};

export default userReducer;
