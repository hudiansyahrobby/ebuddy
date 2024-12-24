import { doc, getDoc, setDoc, UpdateData, updateDoc } from "firebase/firestore";
import {
  admin,
  auth,
  createUserWithEmailAndPassword,
  db,
  signInWithEmailAndPassword,
  signOut,
} from "../config/firebaseConfig";
import { User } from "../entities/user";
import { firestoreCollection } from "../constants/firestoreCollection";

const getUserByEmail = async (email: string) => {
  return admin.auth().getUserByEmail(email);
};

const signUpByEmailAndPassword = async (email: string, password: string) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

const loginByEmailAndPassword = async (email: string, password: string) => {
  return signInWithEmailAndPassword(auth, email, password);
};

const logoutUser = async () => {
  return signOut(auth);
};

const saveUserDataToFirestore = async (id: string, data: User) => {
  const docRef = doc(db, firestoreCollection.users, id);
  await setDoc(docRef, data);
};

const fetchUserDataFromFirestore = async (id: string) => {
  const docRef = doc(db, firestoreCollection.users, id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    throw new Error("User not found");
  }
};

const updateUserDataInFirestore = async (
  id: string,
  data: UpdateData<User>
) => {
  const docRef = doc(db, "users", id);
  await updateDoc(docRef, data);
};

export default {
  getUserByEmail,
  loginByEmailAndPassword,
  signUpByEmailAndPassword,
  logoutUser,
  fetchUserDataFromFirestore,
  saveUserDataToFirestore,
  updateUserDataInFirestore,
};
