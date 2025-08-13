import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";  // tem que apontar pro arquivo certo

import "./index.css";  // importa o Tailwind

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
