import * as navigator from "../libs/navigator.js";

interface RouteGuardOptionParams {
  condition: () => boolean;
  Fallback: () => string;
  redirectTo: string;
}

const RouteGuard = (
  Component: () => string,
  options: RouteGuardOptionParams,
) => {
  return () => {
    if (options.condition()) {
      navigator.replace(options.redirectTo);
      return options.Fallback;
    }
    return Component;
  };
};

export default RouteGuard;
