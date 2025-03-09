import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

type SearchType = 'movie' | 'series' | 'game';
export interface Movie {
  imdbID: string; 
  Title: string; 
  Year: string; 
  Genre: string;
  Director: string; 
  Actors: string; 
  imdbRating: string; 
  Poster: string; 
  Plot: string;
  Type: SearchType;
}

export interface MovieState {
  searchQuery: string;
  searchType: SearchType;
  selectedYear: string;
  movies: Movie[];
  movieDetail: Movie | null;
  page: number;
  totalPages: number;
  loading: boolean;
  error: string | null;
}

const API_KEY = "e8117fd1";
const BASE_URL = `https://www.omdbapi.com/?apikey=${API_KEY}`;

const initialState: MovieState = {
  searchQuery: "",
  searchType: "movie" ,
  selectedYear: "",
  movies: [],
  movieDetail: null,
  page: 1,
  totalPages: 0,
  loading: false,
  error: null,
};

export const fetchMovies = createAsyncThunk(
  "movies/fetchMovies",
  async (
    {
      searchQuery,
      searchType,
      page,
      selectedYear,
    }: {
      searchQuery: string;
      searchType: string;
      page: number;
      selectedYear: string;
    },
    { rejectWithValue }
  ) => {
    const yearParam = selectedYear ? `&y=${selectedYear}` : "";
    const query = searchQuery || "batman";

    try {
      const response = await axios.get(
        `${BASE_URL}&s=${query}&type=${searchType}&page=${page}${yearParam}`
      );
      const data = response.data;

      if (data.Response === "True") {
        return { movies: data.Search, totalResults: data.totalResults };
      } else {
        return rejectWithValue(data.Error);
      }
    } catch (error) {
      return rejectWithValue("API isteği sırasında bir hata oluştu.");
    }
  }
);

export const fetchMovieDetail = createAsyncThunk(
  "movies/fetchMovieDetail",
  async (id: string, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}&i=${id}`);
      if (response.data.Response === "True") {
        return response.data;
      } else {
        return rejectWithValue(response.data.Error);
      }
    } catch (error) {
      return rejectWithValue("Film detayları alınırken hata oluştu");
    }
  }
);

const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    setSearchQuery(state, action: PayloadAction<string>) {
      state.searchQuery = action.payload;
    },
    setSearchType(state, action: PayloadAction<SearchType>) {
      state.searchType = action.payload;
    },
    setSelectedYear(state, action: PayloadAction<string>) {
      state.selectedYear = action.payload;
    },
    setPage(state, action: PayloadAction<number>) {
      state.page = action.payload;
    },
    setTotalPages(state, action: PayloadAction<number>) {
      state.totalPages = action.payload;
    },
    clearMovieDetail(state) {
      state.movieDetail = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.loading = false;
        state.movies = action.payload.movies;
        state.totalPages = Math.ceil(action.payload.totalResults / 10);
      })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(fetchMovieDetail.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMovieDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.movieDetail = action.payload;
      })
      .addCase(fetchMovieDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const {
  setSearchQuery,
  setSearchType,
  setSelectedYear,
  setPage,
  setTotalPages,
  clearMovieDetail,
} = movieSlice.actions;
export default movieSlice.reducer;
