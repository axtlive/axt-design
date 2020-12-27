import { FC, useState, useEffect } from "react";
import axios from "axios";

const App: FC = () => {
  const [title, setTitle] = useState("");
  const postData = {
    title: "Axtlive",
    description: "handsome man",
  };

  useEffect(() => {
    axios
      .post("http://jsonplaceholder.typicode.com/posts", postData)
      .then((res) => {
        console.log(res);
        setTitle(res.data.title);
      });
  });

  return (
    <div>
      <h1>{title}</h1>
    </div>
  );
};

export default App;
