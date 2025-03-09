import React from "react";
import { createRoot } from "react-dom/client";
import "../src/styles/main.scss";
import  {store}  from "./store/index";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MovieDetail from "./pages/MovieDetail";
import Home from "../src/pages/Home";

const container = document.getElementById("root");

if (container) {
  const root = createRoot(container);

  root.render(
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="movie/:id" element={<MovieDetail />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
} else {
  throw new Error(
    "Root element with ID 'root' was not found in the document. Ensure there is a corresponding HTML element with the ID 'root' in your HTML file."
  );
}
