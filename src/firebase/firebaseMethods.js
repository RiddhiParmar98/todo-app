import {
  getAuth,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import {
  getFireStore,
  query,
  getDocs,
  collection,
  where,
  addDoc,
} from "firebase/firestore";
import { app } from "./index";
import { toast } from "react-toastify";

const auth = getAuth(app);

createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    const user = userCredential.user;
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
  });

export const logInWithEmailAndPassword = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password).then(
      (userCredential) => {
        const user = userCredential.user;
        console.log("user: ", user);
        localStorage.setItem("accessToken", user.accessToken);
      }
    );
  } catch (err) {
    console.error(err);
    toast.error("Incorrect Username or Password");
    // alert(err.message);
  }
};

const provider = new GoogleAuthProvider();
console.log("provider: ", provider);

export const loginWithGoogle = async () => {
  // try {
  await signInWithPopup(auth, provider)
    .then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const user = result.user;
      console.log("user: ", user);
      localStorage.setItem("accessToken", token);
      // });
    })
    .catch((error) => {
      const errorCode = error.code;
      console.log("errorCode: ", errorCode);
      const errorMessage = error.message;
      toast.error(errorMessage);
      // const email = error.customData.email;
      // toast.error(GoogleAuthProvider.credentialFromError(err));
    });
};

export const logOut = () => {
  auth
    .signOut(auth)
    .then(() => {
      localStorage.clear();
      console.log("logout");
    })
    .catch((error) => {
      console.log("error", error);
    });
};
