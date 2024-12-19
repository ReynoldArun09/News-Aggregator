import { configureStore } from "@reduxjs/toolkit";
import articlesReducer from "./features/articles-slice";

export const store = configureStore({
  reducer: {
    articles: articlesReducer,
  },
});
