import Collection from "components/Collection";
import { useAPIQuery } from "hooks";
import { Collection as CollectionType } from "types";

const LargeCollections = () => {
  const collectionsQuery = useAPIQuery<{ collections: CollectionType[] }>({
    url: "collections/get/largest",
  });

  return (
    <div>
      {collectionsQuery?.data?.collections.map(
        ({ image, name, author, _id }, idx) => (
          <Collection
            id={_id}
            name={name}
            image={image}
            key={idx}
            authorId={author}
          />
        )
      )}
    </div>
  );
};

export default LargeCollections;
