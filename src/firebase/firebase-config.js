import { initializeApp } from "firebase/app";
import { getFirestore, doc } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
	apiKey: process.env.REACT_APP_API_KEY,
	authDomain: process.env.REACT_APP_AUTH_DOMAIN,
	projectId: process.env.REACT_APP_PROJECT_ID,
	storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
	messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
	appId: process.env.REACT_APP_API_ID,
};

const Firebase = initializeApp(firebaseConfig);

const Database = getFirestore(Firebase);
const Auth = getAuth(Firebase);
Auth.languageCode = "it";
const GoogleProvider = new GoogleAuthProvider();
export { Firebase, Database, Auth, GoogleProvider };
