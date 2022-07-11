import Button from "components/Button";
import Paper from "components/Paper";
import { useAPIQuery } from "hooks";
import { useTranslation } from "next-i18next";
import Link from "next/link";
import { UserData } from "types";

type Props = {
  name: string;
  image?: string;
  id: string;
  authorId: string;
};

const Collection = ({ name, image, id, authorId }: Props) => {
  const { t } = useTranslation();
  const link = {
    pathname: "/collections/[collection]",
    query: { collection: id },
  };

  const userQuery = useAPIQuery<UserData>({
    url: `users/user-by-id/${authorId}`,
  });

  console.log(authorId);
  return (
    <Paper className="max-w-xl md:w-full mx-auto mb-7">
      <Link href={link}>
        <a>
          <h4 className="text-lg font-bold mb-4">{name}</h4>
        </a>
      </Link>
      {image && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          className="w-full h-full rounded"
          src={image}
          alt="collection image"
        />
      )}
      <div className="mt-4 flex justify-between items-center">
        <div>
          {t("by")}{" "}
          <Link href={`/users/${authorId}`}>
            <a className="text-blue-600">{userQuery.data?.username}</a>
          </Link>
        </div>

        <Link href={link}>
          <Button>View</Button>
        </Link>
      </div>
    </Paper>
  );
};

export default Collection;
