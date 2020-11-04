// https://redux-toolkit.js.org/usage/usage-guide#asynchronous-logic-and-data-fetching
import { Action, Dispatch } from 'redux';

import {
  data1Fetching,
  data1Fetched,
  data1FetchFailed,
  data2Fetching,
  data2Fetched,
  data2FetchFailed,
} from './slice';

import { request1, request2 } from '../services/requests';

// dispatch(fetchData1()) in component
export const fetchData1 = (data: Record<string, unknown>) => async (
  dispatch: Dispatch<Record<string, unknown>>,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getState: Record<string, unknown>,
): Promise<Action> => {
  try {
    dispatch(data1Fetching());
    const result = await request1('JWT', data);
    dispatch(data1Fetched(result));
  } catch (error) {
    dispatch(data1FetchFailed(error));
  }
};

// dispatch(fetchData2()) in component
export const fetchData2 = () => async (
  dispatch: Dispatch<Record<string, unknown>>,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getState: Record<string, unknown>,
): Promise<Action> => {
  const fetchConfigs = [{ function: request2, action: data2Fetched }];

  const promises = fetchConfigs.map(async (config) => {
    try {
      dispatch(data2Fetching());
      const result = await config.function('JWT');
      dispatch(config.action(result));
    } catch (error) {
      dispatch(data2FetchFailed(error));
    }
  });

  await Promise.all(promises);
};
