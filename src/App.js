import "./App.css";
import TodoForm from "./Pages/todo";
import TodoList from "./Pages/todo/TodoList";
import Login from "./Pages/Login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { Route, Routes } from "react-router-dom";
import SignUp from "./Pages/signup";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";
import { useEffect, useState } from "react";

function App() {
  const [user, setUser] = useState([]);
  const [todo, setTodo] = useState([]);

  const publicRoutesOptions = [
    { component: <Login users={user.length && user} />, path: "/" },
    { component: <SignUp users={user.length && user} />, path: "/signup" },
    { component: <TodoList todos={todo.length && todo} />, path: "/todolist" },
    { component: <TodoForm />, path: "/addtodo" },
    {
      component: <TodoForm todos={todo.length && todo} isEdit />,
      path: "/edittodo/:id",
    },
  ];

  // console.log("user,todo :>> ", user, todo);
  const fetchUserFromFireStore = async () => {
    await getDocs(collection(db, "registerUser")).then((querySnapshot) => {
      const newData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setUser(newData);
    });

    await getDocs(collection(db, "todos")).then((querySnapshot) => {
      const newData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setTodo(newData);
    });
  };

  useEffect(() => {
    fetchUserFromFireStore();
  }, []);

  return (
    <div>
      <Routes>
        {publicRoutesOptions.map(({ path, component }, idx) => (
          <Route key={idx} exact {...{ path, element: component }} />
        ))}
      </Routes>
      <ToastContainer autoClose={1000} />
    </div>
  );
}

export default App;
