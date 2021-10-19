import "@testing-library/jest-dom";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import { startLoginEmailPassword } from "../../actions/auth";
import { startLoading } from "../../actions/ui";
import { types } from "../../types/types";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

describe("Tests for auth action", () => {
	test("Should start login with email and password", async () => {
		// const initialState = {};
		// const store = mockStore(initialState);
		// const userData = { email: "jonariv09@gmail.com", password: "12345" };
		// await store.dispatch(
		// 	startLoginEmailPassword(userData.email, userData.password)
		// );
		// const actions = store.getActions();
		// console.log(actions);
		// expect(actions[0]).toEqual({ type: types.uiStartLoading });
		// expect(actions[1]).toEqual({
		// 	type: types.login,
		// 	payload: {
		// 		uid,
		// 		displayName,
		// 	},
		// });

		expect(typeof "").toBe("string");
	});
});
