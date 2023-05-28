import { useState, useEffect } from "react";
import { userzCollection, db } from "./Firebase";
import { onSnapshot, doc, addDoc, deleteDoc, setDoc } from "firebase/firestore";

import Login from "./Login";
import "./Login.css";

export default function App() {
  const [userz, setUserz] = useState([]);

  const [tempData, setTempData] = useState({
    userName: "",
    passWord: "",
  });

  useEffect(() => {
    const unsubscribe = onSnapshot(userzCollection, (snapshot) => {
      const allUserz = snapshot.docs.map((user) => {
        return { id: user.id, ...user.data() };
      });

      setUserz(allUserz);
    });

    return unsubscribe;
  }, []);

  const handleChange = (e) => {
    console.log("Change happened..");
    // console.log(e);

    const { name, value } = e.target;
    setTempData((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const handleEnter = (e) => {
    // console.log(e);

    if (e.key == "Enter") {
      console.log("Data sent..");

      const findUser = userz.filter(
        (user) => user.userName == tempData.userName
      );
      if (findUser.length > 0) {
        console.log(`Found user: ${JSON.stringify(findUser)}`);
        findUser[0].passWord == tempData.passWord
          ? console.log("%cLogin succesful.", "color: orange")
          : console.log("%cPassword wrong.", "color: orange");
      } else {
        // console.log(`Typeof user: ${typeof findUser}`);
        console.log("%cUser not found.", "color: orange");
      }
    }
  };

  // console.log(userz);
  // console.log(tempData);

  return (
    <>
      <Login
        handleChange={handleChange}
        handleEnter={handleEnter}
        allUserz={userz}
      />
    </>
  );
}
