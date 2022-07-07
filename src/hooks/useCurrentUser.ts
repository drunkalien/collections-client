import { useAPIQuery } from ".";
import { User } from "types";

const useCurrentUser = () => {
  return useAPIQuery<User>({ url: "users/user/me" });
};

export default useCurrentUser;
