import { NestedStringFunction, rerender } from "./render";

// 절대 경로로 시작하거나 *만 허용
type Path = `/${string}` | "*";
type Element = NestedStringFunction;

interface Route {
  path: Path;
  element: Element;
}

interface RouterOptions {
  useHash?: boolean;
}

const routeMap = new Map<Path, Element>();

export function Router(routes: Route[], options: RouterOptions) {
  saveRoutesInMap(routes);
  attachPopstateEvent();

  if (options.useHash) {
    attachHashChangeEvent();
  }

  return () => {
    const { pathname, hash } = location;

    if (options.useHash && isHashRoute(hash)) {
      const parsedHash = removeHashSymbol(hash);

      return findTargetComponentOrNotFound(parsedHash);
    }

    return findTargetComponentOrNotFound(pathname as Path);
  };
}

function saveRoutesInMap(routes: Route[]) {
  routes.forEach((route) => {
    const { path, element } = route;
    routeMap.set(path, element);
  });
}

function findTargetComponentOrNotFound(path: Path) {
  const targetComponent = routeMap.get(path) ?? routeMap.get("*");

  if (targetComponent) {
    return targetComponent;
  }

  return null;
}

function attachPopstateEvent() {
  window.addEventListener("popstate", rerender);
}

function attachHashChangeEvent() {
  window.addEventListener("hashchange", rerender);
}

function isHashRoute(path: string) {
  return path.startsWith("#");
}

function removeHashSymbol(path: string) {
  return path.replace("#", "") as Path;
}
