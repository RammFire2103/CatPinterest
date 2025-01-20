import "./Cat.css";

// import kitty from "../../../assets/image 1.png";
import Heart from "./Heart";
import { Image, toggleLike } from "../../../store/ImageSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { useEffect, useRef } from "react";

function Cat(props: { cat: Image }) {
  const dispatch = useDispatch();
  const img = useRef<HTMLButtonElement | null>(null);

  const isLiked =
    useSelector(
      (state: RootState) =>
        state.images.images.find((img) => img.id === props.cat.id)?.liked ||
        state.images.favoriteImages.find((img) => img.id === props.cat.id)
          ?.liked
    ) || false;

  const favorite = useSelector(
    (state: RootState) => state.images.favoriteImages
  );

  useEffect(() => {
    localStorage.removeItem("cats");
    localStorage.setItem("cats", JSON.stringify(favorite));
  }, [favorite]);

  const handleLike = () => {
    dispatch(toggleLike(props.cat.id));
  };

  return (
    <div
      className="card"
      onMouseOver={() => {
        if (!isLiked) {
          img.current?.classList.remove("hide");
        }
      }}
      onMouseOut={() => {
        if (!isLiked) {
          img.current?.classList.add("hide");
        }
      }}
    >
      <img className="card-image" src={props.cat.path}></img>
      <button
        ref={img}
        className={isLiked ? "like-button" : "like-button hide"}
        onClick={handleLike}
      >
        <Heart isLiked={isLiked} />
      </button>
    </div>
  );
}

export default Cat;
