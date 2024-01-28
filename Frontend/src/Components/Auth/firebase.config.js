import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail, onAuthStateChanged, setPersistence, browserSessionPersistence } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyDsa6PYir1t44HP1Wt3FfKoKMSWxff-JRo",
    authDomain: "task-management-9ecac.firebaseapp.com",
    databaseURL: "https://task-management-9ecac-default-rtdb.firebaseio.com",
    projectId: "task-management-9ecac",
    storageBucket: "task-management-9ecac.appspot.com",
    messagingSenderId: "768602840573",
    appId: "1:768602840573:web:655f9fa2d34a9146b40d94",
    measurementId: "G-9D96PC6PL2"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth, createUserWithEmailAndPassword , signInWithEmailAndPassword , sendPasswordResetEmail , onAuthStateChanged, setPersistence, browserSessionPersistence};
