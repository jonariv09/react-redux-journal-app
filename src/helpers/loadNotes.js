import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { Database } from "../firebase/firebase-config";
import { types } from "../types/types";

export const loadNotes = async (uid) => {

  const notesRef = collection(Database, `${uid}/journal/notes`)

  const queryNotes = query(notesRef, orderBy("date"));

  const notesSnap = await getDocs(queryNotes);
  const notes = [];

  notesSnap.forEach((doc) => {
    const note = doc.data();
    notes.push({
      id: doc.id,
      ...note
    });
  });

  return notes;
}
