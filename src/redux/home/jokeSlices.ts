import {createSlice} from '@reduxjs/toolkit';
import {
  fetchCategoriesThunk,
  fetchSingleJokeThunk,
  fetchMultipleJokesThunk,
} from './jokeThunks';
import {JokesCategoryResponse, JokesResponse} from './jokeEntity';
import {ErrorResponse} from '../../utils/errorResponse';

interface JokeState {
  categories: string[] | null;
  joke: JokesResponse | null;
  jokes: JokesResponse | null;
  loading: boolean;
  error: ErrorResponse | null;
}

const initialState: JokeState = {
  categories: null,
  joke: null,
  jokes: null,
  loading: false,
  error: null,
};

const jokeSlice = createSlice({
  name: 'jokes',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchCategoriesThunk.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategoriesThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload.categories;
      })
      .addCase(fetchCategoriesThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as ErrorResponse;
      })
      .addCase(fetchSingleJokeThunk.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSingleJokeThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.joke = action.payload as JokesResponse;
      })
      .addCase(fetchSingleJokeThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as ErrorResponse;
      })
      .addCase(fetchMultipleJokesThunk.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMultipleJokesThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.jokes = action.payload as JokesResponse;
      })
      .addCase(fetchMultipleJokesThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as ErrorResponse;
      });
  },
});

export default jokeSlice.reducer;
