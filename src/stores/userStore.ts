import { USER } from "../constants/localStorageKey";
import { User } from "../types/user";
import { rerender } from "../libs/render";

export function getUser(): User | null {
  let user = localStorage.getItem(USER);

  if (!user) return null;

  return JSON.parse(user);
}

export function setUser(user: User) {
  localStorage.setItem(USER, JSON.stringify(user));
  rerender();
}
