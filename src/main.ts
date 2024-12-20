import { render } from "./libs/render";
import { ErrorPage, LoginPage, MainPage, ProfilePage } from "./pages/index";
import { Router } from "./libs/router";
import RouteGuard from "./components/RouteGuard";
import { addEventListener, delegateEvent } from "./services/eventProcessor.js";
import { isAuthenticated, login, logout } from "./stores/authStore";
import navigator from "./libs/navigator";
import { setUser } from "./stores/userStore";

render(
  Router(
    [
      {
        path: "/",
        element: MainPage,
      },
      {
        path: "/login",
        element: RouteGuard(LoginPage, {
          Fallback: MainPage,
          redirectTo: "/",
          condition: () =>
            isAuthenticated() &&
            (location.pathname === "/login" || location.hash === "#/login"),
        }),
      },
      {
        path: "/profile",
        element: RouteGuard(ProfilePage, {
          Fallback: LoginPage,
          redirectTo: "/login",
          condition: () =>
            !isAuthenticated() &&
            (location.pathname === "/profile" || location.hash === "#/profile"),
        }),
      },
      {
        path: "*",
        element: ErrorPage,
      },
    ],
    { useHash: true },
  ),
);

delegateEvent();

// =======이벤트 핸들러 등록 로직=======

addEventListener("login-form", {
  submit: (e: SubmitEvent) => {
    e.preventDefault();
    const form = new FormData(e.target as HTMLFormElement);
    const username = form.get("username") as string;
    const email = (form.get("email") ?? "") as string;
    const bio = (form.get("bio") ?? "") as string;

    login({ username, email, bio });
  },
});

addEventListener("login", {
  click: (e: MouseEvent) => {
    e.preventDefault();
    navigator.push("/login");
  },
});

addEventListener("logout", {
  click: (e: MouseEvent) => {
    e.preventDefault();
    logout();
  },
});

addEventListener("profile-form", {
  submit: (e: SubmitEvent) => {
    e.preventDefault();
    const form = new FormData(e.target as HTMLFormElement);
    const username = form.get("username") as string;
    const email = (form.get("email") ?? "") as string;
    const bio = (form.get("bio") ?? "") as string;
    setUser({ username, email, bio });
  },
});
