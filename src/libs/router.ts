import { NestedStringFunction, rerender } from "./render";

// 절대 경로로 시작하거나 *만 허용
type Path = `/${string}` | "*";
type Element = NestedStringFunction;

interface Route {
  path: Path;
  element: Element;
}

const routeMap = new Map<Path, Element>();

export function BrowserRouter(routes: Route[]) {
  saveRoutesInMap(routes);
  attachRerenderEvent();

  return () => {
    const { pathname } = location;
    const targetComponent = findTargetComponentOrNotFound(pathname as Path);

    if (targetComponent) {
      return targetComponent;
    }

    throw new Error("존재하지 않는 URL 입니다.");
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

function attachRerenderEvent() {
  window.addEventListener("popstate", rerender);
}
