import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Тип для одного изображения
export interface Image {
  id: string;
  path: string;
  liked: boolean;
}

// Тип для состояния
interface ImageState {
  images: Image[];
  favoriteImages: Image[];
}

// Начальное состояние
const initialState: ImageState = {
  images: [],
  favoriteImages: [],
};

// Создаем слайс для работы с изображениями
const imageSlice = createSlice({
  name: "images",
  initialState,
  reducers: {
    // Действие для загрузки картинок
    setImages: (state, action: PayloadAction<Image[]>) => {
      state.images = action.payload;
    },

    addImages: (state, action: PayloadAction<Image[]>) => {
      state.images = state.images.concat(action.payload);
    },

    cleareImages: (state) => {
      state.images = state.images.slice(0, 30);
    },

    getFavoriteFromLocalStorage: (state, action: PayloadAction<Image[]>) => {
      state.favoriteImages = action.payload;
    },

    // Действие для изменения состояния лайка
    toggleLike: (state, action: PayloadAction<string>) => {
      const image = state.images.find((img) => img.id === action.payload);
      if (image) {
        image.liked = !image.liked; // Переключаем лайк
        if (image.liked) {
          state.favoriteImages = state.favoriteImages.concat([
            { id: image.id, path: image.path, liked: image.liked },
          ]);
        } else {
          state.favoriteImages = state.favoriteImages.filter(
            (img) => img.id !== image.id
          );
        }
      } else {
        const image = state.favoriteImages.find(
          (img) => img.id === action.payload
        );
        if (image) {
          image.liked = !image.liked; // Переключаем лайк
          if (image.liked) {
            state.favoriteImages = state.favoriteImages.concat([
              { id: image.id, path: image.path, liked: image.liked },
            ]);
          } else {
            state.favoriteImages = state.favoriteImages.filter(
              (img) => img.id !== image.id
            );
          }
        }
      }
    },
  },
});

// Экспортируем действия
export const {
  setImages,
  addImages,
  toggleLike,
  cleareImages,
  getFavoriteFromLocalStorage,
} = imageSlice.actions;

// Экспортируем редьюсер
export default imageSlice.reducer;
