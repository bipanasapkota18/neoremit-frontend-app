import App from "@neo/pages/App";
import React from "react";
import ReactDOM from "react-dom/client";
import Provider from "./providers";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider>
      <App />
    </Provider>
  </React.StrictMode>
);
