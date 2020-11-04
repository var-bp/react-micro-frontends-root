import api from './api';

const url1 = 'https://examples.com/get';
const url2 = 'https://examples.com/post';

export const request1 = async (
  authToken: string,
  params: Record<string, unknown>,
): Promise<Record<string, unknown>> => api.get(authToken, url1, undefined, params);

export const request2 = async (authToken: string): Promise<Record<string, unknown>> =>
  api.post(authToken, url2);
