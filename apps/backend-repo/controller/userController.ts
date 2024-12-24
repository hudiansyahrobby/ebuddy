import { Request, Response } from "express";
import userRepository from "../repository/userCollection";
import { FirebaseError } from "firebase/app";
import { FirestoreError } from "firebase/firestore";
import { User } from "../entities/user";

const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const userCredential = await userRepository.loginByEmailAndPassword(
      email,
      password
    );

    res.status(200).json({ message: "Login successful", data: userCredential });
  } catch (error) {
    if (error instanceof FirebaseError) {
      switch (error.code) {
        case "auth/user-not-found":
          res.status(404).json({ error: "User not found." });
          break;
        case "auth/wrong-password":
          res.status(400).json({ error: "Invalid password." });
          break;
        case "auth/invalid-email":
          res.status(400).json({ error: "Invalid email." });
          break;
        default:
          res
            .status(400)
            .json({ error: "Failed to login.", details: error.message });
      }
    } else {
      res.status(500).json({ error: "Failed to login." });
    }
  }
};

const signup = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const userCredential = await userRepository.signUpByEmailAndPassword(
      email,
      password
    );

    const { email: userEmail, uid } = userCredential.user;
    const data: User = {
      email: userEmail ?? "",
      uid,
      displayName: email?.split("@")[0] || "",
    };

    await userRepository.saveUserDataToFirestore(uid, data);

    res
      .status(200)
      .json({ message: "Sign up successful", data: userCredential });
  } catch (error) {
    if (error instanceof FirebaseError) {
      switch (error.code) {
        case "auth/email-already-in-use":
          res.status(400).json({ error: "Email already in use." });
          break;
        case "auth/invalid-email":
          res.status(400).json({ error: "Invalid email." });
          break;
        case "auth/weak-password":
          res.status(400).json({ error: "Weak password." });
          break;
        default:
      }
    } else {
      res.status(500).json({ error: "Failed to signup" });
    }
  }
};

const logout = async (req: Request, res: Response) => {
  try {
    await userRepository.logoutUser();

    res.status(200).json({ message: "logout successful" });
  } catch (error) {
    if (error instanceof FirebaseError) {
      switch (error.code) {
        case "auth/user-not-found":
          res.status(404).json({ error: "User not found." });
          break;
        default:
          res
            .status(400)
            .json({ error: "Failed to logout.", details: error.message });
      }
    } else {
      res.status(500).json({ error: "Failed to logout" });
    }
  }
};

const fetchUserData = async (req: Request, res: Response) => {
  const id = req.userId as string;

  try {
    const user = await userRepository.fetchUserDataFromFirestore(id);

    res.status(200).json({ message: "fetch user data successful", data: user });
  } catch (error) {
    if (error instanceof FirestoreError) {
      res
        .status(400)
        .json({ error: "Failed to fetch user data", details: error.message });
    } else if (error instanceof Error) {
      res
        .status(500)
        .json({ error: error?.message || "Failed to fetch user data" });
    } else {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
};

const updateUserData = async (req: Request, res: Response) => {
  const id = req.userId as string;
  const { displayName } = req.body;

  try {
    const user = await userRepository.fetchUserDataFromFirestore(id);

    const updatedData: User = {
      email: user.email,
      uid: user.uid,
      displayName,
    };

    await userRepository.updateUserDataInFirestore(id, updatedData);

    res
      .status(200)
      .json({ message: "update user data successful", data: updatedData });
  } catch (error) {
    if (error instanceof FirebaseError) {
      switch (error.code) {
        case "not-found":
          res.status(404).json({ error: "User not found." });
          break;
        default:
          res.status(400).json({
            error: "Failed to update user data.",
            details: error.message,
          });
      }
    } else if (error instanceof Error) {
      res
        .status(400)
        .json({ error: error?.message || "Failed to update user data" });
    } else {
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
};

export default { login, signup, logout, fetchUserData, updateUserData };
