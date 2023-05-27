import { useState, useEffect } from "react";
import Register from "./Form";
import { userzCollection, db } from "./Firebase";
import { onSnapshot, doc, addDoc, deleteDoc, setDoc } from "firebase/firestore";

import "./GlassCard.css";
import GlassCard from "./GlassCard";

export default function App() {
  //? Creating a state to hold localStorage.
  const [ls, setLS] = useState(
    JSON.parse(localStorage.getItem("firebase-prj-0")) || []
  );

  //? tempData for holding every keyboard hits. I don' t want to send every changes to DB.
  const [tempData, setTempData] = useState({
    userName: "",
    passWord: "",
  });

  //? Somehow ls didnt work as I expected, so I created another state to get localStorage.
  const [allUserz, setAllUserz] = useState(
    JSON.parse(localStorage.getItem("firebase-prj-0")) || []
  );

  //? Creatin' useEffect to mount onSnapshot to watch Database changes.
  useEffect(() => {
    const unsubscribe = onSnapshot(userzCollection, (snapshot) => {
      snapshot.docs.length == 0
        ? console.log("%cDatabase is empty now..", "color: orange")
        : console.log("%cDatabase is changing..", "color: orange");

      console.log(
        `At total there are ${snapshot.docs.length} userz in the database..`
      );
      //? oldschool controllin to database changes

      //! READING:
      const userzArr = snapshot.docs.map((doc) => {
        //?Map returns array.. key point!
        return { id: doc.id, ...doc.data() };
      });

      //?When data is deleted on db, even with hand localStorage getting empty
      setLS(() => {
        localStorage.setItem("firebase-prj-0", JSON.stringify(userzArr));
      });
    });

    return unsubscribe;
    //? When onSnapshot is done with it' s shit its make it over to watch
    //? for encounter the memory leak
  }, []);

  //?Settin' the temp data to waiting to submit
  const handleChange = (e) => {
    // console.log(e.target);
    // console.log("Somethings changed");

    const { name, value } = e.target;

    setTempData((prev) => {
      return { ...prev, [name]: value };
    });
  };

  //?Adding the new doc to the collection 'userz'
  const handleSubmit = (e) => {
    // console.log(e.target);
    // console.log("Somethings submitted");

    //! CREATE: return promise.
    const registerUser = async () => {
      const newUserRef = await addDoc(userzCollection, tempData); //? Getting the reference of the process.
    };

    if (e.key == "Enter") {
      //? Filterin' the all users to find if there is same username in it.
      let findUser = allUserz.filter(
        (user) => user.userName == tempData.userName
      );
      if (findUser.length > 0) {
        console.log("This username is taken");
      } else {
        console.log("This is username is available.");
        //? When the user press Enter and the username is not taken registerin' into database.
        registerUser();
        e.target.parentElement.reset();
      }
    }
  };

  //! DELETE: return promise.
  const handleDelete = async (e, id) => {
    console.log("Delete button clicked.");
    console.log(e);
    const docRef = doc(db, "userz", id); //? Selectin' the doc we want to delete
    await deleteDoc(docRef); //? Give the reference to delete
  };

  //! UPDATE: return promise.
  const handleUpdate = async (e, id) => {
    console.log("Update event triggered.");
    console.log(e);

    let findUser = allUserz.filter((f) => f.id == id);
    let userOldPass = findUser[0]["passWord"];
    console.log(userOldPass);

    let askOldPass = prompt("Your current password:");
    if (askOldPass != userOldPass) {
      alert("Password is wrong.");
    } else {
      let userName = prompt("New username", "");
      let passWord = prompt("New password", "");
      const docRef = doc(db, "userz", id);

      await setDoc(
        docRef,
        { userName: userName, passWord: passWord },
        { merge: true }
      );
    }
  };

  return (
    <>
      <Register handleSubmit={handleSubmit} handleChange={handleChange} />
      {/* <UserCard daUserz={allUserz} handleDelete={handleDelete} /> */}
      <GlassCard
        daUserz={allUserz}
        handleDelete={handleDelete}
        handleUpdate={handleUpdate}
      />
    </>
  );
}
