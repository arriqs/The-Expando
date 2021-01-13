import firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyANNLaA0MOJ0HypQpeCugJ3CGb-sASarqw",
  authDomain: "auction-js.firebaseapp.com",
  databaseURL: "YOUR DATABASE URL",
  projectId: "auction-js",
  storageBucket: "auction-js.appspot.com",
  messagingSenderId: "171107111620",
  appId: "1:171107111620:web:64a08dec77dabfd196ef91"
};
try {
  firebase.initializeApp(firebaseConfig);
} catch(err){
  if (!/already exists/.test(err.message)) {
    console.error('Firebase initialization error', err.stack)}
}
const fire = firebase;
export default fire;