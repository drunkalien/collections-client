import { windowIsDefined } from ".";

export const isUserAuthenticated = () => {
  if (windowIsDefined()) {
    return !!window.localStorage.getItem("token");
  }
};
