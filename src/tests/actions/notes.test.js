import "@testing-library/jest-dom";
import configureStore from "redux-mock-store";
import thunk from "redux-thunk";
import {
	startLoadingNotes,
	startNewNote,
	startSaveNote,
} from "../../actions/notes";
import { Database } from "../../firebase/firebase-config";
import { types } from "../../types/types";
import { doc, deleteDoc, getDoc } from "firebase/firestore";

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

const initState = {
	auth: {
		uid: "TESTING",
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
			title: "titulo",
			body: "body",
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
});
