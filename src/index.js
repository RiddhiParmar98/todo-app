import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
// import { persistor, store } from "./redux/Store";
import { Provider } from "react-redux";
// import { PersistGate } from "redux-persist/integration/react";
import { BrowserRouter } from "react-router-dom";
import { store } from "./redux/Store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        {/* <PersistGate loading={null} persistor={persistor}> */}
        <App />
        {/* </PersistGate> */}
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
