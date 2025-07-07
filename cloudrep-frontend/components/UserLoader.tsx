// components/UserLoader.tsx
"use client";
import Cookies from "js-cookie";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "@/lib/slices/authSlice";
import type { RootState } from "@/lib/store";

export default function UserLoader() {
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector(
    (state: RootState) => state.auth
  );

  useEffect(() => {
    // Only fetch if:
    // 1. There's no user data
    // 2. We're not already loading
    // 3. No existing error

    const token = Cookies.get("token");
    if (token && !user && !loading && !error) {
      dispatch(fetchUser());
    }
  }, [user, loading, error, dispatch]);

  return null;
}
