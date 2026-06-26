import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from '../services/api';

const sliceCreator = (sliceName, endpoint, method = 'get') => {
  const asyncAction = createAsyncThunk(sliceName, async (payload, { rejectWithValue }) => {
    try {
      let url = endpoint;

      if (payload?.urlParams) {
        Object.entries(payload.urlParams).forEach(([key, val]) => {
          url = url.replace(`:${key}`, String(val));
        });
      }

      const queryParams = payload?.params;
      let bodyData;
      if (payload?.data !== undefined) {
        bodyData = payload.data;
      } else if (payload?.urlParams || payload?.params) {
        bodyData = undefined;
      } else {
        bodyData = payload;
      }

      let response;
      if (method === 'get') {
        response = await api.get(url, { params: queryParams ?? (payload?.urlParams ? undefined : payload) });
      } else if (method === 'delete') {
        response = await api.delete(url, { params: queryParams });
      } else {
        response = await api[method](url, bodyData, { params: queryParams });
      }

      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data ?? error.message);
    }
  });

  const slice = createSlice({
    name: sliceName,
    initialState: {
      data: null,
      loading: false,
      error: null,
      success: false,
    },
    reducers: {
      clearData: (state) => {
        state.data = null;
        state.loading = false;
        state.error = null;
        state.success = false;
      },
    },
    extraReducers: (builder) => {
      builder
        .addCase(asyncAction.pending, (state) => {
          state.loading = true;
          state.error = null;
          state.success = false;
        })
        .addCase(asyncAction.fulfilled, (state, action) => {
          state.loading = false;
          state.data = action.payload;
          state.success = true;
        })
        .addCase(asyncAction.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
          state.success = false;
        });
    },
  });

  return {
    asyncAction,
    reducer: slice.reducer,
    clearData: slice.actions.clearData,
  };
};

export default sliceCreator;
