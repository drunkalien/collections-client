import { useAPIQuery, useCurrentUser } from "hooks";
import { Container, Button, Collection } from "components";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { Collection as CollectionType, UserData } from "types";
import Image from "next/image";
import Link from "next/link";
import { windowIsDefined } from "utils";

const User = () => {
  const currentUserQuery = useCurrentUser();
  const router = useRouter();
  const { t } = useTranslation();
  const { user } = router.query;
  const userQuery = useAPIQuery<UserData>({ url: `users/user-by-id/${user}` });
  const collectionsQuery = useAPIQuery<{ collections: CollectionType[] }>({
    url: `users/${user}/collections`,
  });

  return (
    <Container className="mt-10">
      <div className="grid grid-cols-12 gap-5">
        <div className="w-[300px] h-[300px] rounded-full bg-gray col-span-4">
          <Image
            src={userQuery.data?.avatar || "/profile.svg"}
            className="object-fill rounded-full mb-6"
            height={300}
            width={300}
            alt=""
          />
          {!currentUserQuery.isLoading &&
            windowIsDefined() &&
            window.localStorage.getItem("token") &&
            currentUserQuery.data?.user?._id === user && (
              <Button>{t("Uplaod image")}</Button>
            )}
        </div>
        <div className="h-full flex flex-col justify-center col-span-8">
          <p className="text-lg my-2">
            <span className="font-bold">Username:</span>{" "}
            {userQuery.data?.username}
          </p>
          <p className="text-lg my-2">
            <span className="font-bold">Email:</span> {userQuery.data?.email}
          </p>
        </div>
      </div>
      <div className="flex flex-col items-center mt-20">
        <div className="mb-10 flex gap-10">
          <h2 className="text-3xl font-bold">{t("Collections")}</h2>
          {!currentUserQuery.isLoading &&
            windowIsDefined() &&
            window.localStorage.getItem("token") &&
            currentUserQuery.data?.user?._id === user && (
              <Link href="/collections/create">
                <Button>Add Collection</Button>
              </Link>
            )}
        </div>
        {collectionsQuery.data?.collections?.map((collection) => (
          <Collection
            id={collection._id}
            key={collection._id}
            name={collection.name}
            image={collection.image}
            authorId={collection.author}
          />
        ))}
      </div>
    </Container>
  );
};

export default User;
