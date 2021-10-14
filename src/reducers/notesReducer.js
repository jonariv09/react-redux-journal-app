import { types } from "../types/types";

const initialState = {
  notes: [],
  active: null
}

export const notesReducer = (state = initialState, action) => {

  switch (action.type) {
    case types.noteAddUpdate:

      console.log(action.payload.id);
      let indexNote = state.notes.findIndex(note => note.id === action.payload.id);

      state.notes.some(note => note.id === action.payload.id)
        ? state.notes[indexNote] = action.payload
        : state.notes.push(action.payload)

      return {
        ...state,
        notes: state.notes
      }
    case types.notesActive:
      return {
        ...state,
        active: {
          ...action.payload
        }
      }
    case types.notesLoad:
      return {
        ...state,
        notes: [...action.payload]
      }
    case types.notesUpdated:
      return {
        ...state,
        notes: state.notes.map(note =>
          note.id === action.payload.id
            ? action.payload.note
            : note
        )
      }
    case types.notesDelete:
      return {
        ...state,
        active: null,
        notes: state.notes.filter(note => note.id !== action.payload.id)
      }
    case types.notesLogoutCleaning:
      return {
        ...state,
        active: null,
        notes: null
      }
    default:
      return state;
  }
}