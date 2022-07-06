import { useAPIQuery } from ".";

const useCurrentUser = async () => {
  return useAPIQuery({ url: "users/user/me" });
};

export default useCurrentUser;
