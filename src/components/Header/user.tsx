import Button from "components/Button";
import { useCurrentUser } from "hooks";
import Link from "next/link";
import { FiUser } from "react-icons/fi";
import { windowIsDefined } from "utils";

const User = () => {
  const userQuery = useCurrentUser();
  return (
    <div className="flex items-center gap-5">
      {windowIsDefined() && window.localStorage.getItem("token") ? (
        <div className="cursor-pointer">
          <Link href={`/users/${userQuery.data?.user?._id}` || ""}>
            <FiUser size={24} />
          </Link>
        </div>
      ) : (
        <div>
          <Link href="/login">
            <Button className="mx-1 bg-yellow">Login</Button>
          </Link>
          <Link href="/signup">
            <Button className="mx-1">Sign up</Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default User;
