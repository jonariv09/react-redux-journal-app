import configureStore from "redux-mock-store";
import "@testing-library/jest-dom";
import { mount } from "enzyme";
import React from "react";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { LoginScreen } from "../../../components/auth/LoginScreen";
import { MemoryRouter } from "react-router";
import {
	startGoogleLogin,
	startLoginEmailPassword,
} from "../../../actions/auth";

jest.mock("../../../actions/auth", () => ({
	startGoogleLogin: jest.fn(),
	startLoginEmailPassword: jest.fn(),
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {
	auth: {},
	ui: {
		loading: false,
		msgError: null,
	},
};
let store = mockStore(initState);
store.dispatch = jest.fn();

const wrapper = mount(
	<Provider store={store}>
		<MemoryRouter>
			<LoginScreen />
		</MemoryRouter>
	</Provider>
);

describe("Testing <LoginScreen />", () => {
	beforeEach(() => {
		store = mockStore(initState);
		jest.clearAllMocks();
	});

	test("Should create LoginScreen snapshot", () => {
		expect(wrapper).toMatchSnapshot();
	});

	test("should shoot startGoogleLogin action", () => {
		wrapper.find(".google-btn").prop("onClick")();
		expect(startGoogleLogin).toHaveBeenCalled();
	});

	test("should shoot startLogin with respectives arguments", () => {
		wrapper.find(".login-form").prop("onSubmit")({
			preventDefault() {},
		});

		expect(startLoginEmailPassword).toHaveBeenCalled();
	});
});
