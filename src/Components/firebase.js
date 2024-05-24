// src/firebase.js

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Tu configuración de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyAXADgEsfvCrdyS1evuPNRxHAARi8D2CtA",
    authDomain: "purificacion-agua.firebaseapp.com",
    projectId: "purificacion-agua",
    storageBucket: "purificacion-agua.appspot.com",
    messagingSenderId: "363392497240",
    appId: "1:363392497240:web:8d5eab5cbdd37846be3c2d"
  };

// Inicializa Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
