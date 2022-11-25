import "./App.css";
import TodoForm from "./Pages/todo";
import TodoList from "./Pages/todo/TodoList";
import Login from "./Pages/Login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { Route, Routes } from "react-router-dom";
import SignUp from "./Pages/signup";

const publicRoutesOptions = [
  { component: <Login />, path: "/" },
  { component: <SignUp />, path: "/signup" },
  { component: <TodoList />, path: "/todolist" },
  { component: <TodoForm />, path: "/addtodo" },
  { component: <TodoForm isEdit />, path: "/edittodo/:id" },
];

function App() {
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
