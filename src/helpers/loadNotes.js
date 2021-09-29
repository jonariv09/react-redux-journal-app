import { collection, getDocs } from "firebase/firestore";
import { Database } from "../firebase/firebase-config";
import { types } from "../types/types";

export const loadNotes = async (uid) => {

  const notesSnap = await getDocs(collection(Database, `${uid}/journal/notes`));
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
