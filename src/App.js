import logo from "./logo.svg";
import "./App.css";
import Login from "./Pages/Login";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.min.css';

function App() {
  return (
  <>
    <Login />
    <ToastContainer autoClose={500} />
  </>
  )
}

export default App;
