import axios from "axios";

const Home = () => {
  function getCollection() {
    axios
      .get("http://localhost:5000/api/v1/collections/62b1c5f182034f5fa59814cc")
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  }

  return <button onClick={getCollection}>click</button>;
};

export default Home;
