import Swal from 'sweetalert2';
import { collection, addDoc, doc, setDoc, updateDoc } from "firebase/firestore";
import { Database } from "../firebase/firebase-config";
import { loadNotes } from "../helpers/loadNotes";
import { types } from "../types/types";


export const startNewNote = () => {
  return async (dispatch, getState) => {
    
    const { uid } = getState().auth;

    const newNote = {
      title: '',
      body: '',
      date: new Date().getTime()
    }

    const docRef = await addDoc(collection(Database, `${uid}/journal/notes`), newNote);
    
    dispatch(activeNote(docRef.id, newNote));
  }
}

export const startLoadingNotes = (uid) => {
  return async (dispatch) => {
    const notes = await loadNotes(uid);
    dispatch(setNotes(notes));
  }
}

export const activeNote = (id, note) => ({
  type: types.notesActive,
  payload: {
    id,
    ...note
  } 
})

export const setNotes = (notes) => ({
  type: types.notesLoad,
  payload: notes
})

export const startSaveNote = (note) => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;

    const noteToFirestore = { ...note };
    delete noteToFirestore.id;

    const noteDocRef = doc(Database, `${uid}/journal/notes/`, note.id);

    await updateDoc(noteDocRef, note);
    dispatch(refreshNote(note.id, note));
    Swal.fire('Saved', note.title, 'success');
  }
}

export const refreshNote = (id, note) => ({
  type: types.notesUpdated,
  payload: {
    id, note
  }
})