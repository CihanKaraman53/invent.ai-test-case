import React, { Suspense, lazy } from "react";
import { createRoot } from "react-dom/client";
import { store } from "./store/index";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Loading from "./components/loader";

const MovieDetail = lazy(() => import("./pages/MovieDetail"));
const Home = lazy(() => import("./pages/Home"));

const container = document.getElementById("root");

if (container) {
  const root = createRoot(container);

  root.render(
    <Provider store={store}>
      <BrowserRouter>
        <Suspense fallback={<Loading/>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="movie/:id" element={<MovieDetail />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </Provider>
  );
} else {
  throw new Error(
    "Root element with ID 'root' was not found in the document. Ensure there is a corresponding HTML element with the ID 'root' in your HTML file."
  );
}
