import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "../Pages/todo/TodoSlice";
import { persistReducer, persistStore } from "redux-persist";
import sessionStorage from "redux-persist/es/storage/session";
import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";

const presistConfig = {
  key: "todo",
  storage: sessionStorage,
  stateReconciler: autoMergeLevel2,
  blacklist: ["todo"],
};

const persistedReducer = persistReducer(presistConfig, todoReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);
