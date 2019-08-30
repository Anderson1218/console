import UserActionTypes from "./user.types";
import { auth } from "../../firebase/firebase.utils";

export const setCurrentUser = user => ({
  type: UserActionTypes.SET_CURRENT_USER,
  payload: user
});

export const signOutStart = () => ({
  type: UserActionTypes.SIGN_OUT_START
});

export const signOutSuccess = () => ({
  type: UserActionTypes.SIGN_OUT_SUCCESS
});

export const signOutFailure = error => ({
  type: UserActionTypes.SIGN_OUT_FAILURE,
  payload: error
});

export const signOutStartAsync = () => {
  return dispatch => {
    dispatch(signOutStart());
    auth
      .signOut()
      .then(data => {
        dispatch(signOutSuccess());
        console.log(data);
      })
      .catch(error => {
        dispatch(signOutFailure(error));
        console.log(error);
      });
  };
};
