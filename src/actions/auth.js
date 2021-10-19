import Swal from "sweetalert2";
import { types } from "../types/types";
import { GoogleProvider, Auth } from "../firebase/firebase-config";
import {
	updateProfile,
	signInWithPopup,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
} from "@firebase/auth";
import { finishLoading, startLoading } from "./ui";
import { noteLogout } from "./notes";

export const startLoginEmailPassword = (email, password) => {
	return async (dispatch) => {
		console.log(email, password);

		try {
			dispatch(startLoading());

			const { user } = await signInWithEmailAndPassword(Auth, email, password);
			dispatch(login(user.uid, user.displayName));

			dispatch(finishLoading());
		} catch (err) {
			dispatch(finishLoading());
			Swal.fire("Error", err.message, "error");
		}
	};
};

export const startGoogleLogin = () => {
	return (dispatch) => {
		signInWithPopup(Auth, GoogleProvider).then(({ user }) =>
			dispatch(login(user.uid, user.displayName))
		);
	};
};

export const startRegisterWithEmailAndPassword = (email, password, name) => {
	return async (dispatch) => {
		try {
			const { user } = await createUserWithEmailAndPassword(
				Auth,
				email,
				password
			);

			await updateProfile(user, { displayName: name });
		} catch (e) {
			console.log(e);
		}
	};
};

export const login = (uid, displayName) => ({
	type: types.login,
	payload: {
		uid,
		displayName,
	},
});

export const startLogout = () => {
	return async (dispatch) => {
		await signOut(Auth);
		dispatch(logout());
		dispatch(noteLogout());
	};
};

export const logout = () => ({
	type: types.logout,
});
