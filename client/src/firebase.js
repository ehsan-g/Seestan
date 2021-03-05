import firebase from 'firebase/app';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyBwrcTjDht0q5YU5PHgA-ZnneYgns20s9Y',
  authDomain: 'e-commerce-19e8f.firebaseapp.com',
  projectId: 'e-commerce-19e8f',
  storageBucket: 'e-commerce-19e8f.appspot.com',
  messagingSenderId: '232565550722',
  appId: '1:232565550722:web:745be823eb068cc2588e9b',
};

//  Initilize firebase
firebase.initializeApp(firebaseConfig);

//  export
export const { auth } = firebase;
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
