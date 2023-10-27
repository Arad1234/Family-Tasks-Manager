import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { router } from "./routes";
import { persistor, store } from "./redux/store";
import "./index.scss";
import { PersistGate } from "redux-persist/integration/react";
import { createClient } from "@supabase/supabase-js";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import {
  VITE_API_KEY,
  VITE_SUPABASE_PROJECT_URL,
} from "./utils/constants/genericConstants";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { StyledEngineProvider } from "@mui/material";

const supabase = createClient(VITE_SUPABASE_PROJECT_URL, VITE_API_KEY);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  // <React.StrictMode>
  <SessionContextProvider supabaseClient={supabase}>
    <Provider store={store}>
      <PersistGate
        loading={null}
        persistor={persistor}
      >
        <ToastContainer
          draggable={false}
          autoClose={3200}
        />
        <StyledEngineProvider injectFirst>
          <RouterProvider router={router} />
        </StyledEngineProvider>
      </PersistGate>
    </Provider>
  </SessionContextProvider>
  // </React.StrictMode>
);
