import { combineReducers, configureStore } from "@reduxjs/toolkit";
import todoReducer from "../Pages/todo/TodoSlice";
// import { persistReducer, persistStore } from "redux-persist";
// import sessionStorage from "redux-persist/es/storage/session";
// import autoMergeLevel2 from "redux-persist/lib/stateReconciler/autoMergeLevel2";
import userReducer from "../Pages/Login/userSlice";

// const presistConfig = {
//   key: "root",
//   storage: sessionStorage,
//   stateReconciler: autoMergeLevel2,
// };

const rootReducer = combineReducers({
  todo: todoReducer,
  user: userReducer,
});

// const persistedReducer = persistReducer(presistConfig, rootReducer);

export const store = configureStore({
  reducer: rootReducer,
});

// export const persistor = persistStore(store);
