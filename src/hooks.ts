import type { TypedUseSelectorHook } from "react-redux";
import { useDispatch, useSelector, useStore } from "react-redux";
import type { AppDispatch, AppStore, RootState } from "./redux/store";

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppStore: () => AppStore = useStore;

import { useMediaQuery } from "react-responsive";

const useResponsive = () => {
  const isMobile = useMediaQuery({ minWidth: 320, maxWidth: 640 });
  const isSM = useMediaQuery({ minWidth: 640, maxWidth: 767 });
  const isTablet = useMediaQuery({ minWidth: 767 });
  const isWideTablet = useMediaQuery({ minWidth: 930 });
  const isDesktop = useMediaQuery({ minWidth: 1025 });

  return { isMobile, isTablet, isDesktop, isSM, isWideTablet };
};

export default useResponsive;
