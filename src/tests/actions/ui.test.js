import "@testing-library/jest-dom";
import {
	finishLoading,
	removeError,
	setError,
	startLoading,
} from "../../actions/ui";
import { types } from "../../types/types";
import configureStore from "redux-mock-store";

const middlewares = [];
const mockStore = configureStore(middlewares);

describe("Pruebas en ui-actions", () => {
	test("Todas las acciones deben funcionar", () => {
		const action = setError("HELP!");
		const removeErrorAction = removeError();
		const startLoadingAction = startLoading();
		const finishLoadingAction = finishLoading();

		expect(action).toEqual({
			type: types.uiSetError,
			payload: "HELP!",
		});

		expect(removeErrorAction).toEqual({
			type: types.uiRemoveError,
		});

		expect(startLoadingAction).toEqual({
			type: types.uiStartLoading,
		});

		expect(finishLoadingAction).toEqual({
			type: types.uiFinishLoading,
		});
	});
});
