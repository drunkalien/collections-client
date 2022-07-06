import Button from "components/Button";
import Paper from "components/Paper";
import { useTranslation } from "next-i18next";
import Link from "next/link";

type Props = {
  name: string;
  image?: string;
  author: string;
};

const Collection = ({ name, image, author }: Props) => {
  const { t } = useTranslation();
  return (
    <Paper className="max-w-xl md:w-full mx-auto mb-7">
      <Link href="/">
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
          <Link href="/">
            <a className="text-blue-600">{author}</a>
          </Link>
        </div>

        <Link href="/">
          <Button>View</Button>
        </Link>
      </div>
    </Paper>
  );
};

export default Collection;
