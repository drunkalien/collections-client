import { useRouter } from "next/router";
import Image from "next/image";

import { useAPIQuery } from "hooks";
import Paper from "components/Paper";
import Container from "components/Container";
import Comment from "components/Comment";
import Item from "./Item";
import Collection from "components/Collection";
import Link from "next/link";
import classNames from "classnames";
import { useTranslation } from "next-i18next";
import Button from "components/Button";

const Search = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const { keyword } = router.query;
  const searchQuery = useAPIQuery({
    url: "/search",
    params: { keyword: keyword || "" },
  });

  return (
    <Container className="mt-10">
      {searchQuery.data?.results?.map((result: any, idx: number) => (
        <Paper
          key={idx}
          className={classNames("mb-4", {
            "border-none": result.docType === "collection",
          })}
        >
          <div className="flex">
            <div className="p-1 bg-lightGray rounded-md mb-2">
              {t(result?.docType)}
            </div>
          </div>
          {result.docType === "user" ? (
            <div className="flex gap-2 cursor-pointer">
              <Link href={`users/${result._id}`}>
                <>
                  <Image
                    className="w-[70px] h-[70px]"
                    width={70}
                    height={70}
                    src={result.avatar || "/profile.svg"}
                    alt="avatar"
                  />
                  {result.username}
                </>
              </Link>
            </div>
          ) : result.docType === "comment" ? (
            <div>
              <Comment comment={result} />
              <Link href={{ pathname: "  " }}>
                <a>
                  <Button>{t("Open item")}</Button>
                </a>
              </Link>
            </div>
          ) : result.docType === "collection" ? (
            <Collection
              authorId={result.author}
              name={result.name}
              id={result._id}
              image={result.image}
            />
          ) : result.docType === "item" ? (
            <Item item={result} />
          ) : null}
        </Paper>
      ))}
    </Container>
  );
};

export default Search;
