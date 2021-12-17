import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { userApi } from "../services";

const initialState = {
  data: [],
  status: "loading",
  error: null,
  page: 1,
  per_page: 5,
  total: 0,
  total_pages: 0,
};

export const fetchUser = createAsyncThunk("user/fetchUser", async () => {
  const response = await userApi.get(1, 5);
  return response;
});

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateAfterPagination: (state, action) => {
      const { data, page, per_page, total_pages, total } = action.payload;
      state.data = data;
      state.page = page;
      state.per_page = per_page;
      state.total_pages = total_pages;
      state.total = total;
      state.status = "succeeded";
    },
    toggleLoader: (state, action) => {
      state.status = action.payload ? "loading" : "succeeded";
    },
  },
  extraReducers(builder) {
    builder
      .addCase(fetchUser.pending, (state, action) => {
        state.status = "loading";
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        const { data, page, per_page, total_pages, total } = action.payload;
        state.status = "succeeded";
        state.data = data;
        state.page = page;
        state.per_page = per_page;
        state.total_pages = total_pages;
        state.total = total;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const userList = (state) => state.user.data;

export const showLoader = (state) => state.user.status === "loading";

export const userListPageDetail = (state) => {
  return {
    page: state.user.page,
    per_page: state.user.per_page,
    total: state.user.total,
    total_pages: state.user.total_pages,
  };
};

export const { updateAfterPagination, toggleLoader } = userSlice.actions;

export default userSlice.reducer;
