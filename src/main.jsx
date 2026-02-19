import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthSystem from "./components/AuthSystem";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AuthSystem />} />
      </Routes>
    </BrowserRouter>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
