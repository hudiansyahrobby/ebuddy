import { Request, Response } from "express";
import {
  fetchUserDataFromFirestore,
  loginByEmailAndPassword,
  logoutUser,
  saveUserDataToFirestore,
  signUpByEmailAndPassword,
  updateUserDataInFirestore,
} from "../repository/userCollection";
import { FirebaseError } from "firebase/app";
import { FirestoreError } from "firebase/firestore";
import { TUser } from "@repo/types";
import { sendErrorResponse, sendSuccessResponse } from "../utils/responseUtils";

const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const userCredential = await loginByEmailAndPassword(email, password);

    const accessToken = await userCredential.user.getIdToken();

    sendSuccessResponse(res, 200, "Login successful", { accessToken });
  } catch (error) {
    if (error instanceof FirebaseError) {
      switch (error.code) {
        case "auth/user-not-found":
          sendErrorResponse(res, 404, "User not found.");
          break;
        case "auth/wrong-password":
          sendErrorResponse(res, 400, "Invalid password");
          break;
        case "auth/invalid-email":
          sendErrorResponse(res, 400, "Invalid email.");
          break;
        default:
          sendErrorResponse(res, 400, "Failed to login.", error.message);
      }
    } else {
      sendErrorResponse(res, 500, "Failed to login.");
    }
  }
};

const signup = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const userCredential = await signUpByEmailAndPassword(email, password);

    const { email: userEmail, uid } = userCredential.user;
    const data: TUser = {
      email: userEmail ?? "",
      uid,
      displayName: email?.split("@")[0] || "",
    };

    await saveUserDataToFirestore(uid, data);

    sendSuccessResponse(res, 200, "Sign up successful", userCredential);
  } catch (error) {
    if (error instanceof FirebaseError) {
      switch (error.code) {
        case "auth/email-already-in-use":
          sendErrorResponse(res, 400, "Email already in use.");
          break;
        case "auth/invalid-email":
          sendErrorResponse(res, 400, "Invalid email.");
          break;
        case "auth/weak-password":
          sendErrorResponse(res, 400, "Weak password.");
          break;
        default:
          sendErrorResponse(res, 400, "Failed to signup.", error.message);
      }
    } else {
      sendErrorResponse(res, 500, "Failed to signup.");
    }
  }
};

const logout = async (req: Request, res: Response) => {
  try {
    await logoutUser();

    sendSuccessResponse(res, 200, "Logout successful");
  } catch (error) {
    if (error instanceof FirebaseError) {
      switch (error.code) {
        case "auth/user-not-found":
          sendErrorResponse(res, 404, "User not found.");
          break;
        default:
          sendErrorResponse(res, 400, "Failed to logout.", error.message);
      }
    } else {
      sendErrorResponse(res, 500, "Failed to logout.");
    }
  }
};

const fetchUserData = async (req: Request, res: Response) => {
  const id = req.userId as string;

  try {
    const user = await fetchUserDataFromFirestore(id);

    sendSuccessResponse(res, 200, "Fetch user data successful", user);
  } catch (error) {
    if (error instanceof FirestoreError) {
      sendErrorResponse(res, 400, "Failed to fetch user data", error.message);
    } else if (error instanceof Error) {
      sendErrorResponse(
        res,
        500,
        error?.message || "Failed to fetch user data"
      );
    } else {
      sendErrorResponse(res, 500, "Internal Server Error");
    }
  }
};

const updateUserData = async (req: Request, res: Response) => {
  const id = req.userId as string;
  const { displayName } = req.body;

  try {
    const user = await fetchUserDataFromFirestore(id);

    const updatedData: TUser = {
      email: user.email,
      uid: user.uid,
      displayName,
    };

    await updateUserDataInFirestore(id, updatedData);

    sendSuccessResponse(res, 200, "Update user data successful", updatedData);
  } catch (error) {
    if (error instanceof FirebaseError) {
      switch (error.code) {
        case "not-found":
          sendErrorResponse(res, 404, "User not found.");
          break;
        default:
          sendErrorResponse(
            res,
            400,
            "Failed to update user data.",
            error.message
          );
      }
    } else if (error instanceof Error) {
      sendErrorResponse(
        res,
        400,
        error?.message || "Failed to update user data"
      );
    } else {
      sendErrorResponse(res, 500, "Internal Server Error");
    }
  }
};

export default { login, signup, logout, fetchUserData, updateUserData };
