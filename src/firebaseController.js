import firebase from "firebase/app";
import "firebase/firestore";

const config = {
  apiKey: "AIzaSyDhlOiJG6Zx1bcqUP2EkKJ2MLFv1vLgd4k",
  authDomain: "pinamar-pide.firebaseapp.com",
  databaseURL: "https://pinamar-pide.firebaseio.com",
  projectId: "pinamar-pide",
  storageBucket: "pinamar-pide.appspot.com",
  messagingSenderId: "268459213561",
  appId: "1:268459213561:web:80b1dc8d0b7e8032cb9828",
};

const app = firebase.initializeApp(config);

export const getPlaces = (type) => {
  return app
    .firestore()
    .collection(type)
    .get()
    .then((db_get) => {
      let db_data = [];
      db_get.forEach((doc) => db_data.push({ ...doc.data(), id: doc.id }));
      return db_data;
    })
    .catch((e) => {
      console.log(e);
      throw new Error("Ocurrió un error. Vuelva a intentarlo más tarde.");
    });
};

export async function getPlace(id) {
  const session_storage = JSON.parse(window.sessionStorage.getItem(id));
  if (session_storage) return session_storage;
  
  const db = firebase.firestore();
  const db_get = await db.collection("places").doc(id).get();
  if (db_get.exists) {
    window.sessionStorage.setItem(id, JSON.stringify(db_get.data()));
    const place = db_get.data();
    return place;
  }
  return null;
}

export default app;
