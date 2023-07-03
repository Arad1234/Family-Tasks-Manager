import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { router } from "./routes";
import { persistor, store } from "./store/store";
import "./index.scss";
import axios from "axios";
import { PersistGate } from "redux-persist/integration/react";

axios.defaults.withCredentials = true;

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate
        loading={null}
        persistor={persistor}
      >
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
