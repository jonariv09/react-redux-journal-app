import "@testing-library/jest-dom";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import {
	startLoadingNotes,
	startNewNote,
	startSaveNote,
	startUploading,
} from "../../actions/notes";
import { Database } from "../../firebase/firebase-config";
import { types } from "../../types/types";
import { doc, deleteDoc, getDoc } from "firebase/firestore";
import { fileUpload } from "../../helpers/fileUpload";

jest.mock("../../helpers/fileUpload", () => ({
	fileUpload: jest.fn(() => {
		return "https://hola-mundo/cosa.jpg";
	}),
}));

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {
	auth: {
		uid: "TESTING",
	},
	notes: {
		active: {
			id: "14YzM5TL3W6Ogll7DgBs",
			title: "Hola",
			body: "Mundo",
		},
	},
};

let store = mockStore(initState);

describe("Testing notes actions", () => {
	beforeEach(() => {
		store = mockStore(initState);
	});

	test("Should create a new note startNewNote", async () => {
		await store.dispatch(startNewNote());

		const actions = store.getActions();

		expect(actions[0]).toEqual({
			type: types.notesActive,
			payload: {
				id: expect.any(String),
				title: "",
				body: "",
				date: expect.any(Number),
			},
		});

		expect(actions[1]).toEqual({
			type: types.noteAddUpdate,
			payload: {
				id: expect.any(String),
				title: "",
				body: "",
				date: expect.any(Number),
			},
		});

		const {
			payload: { id: docId },
		} = actions[0];
		const { uid } = initState.auth;

		await deleteDoc(doc(Database, `${uid}/journal/notes/`, docId));
	});

	test("Should start loading notes ", async () => {
		await store.dispatch(startLoadingNotes(initState.auth.uid));

		const actions = store.getActions();

		expect(actions[0]).toEqual({
			type: types.notesLoad,
			payload: expect.any(Array),
		});

		const expected = {
			id: expect.any(String),
			title: expect.any(String),
			body: expect.any(String),
			date: expect.any(Number),
		};

		expect(actions[0].payload[0]).toMatchObject(expected);
	});

	test("startSaveNote should save a note", async () => {
		const note = {
			id: "14YzM5TL3W6Ogll7DgBs",
			title: "Hola",
			body: "mundo",
		};

		await store.dispatch(startSaveNote(note));

		const actions = store.getActions();

		const docRef = doc(
			Database,
			`${initState.auth.uid}/journal/notes/`,
			note.id
		);
		const docSnap = await getDoc(docRef);

		expect(docSnap.data().title).toBe(note.title);
	});

	test("startUploading debe de actualizar el url del entry", async () => {
		const file = new File([], "foto.jpg");
		await store.dispatch(startUploading(file));

		const actions = store.getActions();

		const docRef = doc(
			Database,
			`${initState.auth.uid}/journal/notes/`,
			initState.notes.active.id
		);
		const docSnap = await getDoc(docRef);
		const note = docSnap.data();

		expect(note.url).toBe("https://hola-mundo/cosa.jpg");
	});
});
