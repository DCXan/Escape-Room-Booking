import React, { useContext } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "react-datetime/css/react-datetime.css";
import App from "./App";
import { ContextProvider } from "./contexts/ContextProvider";
import { AuthContextProvider } from "./contexts/AuthContext";
import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";
import { composeWithDevTools } from "@redux-devtools/extension";
import roomReducer from "./contexts/reducer/roomReducer";
import * as actionCreators from "./contexts/creators/actionCreators";
import userReducer from "./contexts/reducer/userReducer";
import Login from "./pages/authenticate/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const rootReducer = combineReducers({
  roomReducer: roomReducer,
  userReducer: userReducer,
});

const token = localStorage.getItem("jsonwebtoken");
const store = createStore(rootReducer, composeWithDevTools());
store.dispatch(actionCreators.loadAuth(token));

ReactDOM.render(
  <AuthContextProvider>
    <ContextProvider>
      <Provider store={store}>
        {token ? (
          <App />
        ) : (
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Login />} />
            </Routes>
          </BrowserRouter>
        )}
      </Provider>
    </ContextProvider>
  </AuthContextProvider>,

  document.getElementById("root")
);
