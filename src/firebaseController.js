import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/storage";
import "firebase/auth";
import "firebase/analytics";

const config = {
  apiKey: "AIzaSyDhlOiJG6Zx1bcqUP2EkKJ2MLFv1vLgd4k",
  authDomain: "pinamar-pide.firebaseapp.com",
  databaseURL: "https://pinamar-pide.firebaseio.com",
  projectId: "pinamar-pide",
  storageBucket: "pinamar-pide.appspot.com",
  messagingSenderId: "268459213561",
  appId: "1:268459213561:web:80b1dc8d0b7e8032cb9828",
  measurementId: "G-RR651SJWT4",
};

const app = firebase.initializeApp(config);
const analytics = firebase.analytics();

const refPlaces = app.firestore().collection("places");

export const getAccount = async () => {
  const uid = app.auth().currentUser.uid;
  if (!uid) return null;
  return refPlaces
    .doc(uid)
    .get()
    .then((doc) => {
      if (doc.exists) {
        return {
          ...doc.data(),
          uid: doc.id,
        };
      }
      return null;
    })
    .catch((e) => {
      console.log(e);
      return null;
    });
};

const uploadImg = async (url, img) => {
  const storage = app.storage().ref().child(url);
  return await storage
    .put(img)
    .then(() => {
      return true;
    })
    .catch(function (error) {
      console.log(error);
      throw new Error("upload-img-error");
    });
};

export const editProfile = async ({
  name = "",
  address = "",
  phone = 0,
  instagram = "",
  facebook = "",
  whatsapp = "",
  desc,
  category = null,
  img = null,
  hayWorkHours,
  workHours,
}) => {
  const uid = app.auth().currentUser.uid;
  analytics.logEvent("Edit_Profile", {
    place: name,
  });

  if (!uid) return false;

  try {
    if (img && img.length > 0)
      await uploadImg("/logos/" + uid + ".jpg", img[0]);

    let json_place = {
      name,
      address,
      phone,
      instagram,
      facebook,
      whatsapp,
      desc,
      create: false,
    };

    if (hayWorkHours) json_place.workHours = workHours;

    await app
      .firestore()
      .collection("places")
      .doc(uid)
      .set(json_place, { merge: true });

    if (category) {
      let place_min = { name, address, phone };

      if (hayWorkHours) place_min.workHours = workHours;

      await app.firestore().collection(category).doc(uid).set(place_min);
    }
  } catch (e) {
    console.log(e);
    throw new Error("no permisos");
  }
};

export const createAccount = (email, password) => {
  analytics.logEvent("createAccount", {
    email: email,
  });
  return app
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .catch((e) => {
      console.log(e);
      throw new Error(e.code);
    });
};

export const SignOut = () => {
  app
    .auth()
    .signOut()
    .catch((e) => console.log(e));
};

export const getPlaces = (type) => {
  const session_storage = JSON.parse(window.sessionStorage.getItem(type));
  if (session_storage) {
    analytics.logEvent("select_category_storage", {
      category: type,
    });
    return session_storage;
  }
  analytics.logEvent("select_category", {
    category: type,
  });
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
      analytics.logEvent("error_select_category", {
        category: type,
      });
      console.log(e);
      throw new Error("Ocurrió un error. Vuelva a intentarlo más tarde.");
    });
};

export async function getPlace(id) {
  const session_storage = JSON.parse(window.sessionStorage.getItem(id));
  if (session_storage) return session_storage;

  const db_get = await refPlaces.doc(id).get();
  if (db_get.exists) {
    window.sessionStorage.setItem(id, JSON.stringify(db_get.data()));
    const place = db_get.data();
    return place;
  }
  return null;
}

export default app;
