import { useEffect, useRef, useState } from "react";
import { useAPIQuery } from ".";
import { User } from "types";
import { windowIsDefined } from "utils";

const useCurrentUser = () => {
  return useAPIQuery<User>({
    url: "users/user/me",
    options: {
      enabled: windowIsDefined() && !!window.localStorage.getItem("token"),
    },
  });
};

export default useCurrentUser;
