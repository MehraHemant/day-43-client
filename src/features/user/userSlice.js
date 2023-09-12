import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import userService from "./userService";

export const create_user = createAsyncThunk(
  "/create_user",
  async (userData, thunkAPI) => {
    try {
      return await userService.create_user(userData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const reset_link = createAsyncThunk(
  "/reset_link",
  async (userData, thunkAPI) => {
    try {
      return await userService.reset_link(userData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const reset_password = createAsyncThunk(
  "/reset_password",
  async (userData, thunkAPI) => {
    try {
      return await userService.reset_password(userData);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const initialState = {
  user: undefined,
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {}  ,
  extraReducers: (builder) => {
    builder
      .addCase(create_user.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(create_user.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isLoading = false;
        state.isError = false;
        state.user = action.payload;
      })
      .addCase(create_user.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload.response.data.message;
      })
      .addCase(reset_link.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(reset_link.fulfilled, (state) => {
        state.isSuccess = true;
        state.isLoading = false;
        state.isError = false;
      })
      .addCase(reset_link.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload.response.data.message;
      })
      .addCase(reset_password.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(reset_password.fulfilled, (state) => {
        state.isSuccess = true;
        state.isLoading = false;
        state.isError = false;
      })
      .addCase(reset_password.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload.response.data.message;
      });
  },
});

export default userSlice.reducer;
