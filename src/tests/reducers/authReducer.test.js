import "@testing-library/jest-dom";
import { authReducer } from "../../reducers/authReducer";
import { types } from "../../types/types";
import { mockAuthReducer } from "./mockAuthReducer";

describe("Testing reducers", () => {
	test("Should return user logged in", () => {
		const loginAction = {
			type: types.login,
			payload: {
				uid: "123577",
				displayName: "Agustin Narvaez",
			},
		};

		expect(authReducer({}, loginAction)).toEqual(mockAuthReducer.login);
	});

	test("Should return empty object from logout action", () => {
		const logoutAction = {
			type: types.logout,
		};

		expect(authReducer({}, logoutAction)).toEqual(mockAuthReducer.logout);
	});

	test("Should return default state", () => {
		const logoutAction = {
			type: "[auth] any action",
		};

		expect(authReducer({}, logoutAction)).toEqual({});
	});
});
