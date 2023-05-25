import { useState, useEffect } from "react";
import Form from "./Form";

import "./App.css";

export default function App() {
  const [ls, setLS] = useState(JSON.parse(localStorage.getItem("userz")) || []);
  const [tempData, setTempData] = useState({
    id: 0,
    userName: "defUserName",
    passWord: "defPassWord",
  });

  useEffect(() => {
    localStorage.setItem("userz", JSON.stringify(ls));
  }, [ls]);

  function handleChange(e) {
    console.log("Somethings changed..");

    const { name, value } = e.target;

    setTempData((prev) => ({
      ...prev,
      id: ls.length + 1,
      [name]: value,
    }));

    console.log(tempData);
  }

  function handleEnter(e) {
    if (e.key == "Enter") {
      console.log("Data submitted..");
      console.log(`
      ID: ${tempData.id}
      Username: ${tempData.userName}
      Pass: ${tempData.passWord}
      `);

      setLS((prev) => [tempData, ...prev]);

      e.target.parentElement.reset();
    }
  }

  return (
    <>
      <Form
        handleChange={handleChange}
        handleEnter={handleEnter}
        currentUserz={ls}
      />
    </>
  );
}
