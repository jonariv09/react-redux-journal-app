import { initializeApp } from 'firebase/app';
import { getFirestore, doc } from 'firebase/firestore';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAVxopsrALkUXffsH9pQqIvtdbHRpGTrRk",
  authDomain: "react-app-cursos-6d38d.firebaseapp.com",
  projectId: "react-app-cursos-6d38d",
  storageBucket: "react-app-cursos-6d38d.appspot.com",
  messagingSenderId: "947801179773",
  appId: "1:947801179773:web:d33dceee5825324c105314"
};


const Firebase = initializeApp(firebaseConfig);

const Database = getFirestore(Firebase);
const Auth = getAuth(Firebase);
Auth.languageCode = 'it';
const GoogleProvider = new GoogleAuthProvider()
const Doc = doc;
export {
  Firebase,
  Database,
  Auth,
  GoogleProvider,
}