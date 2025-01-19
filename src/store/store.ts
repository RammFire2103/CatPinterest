import { configureStore } from "@reduxjs/toolkit";
import imageReducer from "./ImageSlice";

// Создаем store и подключаем слайс
const store = configureStore({
  reducer: {
    images: imageReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>; // Тип для состояния
export type AppDispatch = typeof store.dispatch; // Тип для dispatch

export default store;
