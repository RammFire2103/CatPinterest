// import { useEffect } from "react";

import "./App.css";
import { Routes, Route, Link, useLocation } from "react-router-dom";

import AllCats from "./pages/AllCats/AllCats";
import Favorites from "./pages/Favorites/Favorites";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getFavoriteFromLocalStorage } from "./store/ImageSlice";

function App() {
  const [isMainPage, changePage] = useState<boolean>(true);
  const dispatch = useDispatch();

  const location = useLocation();

  useEffect(() => {
    dispatch(
      getFavoriteFromLocalStorage(
        JSON.parse(localStorage.getItem("cats") || "[]")
      )
    );
  }, []);

  useEffect(() => {
    if (location.pathname === "/") {
      changePage(true);
    } else {
      changePage(false);
    }
  }, [location]);

  return (
    <>
      <header>
        <ul className="navigation">
          <li>
            <button
              className={
                isMainPage
                  ? "button navigation__button navigation__button_active-page"
                  : "button navigation__button"
              }
            >
              <Link to="/">Все котики</Link>
            </button>
          </li>
          <li>
            <button
              className={
                isMainPage
                  ? "button navigation__button"
                  : "button navigation__button navigation__button_active-page"
              }
            >
              <Link to="/favorite">
                <p>Любимые котики</p>
              </Link>
            </button>
          </li>
        </ul>
      </header>
      <Routes>
        <Route path="/" element={<AllCats />} />
        <Route path="/favorite" element={<Favorites />} />
      </Routes>
    </>
  );
}

export default App;
