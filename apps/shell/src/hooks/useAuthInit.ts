import { refresh } from "@api/auth";
import { useAuthStore } from "@store/auth/authStore";
import { getRefreshToken } from "@utils/index";
import { useEffect } from "react";

export const useAuthInit = () => {
  const refreshToken = getRefreshToken();
  const { setAccessToken } = useAuthStore((state) => ({
    setAccessToken: state.setAccessToken,
    accessToken: state.accessToken,
  }));
  const location = window.location.pathname;

  const init = async () => {
    try {
      await refresh();
      // setAccessToken(res.data?.accessToken);
    } catch {
      setAccessToken(undefined);
    }
  };

  useEffect(() => {
    //Only get refresh token after login & when user refresh page
    if (location === "/auth/login") return;

    init();
  }, [refreshToken]);
};
