/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import initialState from './initialState';

export { initialState };

// https://redux-toolkit.js.org/usage/usage-guide#simplifying-slices-with-createslice
const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    data1Fetching(state) {
      state.data1.fetching = true;
    },
    data1Fetched(state, { payload }) {
      state.data1.fetching = false;
      state.data1.dataFetched = true;
      state.data1.data = payload;
      state.data1.error = null;
    },
    data1FetchFailed(state, { payload }) {
      state.data1.fetching = false;
      state.data1.dataFetched = true;
      state.data1.data = null;
      state.data1.error = payload;
    },
    resetData1State(state) {
      state.data1 = initialState.data1;
    },
    data2Fetching(state) {
      state.data2.fetching = true;
    },
    data2Fetched(state, { payload }) {
      state.data2.fetching = false;
      state.data2.dataFetched = true;
      state.data2.data = payload;
      state.data2.error = null;
    },
    data2FetchFailed(state, { payload }) {
      state.data2.fetching = false;
      state.data2.dataFetched = true;
      state.data2.data = null;
      state.data2.error = payload;
    },
    resetData2State(state) {
      state.data2 = initialState.data2;
    },
    resetState() {
      return initialState;
    },
  },
});

export const {
  data1Fetching,
  data1Fetched,
  data1FetchFailed,
  resetData1State,
  data2Fetching,
  data2Fetched,
  data2FetchFailed,
  resetData2State,
  resetState,
} = dataSlice.actions;

export default dataSlice.reducer;
