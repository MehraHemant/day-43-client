import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import userService from "../user/userService";

export const login = createAsyncThunk("/login", async (userData, thunkAPI) => {
  try {
    return await userService.login(userData);
  } catch (error) {
    return thunkAPI.rejectWithValue(error);
  }
});

const initialState = {
  user: undefined,
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isSuccess = true;
        state.isLoading = false;
        state.isError = false;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload.response.data.message;
      });
  },
});

export default authSlice.reducer;
