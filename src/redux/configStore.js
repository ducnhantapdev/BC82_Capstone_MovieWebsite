import { configureStore } from "@reduxjs/toolkit";
import movieSeats from "./slice/movieSeats.slice";

export const store = configureStore({
  reducer: {
    hoTen: () => {
      return "Nhan";
    },
    movieSeats,
  },
});
