import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import "./index.css";

import { Provider } from "react-redux";
import Store from "./redux/Store";

ReactDOM.render(
  <Provider store={Store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById("root")
);
