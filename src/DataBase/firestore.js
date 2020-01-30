import firebase from 'firebase'


var firebaseConfig = {
    apiKey: "AIzaSyDEg_0Ty8hygZ2y1tHVXeTcJxeVZvgcfa0",
    authDomain: "paycheck-1963c.firebaseapp.com",
    databaseURL: "https://paycheck-1963c.firebaseio.com",
    projectId: "paycheck-1963c",
    storageBucket: "paycheck-1963c.appspot.com",
    messagingSenderId: "926356124378",
    appId: "1:926356124378:web:e4f815b12bce219b1a6be3"
  };


const aplikacija = firebase.initializeApp(firebaseConfig);


export default aplikacija.firestore()
