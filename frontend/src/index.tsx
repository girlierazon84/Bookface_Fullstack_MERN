// frontend/src/index.tsx

import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";


// Find the root container in the HTML document and render the React application into it using React 18's createRoot API.
const container = document.getElementById("root");
if (!container) throw new Error("Root container #root not found");

// Use React 18's createRoot API to enable concurrent features and improved performance.
createRoot(container).render(
  <React.StrictMode>
    <BrowserRouter
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
