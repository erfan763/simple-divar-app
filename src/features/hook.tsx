import { useDispatch } from "react-redux";
import { AppDispatch, useAppSelector } from "../store";

export function useAuthState() {
  return useAppSelector((s) => s.user?.status);
}

export const useUser = () => {
  return useAppSelector((state) => state.user?.user);
};
export const useTheme = () => {
  return useAppSelector((state) => state.user?.themeMode);
};

export const useAppDispatch = () => useDispatch<AppDispatch>();
