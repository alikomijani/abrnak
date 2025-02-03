import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import api from "./base";
import { Tokens, User } from "./types";
import { AxiosError } from "axios";
export type UserCredentials = {
  email: string;
  password: string;
};
async function login(credentials: UserCredentials) {
  try {
    const res = await api.post<{
      user: User;
      tokens: Tokens;
    }>("/auth/login", credentials);
    return res.data;
  } catch (e) {
    if (e instanceof AxiosError) {
      throw e?.response?.data;
    }
    throw new Error("can't send request");
  }
}

export function loginMutation(
  options?: UseMutationOptions<
    Awaited<ReturnType<typeof login>>,
    { message: string; errors?: { email?: string[]; password?: string[] } }, // Error type
    UserCredentials
  > // Variables type>
) {
  return useMutation({
    mutationFn: login,
    ...options,
  });
}

export type UserData = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
};

async function register(userData: UserData) {
  try {
    const res = await api.post<{
      user: User;
      tokens: Tokens;
    }>("/auth/register", userData);
    return res.data;
  } catch (e) {
    if (e instanceof AxiosError) {
      throw e?.response?.data;
    }
    throw new Error("can't send request");
  }
}

export function registerMutation(
  options?: UseMutationOptions<
    Awaited<ReturnType<typeof register>>,
    {
      message: string;
      errors?: {
        email?: string[];
        password?: string[];
        firstName?: string[];
        lastName?: string[];
      };
    }, // Error type
    UserData
  >
) {
  return useMutation({
    mutationFn: register,
    ...options,
  });
}
