import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import "react-datetime/css/react-datetime.css";
import App from "./App";
import { ContextProvider } from "./contexts/ContextProvider";
import { AuthContextProvider } from "./contexts/AuthContext";
import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";
import roomReducer from "./contexts/reducer/roomReducer";
import { composeWithDevTools } from "@redux-devtools/extension";

const rootReducer = combineReducers({
  roomReducer: roomReducer,
});

const store = createStore(rootReducer, composeWithDevTools());

ReactDOM.render(
  <ContextProvider>
    <AuthContextProvider>
      <Provider store={store}>
        <App />
      </Provider>
    </AuthContextProvider>
  </ContextProvider>,

  document.getElementById("root")
);
