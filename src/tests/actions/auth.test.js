import "@testing-library/jest-dom";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import {
	login,
	logout,
	startLoginEmailPassword,
	startLogout,
	startRegisterWithEmailAndPassword,
} from "../../actions/auth";
import { startLoading } from "../../actions/ui";
import { types } from "../../types/types";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {};
let store = mockStore(initState);

describe("Tests for auth action", () => {
	// test("Should start login with email and password", async () => {
	// 	const initialState = {};
	// 	const store = mockStore(initialState);
	// 	const userData = { email: "jonariv09@gmail.com", password: "12345" };
	// 	await store.dispatch(
	// 		startLoginEmailPassword(userData.email, userData.password)
	// 	);
	// 	const actions = store.getActions();
	// 	console.log(actions);
	// 	expect(actions[0]).toEqual({ type: types.uiStartLoading });
	// 	expect(actions[1]).toEqual({
	// 		type: types.login,
	// 		payload: {
	// 			uid,
	// 			displayName,
	// 		},
	// 	});

	// 	expect(typeof "").toBe("string");
	// });

	beforeEach(() => {
		store = mockStore();
	});

	test("Login and logout should create respective actions", () => {
		const uid = "14YzM5TL3W6Ogll7DgBs";
		const displayName = "User 01";

		const loginAction = login(uid, displayName);
		const logoutAction = logout();

		expect(loginAction).toEqual({
			type: types.login,
			payload: {
				uid,
				displayName,
			},
		});

		expect(logoutAction).toEqual({
			type: types.logout,
		});
	});

	test("Should launch startLogout", async () => {
		await store.dispatch(startLogout());

		const actions = store.getActions();

		expect(actions[0]).toEqual({
			type: types.logout,
		});

		expect(actions[1]).toEqual({
			type: types.notesLogoutCleaning,
		});
	});

	test("Should start startLoadingEmailPassword", async () => {
		const email = "testing@testing.com";
		const password = "123456";
		const uid = "AhriMycsK3Wgy9kTGw0YX7x2Vby1";

		await store.dispatch(startLoginEmailPassword(email, password));

		const actions = store.getActions();

		expect(actions[0]).toEqual({
			type: types.uiStartLoading,
		});

		expect(actions[1]).toEqual({
			type: types.login,
			payload: {
				uid,
				displayName: null,
			},
		});

		expect(actions[0]).toEqual({
			type: types.uiStartLoading,
		});
	});
});
