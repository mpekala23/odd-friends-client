import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Wrapper from "./layout/Wrapper";
import Home from "./views/Home";
import { Toaster } from "react-hot-toast";
import Lobby from "./views/Lobby";
import AnswerView from "./views/Answer";
import Bet from "./views/Bet";
import GuessView from "./views/Guess";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/lobby",
    element: <Lobby />,
  },
  {
    path: "/answer",
    element: <AnswerView />,
  },
  {
    path: "/guess",
    element: <GuessView />,
  },
  {
    path: "/bet",
    element: <Bet />,
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Wrapper>
      <RouterProvider router={router} />
    </Wrapper>
    <Toaster />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
