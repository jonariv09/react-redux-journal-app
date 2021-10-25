import React from "react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router";
import { mount } from "enzyme";
import thunk from "redux-thunk";
import configureStore from "redux-mock-store";
import { login } from "../../actions/auth";
import { AppRouter } from "../../routers/AppRouter";
import { Auth } from "../../firebase/firebase-config";
import { signInWithEmailAndPassword } from "@firebase/auth";
import { act } from "react-dom/test-utils";
import { Swal } from "sweetalert2";

jest.mock("sweetalert2", () => ({
	fire: jest.fn(),
}));

jest.mock("../../actions/auth", () => ({
	login: jest.fn(),
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {
	auth: {},
	ui: {
		loading: false,
		msgError: null,
	},
	notes: {
		active: {
			id: "yE0ezxfbc9ptnASFzjE7",
			title: "",
			body: "",
			date: 1635117679817,
		},
		notes: [
			{
				id: "U2zUjFemMb8lS01wnekA",
				date: 1634180243775,
				url: "https://res.cloudinary.com/jonariv09/image/upload/v1634180260/aabrgftpg5zouc6pnkdb.png",
				body: "Something amazing",
				title: "Awesme note",
			},
			{
				title: "",
				body: "",
				date: 1635117679817,
				id: "yE0ezxfbc9ptnASFzjE7",
			},
		],
	},
};

let store = mockStore(initState);
store.dispatch = jest.fn();

describe("Testing <AppRouter/>", () => {
	test("Should call login if it's authenticated", async () => {
		let user;

		await act(async () => {
			const userCred = await signInWithEmailAndPassword(
				Auth,
				"testing@testing.com",
				"123456"
			);

			user = userCred.user;

			const wrapper = mount(
				<Provider store={store}>
					<MemoryRouter>
						<AppRouter />
					</MemoryRouter>
				</Provider>
			);
		});

		expect(login).toHaveBeenCalledWith("AhriMycsK3Wgy9kTGw0YX7x2Vby1", null);
	});
});
