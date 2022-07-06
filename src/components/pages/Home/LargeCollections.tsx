import Collection from "components/Collection";
import Paper from "components/Paper";

const dummyCollections = [
  {
    name: "Collection1",
    author: "Author 1",
  },
  {
    name: "Collection2",
    author: "Author 2",
    image:
      "https://images.theconversation.com/files/45159/original/rptgtpxd-1396254731.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=754&fit=clip",
  },
  {
    name: "Collection3",
    author: "Author 3",
    image:
      "https://images.theconversation.com/files/45159/original/rptgtpxd-1396254731.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=754&fit=clip",
  },
  {
    name: "Collection4",
    author: "Author 4",
  },
  {
    name: "Collection5",
    author: "Author 5",
    image:
      "https://images.theconversation.com/files/45159/original/rptgtpxd-1396254731.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=754&fit=clip",
  },
];

const LargeCollections = () => {
  return (
    <div>
      {dummyCollections.map(({ author, image, name }, idx) => (
        <Collection author={author} name={name} image={image} key={idx} />
      ))}
    </div>
  );
};

export default LargeCollections;
