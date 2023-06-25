import { useState, useEffect } from "react";
// import Form from "./Form/Form";
// import "./Form/Form.css";
import "./App.css";

export default function App() {
  const [character, setCharacter] = useState([]);

  useEffect(() => {
    let randomNumb = Math.floor(Math.random() * 826);

    console.log("Useeffect worked.");

    fetch(`https://rickandmortyapi.com/api/character/${randomNumb}`)
      .then((response) => response.json())
      .then((data) =>
        setCharacter(() => {
          return [data];
        })
      );

    console.log(character);
  }, []);

  function handleClick() {
    console.log("New char.");
  }

  let charElement = character.map((f) => {
    return (
      <>
        <form>
          <article className="cta">
            <img src={f.image} alt="{f.name}" />
            <div className="cta__text-column">
              <h2>{f.name}</h2>
              <p>
                {f.gender} {f.species} {f.status}
              </p>
              <button onSubmit={handleClick}>New character</button>
            </div>
          </article>
        </form>
      </>
    );
  });

  return (
    <>
      <div className="center"></div>
      {charElement != null && charElement}
    </>
  );
}
