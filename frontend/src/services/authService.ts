// src/services/authService.ts
import axios from "axios";
import { BACKEND_URL } from "../config";

export async function signup(userData: {
  username: string;
  email: string;
  password: string;
}) {
  try {
    return await axios.post(`${BACKEND_URL}/api/v1/signup`, userData);
  } catch (err) {
    if (axios.isAxiosError(err)) {
      throw new Error(err.response?.data?.message || err.message);
    }
    if (err instanceof Error) {
      throw new Error(err.message);
    }
    throw new Error("Unknown error during signup");
  }
}

export async function signin(credentials: {
  email: string;
  password: string;
}) {
  try {
    return await axios.post(`${BACKEND_URL}/api/v1/signin`, credentials);
  } catch (err) {
    if (axios.isAxiosError(err)) {
      throw new Error(err.response?.data?.message || err.message);
    }
    if (err instanceof Error) {
      throw new Error(err.message);
    }
    throw new Error("Unknown error during signin");
  }
}
