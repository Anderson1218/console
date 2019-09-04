import UserActionTypes from "./user.types";
import {
  auth,
  signInWithGoogle,
  createUserProfileDocument
} from "../../firebase/firebase.utils";
import md5 from "md5";

export const setCurrentUser = user => ({
  type: UserActionTypes.SET_CURRENT_USER,
  payload: user
});

export const signUpStart = () => ({
  type: UserActionTypes.SIGN_UP_START
});

export const signUpSuccess = () => ({
  type: UserActionTypes.SIGN_UP_SUCCESS
});

export const signUpFailure = error => ({
  type: UserActionTypes.SIGN_UP_FAILURE,
  payload: error
});

export const emailSignInStart = () => ({
  type: UserActionTypes.EMAIL_SIGN_IN_START
});

export const googleSignInStart = () => ({
  type: UserActionTypes.GOOGLE_SIGN_IN_START
});

export const signInSuccess = () => ({
  type: UserActionTypes.SIGN_IN_SUCCESS
});

export const signInFailure = error => ({
  type: UserActionTypes.SIGN_IN_FAILURE,
  payload: error
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

export const signUpStartAsync = (email, password, displayName) => {
  return async dispatch => {
    dispatch(signUpStart());
    try {
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password
      );
      dispatch(signUpSuccess());
      await user.updateProfile({
        displayName: displayName,
        photoURL: `http://gravatar.com/avatar/${md5(user.email)}?d=identicon`
      });
      await createUserProfileDocument(user, { displayName });
    } catch (error) {
      dispatch(signUpFailure(error));
    }
  };
};

export const googleSignInStartAsync = () => {
  return dispatch => {
    dispatch(googleSignInStart());
    signInWithGoogle()
      .then(user => {
        dispatch(signInSuccess());
      })
      .catch(error => {
        dispatch(signInFailure(error));
      });
  };
};

export const emailSignInStartAsync = (email, password) => {
  return dispatch => {
    dispatch(emailSignInStart());
    auth
      .signInWithEmailAndPassword(email, password)
      .then(user => {
        dispatch(signInSuccess());
      })
      .catch(error => {
        dispatch(signInFailure(error));
      });
  };
};

export const signOutStartAsync = () => {
  return dispatch => {
    dispatch(signOutStart());
    auth
      .signOut()
      .then(() => {
        dispatch(signOutSuccess());
      })
      .catch(error => {
        dispatch(signOutFailure(error));
      });
  };
};
