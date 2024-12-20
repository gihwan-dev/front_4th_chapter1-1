import navigator from "../libs/navigator";
import { USER } from "../constants/localStorageKey";
import { User } from "../types/user";

export function isAuthenticated() {
  const user = localStorage.getItem(USER);
  return Boolean(user);
}

export function login({ username, email, bio }: User) {
  localStorage.setItem(USER, JSON.stringify({ username, email, bio }));
  navigator.push("/");
}

export function logout() {
  localStorage.clear();
  navigator.push("/login");
}
