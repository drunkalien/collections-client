import { useAPIQuery, useCurrentUser } from "hooks";
import { Container, Button } from "components";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { UserData } from "types";

const User = () => {
  const currentUserQuery = useCurrentUser();
  const router = useRouter();
  const { t } = useTranslation();
  const { user } = router.query;
  const userQuery = useAPIQuery<UserData>({ url: `users/user-by-id/${user}` });
  const collectionsQuery = useAPIQuery({ url: `users/${user}/collections` });
  console.log(collectionsQuery);

  return (
    <Container>
      <div>
        <img src={userQuery.data?.avatar} height={200} width={200} alt="" />
        {!currentUserQuery.isLoading &&
          currentUserQuery.data?.user._id === user && (
            <Button>{t("Uplaod image")}</Button>
          )}
      </div>
      <div>
        <h1>{userQuery.data?.username}</h1>
      </div>
      <div>
        <h1>Collections</h1>
      </div>
    </Container>
  );
};

export default User;
