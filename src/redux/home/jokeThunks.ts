import {createAsyncThunk} from '@reduxjs/toolkit';
import jokeApi from './jokeApi';
import {JokesCategoryResponse, JokesResponse} from './jokeEntity';
import {ErrorResponse} from '../../utils/errorResponse';

// Fetch Categories
export const fetchCategoriesThunk = createAsyncThunk<
  JokesCategoryResponse,
  void,
  {rejectValue: ErrorResponse}
>('jokes/fetchCategories', async (_, {rejectWithValue}) => {
  try {
    const response = await jokeApi.fetchCategories();

    if ('categories' in response) {
      return response as JokesCategoryResponse;
    } else {
      return rejectWithValue(response as ErrorResponse);
    }
  } catch (error) {
    return rejectWithValue({
      status:
        error instanceof Error && 'status' in error
          ? (error.status as number)
          : 500,
      message: error instanceof Error ? error.message : String(error),
    } as ErrorResponse);
  }
});

// Fetch Single Joke
export const fetchSingleJokeThunk = createAsyncThunk<
  JokesResponse,
  string,
  {rejectValue: ErrorResponse}
>('jokes/fetchSingleJoke', async (category, {rejectWithValue}) => {
  try {
    const response = await jokeApi.fetchSingleJoke(category);

    if ('joke' in response || 'jokes' in response) {
      return response as JokesResponse;
    } else {
      return rejectWithValue(response as ErrorResponse);
    }
  } catch (error) {
    return rejectWithValue({
      status:
        error instanceof Error && 'status' in error
          ? (error.status as number)
          : 500,
      message: error instanceof Error ? error.message : String(error),
    } as ErrorResponse);
  }
});

// Fetch Multiple Jokes
export const fetchMultipleJokesThunk = createAsyncThunk<
  JokesResponse,
  {category: string; amount: number},
  {rejectValue: ErrorResponse}
>('jokes/fetchMultipleJokes', async ({category, amount}, {rejectWithValue}) => {
  try {
    const response = await jokeApi.fetchMultipleJokes(category, amount);

    if ('jokes' in response) {
      return response as JokesResponse;
    } else {
      return rejectWithValue(response as ErrorResponse);
    }
  } catch (error) {
    return rejectWithValue({
      status:
        error instanceof Error && 'status' in error
          ? (error.status as number)
          : 500,
      message: error instanceof Error ? error.message : String(error),
    } as ErrorResponse);
  }
});
