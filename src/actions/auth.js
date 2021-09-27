import { types } from "../types/types";
import { SignInWithPopup, GoogleProvider, Auth } from '../firebase/firebase-config';

export const startLoginEmailPassword = (email, password) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(login(1234, 'Pedro'))
    }, 3500);
  }
}

export const startGoogleLogin = () => {
  return (dispatch) => {

    SignInWithPopup(Auth, GoogleProvider)
      .then(({ user }) => dispatch(
        login(user.uid, user.displayName)
      ));

  }
}

export const login = (uid, displayName) => ({
  type: types.login,
  payload: {
    uid,
    displayName
  }
})