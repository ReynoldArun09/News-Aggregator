import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchGuardianApiArticles,
  fetchNewYorkApiArticles,
  fetchNewsApiArticles,
} from "../api";

const initialState = {
  isLoading: false,
  error: null,
  articles: [],
  filteredArticles: [],
};

export const fetchArticles = createAsyncThunk(
  "articles/fetchArticles",
  async ({ filters, sources }, { rejectWithValue }) => {
    try {
      const articlesPromises = sources.map((source) => {
        switch (source) {
          case "newsapi":
            return fetchNewsApiArticles(filters);
          case "guardianapi":
            return fetchGuardianApiArticles(filters);
          case "newyorkapi":
            return fetchNewYorkApiArticles(filters);
          default:
            return Promise.resolve([]);
        }
      });
      const results = await Promise.all(articlesPromises);
      return results.flat();
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const articlesSlice = createSlice({
  name: "articles",
  initialState,
  reducers: {
    setFilteredArticles: (state, action) => {
      state.filteredArticles = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticles.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchArticles.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = null;
        state.articles = action.payload;
      })
      .addCase(fetchArticles.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action?.payload?.message || "Failed to fetch articles";
      });
  },
});

export const { setFilteredArticles } = articlesSlice.actions;
export default articlesSlice.reducer;
