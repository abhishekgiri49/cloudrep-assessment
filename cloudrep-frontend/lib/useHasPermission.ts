// lib/hooks/useHasPermission.ts
import { useSelector } from "react-redux";
import {
  selectUserPermissions,
  selectAuthLoading,
} from "@/lib/slices/authSlice";

type CheckMode = "any" | "all";

export const useHasPermission = (
  required: string[],
  mode: CheckMode = "any"
): { hasPermission: boolean; isLoading: boolean } => {
  const permissions = useSelector(selectUserPermissions);
  const isLoading = useSelector(selectAuthLoading); // ⬅️ add loading state from auth

  let hasPermission = false;

  if (!isLoading && permissions) {
    if (mode === "all") {
      hasPermission = required.every((perm) => permissions.includes(perm));
    } else {
      hasPermission = required.some((perm) => permissions.includes(perm));
    }
  }

  return { hasPermission, isLoading };
};
