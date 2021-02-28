import Firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// import { seedDatabase } from '../seed';

const config = {
  apiKey: 'AIzaSyCo6KwBO3KAXqlrejNevGHB1gr2_E3FjjY',
  authDomain: 'instagram-clone-ac554.firebaseapp.com',
  projectId: 'instagram-clone-ac554',
  storageBucket: 'instagram-clone-ac554.appspot.com',
  messagingSenderId: '171783249964',
  appId: '1:171783249964:web:6bbb8e15d1627826563189'
};

const firebase = Firebase.initializeApp(config);

const { FieldValue } = Firebase.firestore;

// seedDatabase(firebase);

export { firebase, FieldValue };
