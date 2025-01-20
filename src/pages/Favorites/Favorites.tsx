import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  cleareImages,
  getFavoriteFromLocalStorage,
} from "../../store/ImageSlice";
import store, { RootState } from "../../store/store";

import Cat from "../AllCats/components/Cat";

function Favorites() {
  const dispatch = useDispatch();
  const Favorite = useSelector(
    (state: RootState) => state.images.favoriteImages
  );

  useEffect(() => {
    dispatch(
      getFavoriteFromLocalStorage(
        JSON.parse(localStorage.getItem("cats") || "[]")
      )
    );
  }, [dispatch]);

  useEffect(() => {
    localStorage.removeItem("cats");
    localStorage.setItem(
      "cats",
      JSON.stringify(store.getState().images.favoriteImages)
    );
    dispatch(cleareImages());
  }, [dispatch, Favorite]);

  return (
    <>
      <div className="cats">
        {Favorite.map((image) => (
          <Cat cat={image} key={image.id}></Cat>
        ))}
      </div>
    </>
  );
}

export default Favorites;
