import { useEffect, useState } from "react";
import GetQuote from "./Quote";
import "./Quote.css";
import "./Toggle.css";

export default function App() {
  const [ls, setLS] = useState(
    JSON.parse(localStorage.getItem("quotez")) || []
  );

  useEffect(() => localStorage.setItem("quotez", JSON.stringify(ls)), [ls]);

  const newQuote = (e) => {
    console.log("Clicked");

    fetch("https://api.quotable.io/random")
      .then((resp) => resp.json())
      .then((data) =>
        setLS((prev) => [
          {
            id: data._id,
            content: data.content,
            author: data.author,
          },
          ...prev,
        ])
      );
  };

  function handleDarkMode() {
    let daBody = document.querySelector("body");
    console.log(daBody);
    console.log("Toggle button clicked.");
    daBody.classList.toggle("darkMode");
  }

  return (
    <GetQuote
      handleClick={newQuote}
      currentQuotez={ls}
      handleDarkMode={handleDarkMode}
    />
  );
}
