import "./App.css";
import TodoForm from "./Pages/todo";
import { Container } from "@mui/material";
import TodoList from "./Pages/todo/TodoList";
import Login from "./Pages/Login";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.min.css';

function App() {
  return (
    <div>
      <Container>
    <Login />
        <TodoForm />
        <TodoList />
      </Container>
    <ToastContainer autoClose={500} />
    </div>
  );
}

export default App;
