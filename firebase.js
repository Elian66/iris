import { initializeApp, getApps } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyC13O-bECEzG4-550uJXbzs2AM1SXna2I4",
  authDomain: "irizame-acfc9.firebaseapp.com",
  databaseURL: "https://irizame-acfc9-default-rtdb.firebaseio.com",
  projectId: "irizame-acfc9",
  storageBucket: "irizame-acfc9.appspot.com",
  messagingSenderId: "272959972303",
  appId: "1:272959972303:web:94dd4278552ec1f3cea8ba"
};

let app;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApps()[0];
}

const db = getDatabase(app);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});
const storage = getStorage(app);

export { db, auth, storage, app, firebaseConfig };
