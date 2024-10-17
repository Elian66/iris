import { initializeApp, getApps } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";
import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyDDZ_Cy_kh29l-2kPXQOd2z1VumQj5sKjw",
  authDomain: "irizame-83890.firebaseapp.com",
  databaseURL: "https://irizame-83890-default-rtdb.firebaseio.com",
  projectId: "irizame-83890",
  storageBucket: "irizame-83890.appspot.com",
  messagingSenderId: "653377111210",
  appId: "1:653377111210:web:35534c9fd2fc5104a93cd3",
  measurementId: "G-1PJ7WMD7YC"
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
