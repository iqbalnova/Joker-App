import axios from 'axios';
import {ErrorResponse} from './errorResponse';

export const handleApiError = (error: any): ErrorResponse => {
  if (axios.isAxiosError(error)) {
    // Jika ada response dari server
    if (error.response) {
      const {status, data} = error.response;

      return {
        status,
        message: data?.message || `Request failed with status ${status}.`,
      };
    }

    // Jika request dikirim tetapi tidak ada response (server mati atau down)
    if (error.request) {
      return {
        status: 503, // Service Unavailable
        message:
          'No response from server. Please check your network connection.',
      };
    }
  }

  // Jika error dari frontend atau tidak teridentifikasi
  return {
    status: 500, // Internal Server Error
    message: error.message || 'Unexpected error occurred.',
  };
};
