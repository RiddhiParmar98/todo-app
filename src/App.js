import "./App.css";
import TodoForm from "./Pages/todo";
import { Container } from "@mui/material";
import TodoList from "./Pages/todo/TodoList";

function App() {
  return (
    <div>
      <Container>
        <TodoForm />
        <TodoList />
      </Container>
    </div>
  );
}

export default App;
