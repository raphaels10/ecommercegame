import firebase from 'firebase/app'
import 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyC2Z4MM3og6HFXp5foCfnbAe8s1FTMFQ7w",
    authDomain: "react-teste-upload-image.firebaseapp.com",
    databaseURL: "https://react-teste-upload-image.firebaseio.com",
    projectId: "react-teste-upload-image",
    storageBucket: "react-teste-upload-image.appspot.com",
    messagingSenderId: "171165695314",
    appId: "1:171165695314:web:5867f81d7405d14a694e8b"
  }

firebase.initializeApp(firebaseConfig)

const storage = firebase.storage()

export {storage, firebase as default}