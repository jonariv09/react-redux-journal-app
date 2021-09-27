import { initializeApp } from 'firebase/app';
import { getFirestore, doc } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAVxopsrALkUXffsH9pQqIvtdbHRpGTrRk",
  authDomain: "react-app-cursos-6d38d.firebaseapp.com",
  projectId: "react-app-cursos-6d38d",
  storageBucket: "react-app-cursos-6d38d.appspot.com",
  messagingSenderId: "947801179773",
  appId: "1:947801179773:web:d33dceee5825324c105314"
};


const Firebase = initializeApp(firebaseConfig);

export default Firebase;

export const Database = getFirestore(Firebase);
export const Auth = getAuth(Firebase);
Auth.languageCode = 'it';
export const GoogleProvider = new GoogleAuthProvider()
export const SignInWithPopup = signInWithPopup;
export const Doc = doc;