import { useState, useEffect } from "react";
import GetMovie from "./Movie";

import "./Movie.css";

export default function App() {
  const [movie, setMovie] = useState(
    JSON.parse(localStorage.getItem("moviez")) || []
  );

  const [movName, setMovName] = useState("");

  useEffect(() => {
    localStorage.setItem("moviez", JSON.stringify(movie));
  }, [movie]);

  function handleChange(e) {
    setMovName(e.target.value);

    console.log("Movie name " + movName);
  }

  const getNewMovie = (e) => {
    console.log("Clicked");

    fetch(`http://www.omdbapi.com/?i=tt3896198&apikey=3a5abbf8&t=${movName}`)
      .then((resp) => resp.json())
      .then((data) => setMovie((prev) => [data, ...prev]));
  };

  return (
    <>
      <GetMovie
        getNewMovie={getNewMovie}
        handleChange={handleChange}
        objMovie={movie}
      />
    </>
  );
}
