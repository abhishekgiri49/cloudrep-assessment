import {
  createSlice,
  createAsyncThunk,
  createSelector,
} from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import AuthenticatedCall from "@/src/apiService/AuthenticatedCall";
import { RootState } from "../store";

interface AuthState {
  user: any | null;
  loading: boolean;
  error: string | null;
  lastFetchAttempt: number | null; // Add timestamp tracking
}

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
  lastFetchAttempt: null,
};

// Track ongoing requests to prevent duplicates
let isFetching = false;

export const fetchUser = createAsyncThunk(
  "auth/fetchUser",
  async (_: any, { rejectWithValue }) => {
    // Prevent multiple concurrent requests
    if (isFetching) {
      return rejectWithValue("Request already in progress");
    }

    const token = Cookies.get("token");
    if (!token) return rejectWithValue("No token");

    isFetching = true;
    try {
      const res = await AuthenticatedCall({
        method: "GET",
        url: "/users/profile",
      });
      return res.data;
    } catch (err: any) {
      return rejectWithValue(
        err.response?.data?.message || "Failed to fetch user"
      );
    } finally {
      isFetching = false;
    }
  },
  {
    // Optional: Add condition to prevent frequent retries
    condition: (_, { getState }: any) => {
      const { auth } = getState();
      // Don't run if already loading or recent attempt
      if (
        auth.loading ||
        (auth.lastFetchAttempt && Date.now() - auth.lastFetchAttempt < 5000)
      ) {
        return false;
      }
      return true;
    },
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
      state.error = null;
      Cookies.remove("token");
    },
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.lastFetchAttempt = Date.now();
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        // Optionally clear user if token is invalid
        if (
          action.payload === "No token" ||
          action.payload.includes("authentic")
        ) {
          state.user = null;
          Cookies.remove("token");
        }
      });
  },
});

export const { logout, clearError } = authSlice.actions;
export const selectUser = (state: RootState) => state.auth.user;
export const selectUserPermissions = (state: RootState) =>
  state.auth.user?.permissions;

export const selectAuthLoading = (state: RootState) => state.auth.loading;
export default authSlice.reducer;
