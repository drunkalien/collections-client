import { useRouter } from "next/router";
import Image from "next/image";

import { useAPIQuery } from "hooks";
import Paper from "components/Paper";
import Container from "components/Container";
import Comment from "components/Comment";
import Item from "./Item";
import Collection from "components/Collection";
import Link from "next/link";

const Search = () => {
  const router = useRouter();
  const { keyword } = router.query;
  const searchQuery = useAPIQuery({
    url: "/search",
    params: { keyword: keyword || "" },
  });

  return (
    <Container className="mt-10">
      {searchQuery.data?.results.map((result: any, idx: number) => (
        <Paper key={idx}>
          {result.type === "user" ? (
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
          ) : result.type === "comment" ? (
            <div>
              <Comment comment={result} />
            </div>
          ) : result.type === "collection" ? (
            <Collection
              authorId={result.author}
              name={result.name}
              id={result._id}
              image={result.image}
            />
          ) : result.type === "item" ? (
            <Item item={result} />
          ) : null}
        </Paper>
      ))}
    </Container>
  );
};

export default Search;
