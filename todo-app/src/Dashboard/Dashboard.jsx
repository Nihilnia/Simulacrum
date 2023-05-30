import { useEffect, useState } from "react";
import { todozCollection, db } from "../Firebase";
import { onSnapshot, doc, addDoc, deleteDoc, setDoc } from "firebase/firestore";

import "../Dashboard/Dashboard.css";

export default function Dashboard(props) {
  document.body.classList.remove("body--login");
  document.body.classList.add("body--dashboard");
  document.body.classList.add("body--newTodo");

  const { loggedUser } = props;

  const [tempToDo, setTempTodo] = useState({
    userName: "",
    toDo: "",
    situation: 0,
  });
  const [allTodoz, setAllTodoz] = useState(null);

  console.log("All todoz of user:");
  console.log(allTodoz);
  useEffect(() => {
    //? Watching the Database
    const unsub = onSnapshot(todozCollection, (snapshot) => {
      console.log("Todoz in the database are changing..");
      console.log(`Logged User: ${JSON.stringify(loggedUser)}`);
      const userzTodoz = snapshot.docs.map((todo) => {
        return {
          id: todo.id,
          ...todo.data(),
        };
      });
      console.log(userzTodoz); //Gettin all the todos.. this is bad but nvm for now.
      //? READIN':
      userzTodoz.length > 0
        ? setAllTodoz(() =>
            userzTodoz.filter((td) => td.userName == loggedUser.userName)
          )
        : setAllTodoz(null);
    });

    return unsub;
  }, []);

  const handleNewTodo = (e, incominUserName) => {
    console.log("New todo..");
    console.log(e.key);

    const { name, value } = e.target;

    setTempTodo((prev) => {
      return { ...prev, userName: loggedUser.userName, [name]: value };
    });
  };

  const handleNewTodoEnter = (e) => {
    if (e.key == "Enter") {
      e.preventDefault();

      const addNewTodo = async () => {
        const newTodoRef = await addDoc(todozCollection, tempToDo); //? Getting the reference of the process.
      };

      addNewTodo();
      console.log("New todo submitted");
      e.target.parentElement.reset();
    }
  };

  const handleCompleteToDo = async (e, todoID, todoSituation) => {
    const refTodo = doc(db, "todoz", todoID);
    await setDoc(
      refTodo,
      {
        situation: todoSituation == 0 ? 1 : 0,
      },
      { merge: true }
    );
  };

  const elementzTodoz = allTodoz?.map((todoz) => {
    // return <h2>Todo: {todoz.toDo}</h2>;
    return (
      <>
        <div
          className="todo--bg-1"
          key={todoz.id}
          onClick={(e) => handleCompleteToDo(e, todoz.id, todoz.situation)}
        >
          <h2
            style={
              todoz.situation == 0
                ? { textDecoration: "none" }
                : { textDecoration: "line-through" }
            }
          >
            {todoz.toDo}
          </h2>
          <p>{todoz.situation == 0 ? "Todo" : "Done"}</p>
        </div>
      </>
    );
  });

  return (
    <>
      <div className="loading--container">
        <div className="loading--loading-bar">
          <div className="loading--loading-bar--progress">
            <span className="loading--first"></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span className="loading--last"></span>
          </div>
        </div>
      </div>

      {setTimeout(() => {
        document
          .querySelector(".loading--container")
          .classList.add("loading--hide");
        document
          .querySelector(".loading--after")
          .classList.replace("visibilityHidden", "visibilityVisible");
      }, 3000)}
      <div className="loading--after visibilityHidden">
        <h2 className="user--header">Welcome: {loggedUser.userName}</h2>
        <form
          className="form__group field newTodo"
          onKeyPress={handleNewTodoEnter}
        >
          <input
            type="input"
            className="form__field"
            placeholder="Add new to-do item"
            name="toDo"
            id="toDo"
            onChange={(e) => handleNewTodo(e, loggedUser)}
            required
          />
          <label htmlFor="toDo" className="form__label">
            Add new to-do item
          </label>
        </form>
        <div className="todo--container">
          {allTodoz != null && elementzTodoz}
        </div>
      </div>
    </>
  );
}
