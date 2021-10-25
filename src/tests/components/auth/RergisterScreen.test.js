import React from "react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router";
import { mount } from "enzyme";
import thunk from "redux-thunk";
import configureStore from "redux-mock-store";
import { RegisterScreen } from "../../../components/auth/RegisterScreen";
import { types } from "../../../types/types";

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
// store.dispatch = jest.fn();

const wrapper = mount(
	<Provider store={store}>
		<MemoryRouter>
			<RegisterScreen />
		</MemoryRouter>
	</Provider>
);

describe("Testing <RegisterScreen />", () => {
	test("should show correctly the component", () => {
		expect(wrapper).toMatchSnapshot();
	});

	test("Should dispatch the respective action", () => {
		const emailField = wrapper.find('input[name="email"]');

		emailField.simulate("change", {
			target: {
				value: "",
				name: "email",
			},
		});

		wrapper.find("form").simulate("submit", {
			preventDefault() {},
		});

		const actions = store.getActions();

		expect(actions[0]).toEqual({
			type: types.uiSetError,
			payload: "Email is not valid",
		});
	});

	test("Debe de mostrar la caja de alerta con el error", () => {
		const initState = {
			auth: {},
			ui: {
				loading: false,
				msgError: "Email no es correcto",
			},
		};

		let store = mockStore(initState);

		const wrapper = mount(
			<Provider store={store}>
				<MemoryRouter>
					<RegisterScreen />
				</MemoryRouter>
			</Provider>
		);

		expect(wrapper.find(".auth__alert-error").exists()).toBe(true);
		expect(wrapper.find(".auth__alert-error").text().trim()).toBe(
			initState.ui.msgError
		);
	});
});
