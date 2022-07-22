import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBTPyfiMurzNmiMP8vajHpkg7fYCR0mP4s",
  authDomain: "miniblog-e941c.firebaseapp.com",
  projectId: "miniblog-e941c",
  storageBucket: "miniblog-e941c.appspot.com",
  messagingSenderId: "460909903678",
  appId: "1:460909903678:web:b93dce89d696e85371b66f",
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };
