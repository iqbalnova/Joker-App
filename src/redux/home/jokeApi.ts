import {JokesCategoryResponse, JokesResponse} from './jokeEntity';
import axiosInstance from '../../api/axiosInstance';
import {handleApiError} from '../../utils/apiErrorHandler';
import {ErrorResponse} from '../../utils/errorResponse';

// Fetch Categories
export const fetchCategories = async (): Promise<
  JokesCategoryResponse | ErrorResponse
> => {
  try {
    const response =
      await axiosInstance.get<JokesCategoryResponse>('/categories');

    if (response.status !== 200 && response.status !== 201) {
      return {
        status: response.status,
        message: 'Unexpected response status',
      };
    }

    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

// Fetch Single Joke
export const fetchSingleJoke = async (
  category: string,
): Promise<JokesResponse | ErrorResponse> => {
  try {
    const response = await axiosInstance.get<JokesResponse>(
      `/joke/${category}`,
      {
        params: {type: 'single', amount: 1},
      },
    );

    if (response.status !== 200 && response.status !== 201) {
      return {
        status: response.status,
        message: 'Unexpected response status',
      };
    }

    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

// Fetch Multiple Jokes
export const fetchMultipleJokes = async (
  category: string,
  amount: number = 2,
): Promise<JokesResponse | ErrorResponse> => {
  try {
    const response = await axiosInstance.get<JokesResponse>(
      `/joke/${category}`,
      {
        params: {type: 'single', amount},
      },
    );

    if (response.status !== 200 && response.status !== 201) {
      return {
        status: response.status,
        message: 'Unexpected response status',
      };
    }

    return response.data;
  } catch (error) {
    return handleApiError(error);
  }
};

const jokeApi = {
  fetchCategories,
  fetchSingleJoke,
  fetchMultipleJokes,
};

export default jokeApi;
