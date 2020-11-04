import axios from 'axios';

/**
 * Make an Axios api call
 * @param {string} authToken
 * @param {string} method
 * @param {string} url
 * @param {Object} data
 * @param {Object} params
 */
const api = async (
  authToken: string,
  method: string,
  url: string,
  data?: Record<string, unknown>,
  params?: Record<string, unknown>,
) => {
  try {
    const result = await axios({
      method,
      url,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${authToken}`,
      },
      params: params || undefined,
      data: data || undefined,
    });
    return result.data;
  } catch (error) {
    /**
     * Create a custom error object
     * {
     *  originalError: the original error object,
     *  errorToLog: the error to log, based on what failed (response, request, or a non-axios error)
     *  status: the http status code to log
     *  message: original error message
     * }
     */
    const customError = error;

    if (error.response) {
      customError.originalError = error;
      customError.errorToLog = error.request;
      customError.status = error.request.status;
    } else if (error.request) {
      customError.originalError = error;
      customError.errorToLog = error.response;
      customError.status = error.response.status;
    } else {
      customError.originalError = error;
      customError.errorToLog = error;
    }

    throw customError;
  }
};

export default {
  /**
   * Make a api request
   * @param {string} authToken - authorization token
   * @param {string} url - url to be called
   * @param {Object} data - data object
   * @param {Object} params - params object
   */
  get: (
    authToken: string,
    url: string,
    data?: Record<string, unknown>,
    params?: Record<string, unknown>,
  ): Promise<Record<string, unknown>> => api(authToken, 'GET', url, data, params),
  post: (
    authToken: string,
    url: string,
    data?: Record<string, unknown>,
    params?: Record<string, unknown>,
  ): Promise<Record<string, unknown>> => api(authToken, 'POST', url, data, params),
  put: (
    authToken: string,
    url: string,
    data?: Record<string, unknown>,
    params?: Record<string, unknown>,
  ): Promise<Record<string, unknown>> => api(authToken, 'PUT', url, data, params),
  delete: (
    authToken: string,
    url: string,
    data?: Record<string, unknown>,
    params?: Record<string, unknown>,
  ): Promise<Record<string, unknown>> => api(authToken, 'DELETE', url, data, params),
};
