export function push(path: string) {
  window.history.pushState(null, null, path);
  window.dispatchEvent(new Event("popstate"));
}

export function forward() {
  window.history.forward();
}

export function back() {
  window.history.back();
}

export function replace(path: string) {
  window.history.replaceState(null, null, path);
  window.dispatchEvent(new Event("popstate"));
}

export default {
  push,
  forward,
  back,
};
