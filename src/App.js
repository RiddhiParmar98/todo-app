import "./App.css";
import TodoForm from "./Pages/todo";
import TodoList from "./Pages/todo/TodoList";
import Login from "./Pages/Login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { Route, Routes } from "react-router-dom";
import SignUp from "./Pages/signup";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "./firebase";
import { useEffect, useState } from "react";
import { fetchTodo } from "../src/Pages/todo/TodoSlice";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../src/Pages/Login/userSlice";
function App() {
  const dispatch = useDispatch();
  const loginUser = useSelector((state) => state.user.loginUser);
  const publicRoutesOptions = [
    { component: <Login />, path: "/" },
    { component: <SignUp />, path: "/signup" },
    { component: <TodoList />, path: "/todolist" },
    { component: <TodoForm />, path: "/addtodo" },
    { component: <TodoForm isEdit />, path: "/edittodo/:id" },
  ];

  const fetchUserFromFireStore = async () => {
    await getDocs(collection(db, "registerUser")).then((querySnapshot) => {
      const newData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      dispatch(fetchUser(newData));
    });

    const fetchTodoQuery = query(
      collection(db, "todos"),
      where("todo.userId", "==", loginUser[0].user.userId)
    );
    const fetchTodoData = await getDocs(fetchTodoQuery);
    const newData = [];
    fetchTodoData.forEach((doc) => {
      newData.push(doc.data().todo);
    });
    dispatch(fetchTodo(newData));
  };

  useEffect(() => {
    fetchUserFromFireStore();
  });

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
