// 재귀적 타입 정의

export type NestedStringFunction =
  | (() => string)
  | (() => NestedStringFunction);

let componentRef: NestedStringFunction | null = null;

export function render(component: NestedStringFunction) {
  if (!componentRef) {
    componentRef = component;
  }

  const content = unveilComponent(component);

  renderToRoot(content);
}

export function rerender() {
  if (!componentRef) {
    throw new Error("rerender 는 초기 렌더링 이후에 호출되어야 합니다.");
  }

  const content = unveilComponent(componentRef);

  renderToRoot(content);
}

function unveilComponent(component: NestedStringFunction) {
  const result = component();

  if (typeof result === "string") {
    return result;
  }

  return unveilComponent(result);
}

function renderToRoot(htmlString: string) {
  const $root = document.getElementById("root");
  $root.innerHTML = htmlString;
}
