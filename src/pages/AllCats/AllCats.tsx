import Cat from "./components/Cat";

import "./AllCats.css";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

import { Image } from "../../store/ImageSlice";
import { addImages } from "../../store/ImageSlice";

function AllCats() {
  const dispatch = useDispatch();
  const images = useSelector((state: RootState) => state.images.images);

  const [isBottom, setIsBottom] = useState<boolean>(true);

  // Функция для проверки, достигли ли мы низа страницы
  const checkIfBottom = () => {
    const scrollPosition = window.scrollY + window.innerHeight; // Текущая позиция прокрутки + высота окна
    const documentHeight = document.documentElement.scrollHeight; // Общая высота страницы
    if (scrollPosition >= documentHeight - 1) {
      setIsBottom(true);
    }
  };

  useEffect(() => {
    // Добавляем обработчик события прокрутки
    window.addEventListener("scroll", checkIfBottom);

    // Убираем обработчик при размонтировании компонента
    return () => {
      window.removeEventListener("scroll", checkIfBottom);
    };
  }, []);

  useEffect(() => {
    if (isBottom) {
      window.scrollBy(0, 71);
      const headers = {
        "Content-Type": "application/json",
        "x-api-key":
          "live_WMUlasLBp0g0tkkGwiT07cmiqI1vQx85ATQ9PG7QFDVIxr5XURG6cbtwfXlmhjd7",
      };

      const requestOptions = {
        method: "GET",
        headers: headers,
      };

      type ServerItem = {
        breeds: [];
        id: string;
        url: string;
        width: number;
        height: number;
      };

      fetch(
        "https://api.thecatapi.com/v1/images/search?limit=30",
        requestOptions
      )
        .then((response) => response.json())
        .then((result) => {
          const newImages: Image[] = [];
          result.forEach((Item: ServerItem) => {
            newImages.push({ id: uuidv4(), path: Item.url, liked: false });
          });
          dispatch(addImages(newImages));
        })
        .then(() => {
          setIsBottom(false);
        })
        .catch((error) => console.log("error", error));
    }
  }, [dispatch, isBottom]);

  return (
    <>
      <div className="cats">
        {images.map((image) => (
          <Cat cat={image} key={image.id}></Cat>
        ))}
      </div>

      {isBottom ? (
        <div className="more-cats">... загружаем ещё котиков ...</div>
      ) : (
        <></>
      )}
    </>
  );
}

export default AllCats;
