import Swal from "sweetalert2";
import {
	collection,
	addDoc,
	doc,
	setDoc,
	updateDoc,
	deleteDoc,
} from "firebase/firestore";

import { Database } from "../firebase/firebase-config";
import { loadNotes } from "../helpers/loadNotes";
import { types } from "../types/types";
import { fileUpload } from "../helpers/fileUpload";

export const startNewNote = () => {
	return async (dispatch, getState) => {
		const { uid } = getState().auth;

		const newNote = {
			title: "",
			body: "",
			date: new Date().getTime(),
		};

		const docRef = await addDoc(
			collection(Database, `${uid}/journal/notes`),
			newNote
		);

		dispatch(activeNote(docRef.id, newNote));
		newNote.id = docRef.id;

		dispatch(startAddUpdateNote(newNote));
	};
};

export const startAddUpdateNote = (note) => ({
	type: types.noteAddUpdate,
	payload: { ...note },
});

export const startLoadingNotes = (uid) => {
	return async (dispatch) => {
		const notes = await loadNotes(uid);
		dispatch(setNotes(notes));
	};
};

export const activeNote = (id, note) => ({
	type: types.notesActive,
	payload: {
		id,
		...note,
	},
});

export const setNotes = (notes) => ({
	type: types.notesLoad,
	payload: notes,
});

export const startSaveNote = (note) => {
	return async (dispatch, getState) => {
		const { uid } = getState().auth;

		const noteToFirestore = { ...note };
		delete noteToFirestore.id;

		const noteDocRef = doc(Database, `${uid}/journal/notes/`, note.id);

		await updateDoc(noteDocRef, noteToFirestore);
		dispatch(refreshNote(note.id, note));
		dispatch(startAddUpdateNote(note));
		Swal.fire("Saved", note.title, "success");
	};
};

export const refreshNote = (id, note) => ({
	type: types.notesUpdated,
	payload: {
		id,
		note,
	},
});

export const startUploading = (file) => {
	return async (dispatch, getState) => {
		const { active: activeNote } = getState().notes;

		Swal.fire({
			title: "Uploading...",
			text: "Please wait...",
			allowOutsideClick: false,
			didOpen: () => {
				Swal.showLoading();
			},
		});

		const secureUrl = await fileUpload(file);
		activeNote.url = secureUrl;

		dispatch(startSaveNote(activeNote));

		Swal.close();
	};
};

export const startDeleting = (id) => {
	return async (dispatch, getState) => {
		const uid = getState().auth.uid;

		await deleteDoc(doc(Database, `${uid}/journal/notes/`, id));

		dispatch(deleteNote(id));
	};
};

export const deleteNote = (id) => ({
	type: types.notesDelete,
	payload: {
		id,
	},
});

export const noteLogout = () => ({
	type: types.notesLogoutCleaning,
});
