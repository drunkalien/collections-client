import Collection from "components/Collection";
import Paper from "components/Paper";

const dummyCollections = [
  {
    name: "Collection1",
    id: 213127,
    author: "Author 1",
  },
  {
    name: "Collection2",
    author: "Author 2",
    id: 95302,
    image:
      "https://images.theconversation.com/files/45159/original/rptgtpxd-1396254731.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=754&fit=clip",
  },
  {
    name: "Collection3",
    author: "Author 3",
    id: 3242342,
    image:
      "https://images.theconversation.com/files/45159/original/rptgtpxd-1396254731.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=754&fit=clip",
  },
  {
    name: "Collection4",
    id: 643534,
    author: "Author 4",
  },
  {
    name: "Collection5",
    author: "Author 5",
    id: 123123,
    image:
      "https://images.theconversation.com/files/45159/original/rptgtpxd-1396254731.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=754&fit=clip",
  },
];

const LargeCollections = () => {
  return (
    <div>
      {dummyCollections.map(({ author, image, name, id }, idx) => (
        <Collection
          id={id.toString()}
          author={author}
          name={name}
          image={image}
          key={idx}
        />
      ))}
    </div>
  );
};

export default LargeCollections;
