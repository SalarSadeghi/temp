import {
  type AxiosInstance,
  type InternalAxiosRequestConfig,
  type AxiosError,
} from "axios";

// import {
//   // ACCESS_TOKEN_KEY,
//   // REFRESH_TOKEN_KEY,
//   AUTH_REFRESH_URL,
//   // AUTH_LOGOUT_URL,
//   API_URL,
// } from "./config";
// import {
//   clearTokens,
//   getAccessToken,
//   // getAccessToken,
//   getRefreshToken,
//   setTokens,
// } from "@utils/index";
// import { useAuthStore } from "@store/auth/authStore";

import { refresh } from "@api/auth";
let isRefreshing = false;

let failedQueue: Array<{
  resolve: () => void;
  reject: (error: unknown) => void;
}> = [];

const processQueue = (error?: unknown) => {
  failedQueue.forEach((p) => {
    if (error) p.reject(error);
    else p.resolve();
  });

  failedQueue = [];
};

export function setupInterceptors(instance: AxiosInstance) {
  // ─── Request Interceptor ─────────────────────────────────
  instance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      //   const token = useAuthStore.getState().token;
      // const token = getAccessToken();
      // const token = useAuthStore.getState().accessToken;
      // if (token && config.headers) {
      //   config.headers.Authorization = `Bearer ${token}`;
      // }
      return config;
    },
    (error) => Promise.reject(error)
  );

  // ─── Response Interceptor ────────────────────────────────
  // instance.interceptors.response.use(
  //   (response: AxiosResponse) => response,
  //   async (error: AxiosError) => {
  //     const originalRequest = error.config as InternalAxiosRequestConfig & {
  //       _retry?: boolean;
  //     };

  //     // Only handle 401 and not already retried
  //     if (error.response?.status === 401 && !originalRequest._retry) {
  //       if (originalRequest.url === AUTH_REFRESH_URL) {
  //         // clearTokens();
  //         // useAuthStore.getState().clearAccessToken();
  //         window.location.href = "/auth/login";
  //         return Promise.reject(error);
  //       }

  //       if (isRefreshing) {
  //         // Queue the request while token is being refreshed
  //         return new Promise((resolve, reject) => {
  //           failedQueue.push({ resolve, reject });
  //         })
  //           .then((token) => {
  //             originalRequest.headers.Authorization = `Bearer ${token}`;
  //             return instance(originalRequest);
  //           })
  //           .catch((err) => Promise.reject(err));
  //       }

  //       originalRequest._retry = true;
  //       isRefreshing = true;

  //       try {
  //         // const refreshToken = getRefreshToken();
  //         // if (!refreshToken) {
  //         //   throw new Error("Ooooooooops! No refresh token available");
  //         // }

  //         const { data } = await axios.post(`${API_URL}${AUTH_REFRESH_URL}`);

  //         // const newAccessToken = data.accessToken;
  //         // const newRefreshToken = data.refreshToken;

  //         // setTokens(newAccessToken, newRefreshToken ?? undefined);
  //         processQueue(null, "");

  //         // Retry the original request with new token
  //         // originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
  //         return instance(originalRequest);
  //       } catch (refreshError) {
  //         processQueue(refreshError, null);
  //         // clearTokens();
  //         window.location.href = "/auth/login"; // force logout
  //         return Promise.reject(refreshError);
  //       } finally {
  //         isRefreshing = false;
  //       }
  //     }

  //     return Promise.reject(error);
  //   }
  // );

  // instance.interceptors.response.use(
  //   (response) => response,
  //   async (error: AxiosError) => {
  //     if (!error.config) {
  //       return Promise.reject(error);
  //     }
  //     const originalRequest = error.config as InternalAxiosRequestConfig & {
  //       _retry?: boolean;
  //     };

  //     // If error is not 401 or request has already been retried, reject
  //     if (error.response?.status !== 401 || originalRequest._retry) {
  //       return Promise.reject(error);
  //     }

  //     // If already refreshing, queue the request
  //     if (isRefreshing) {
  //       return new Promise<string>((resolve, reject) => {
  //         failedQueue.push({ resolve, reject });
  //       })
  //         .then(() => {
  //           return instance(originalRequest);
  //         })
  //         .catch((err) => {
  //           return Promise.reject(err);
  //         });
  //     }

  //     originalRequest._retry = true;
  //     isRefreshing = true;

  //     try {
  //       await refresh();

  //       processQueue(null);

  //       return instance(originalRequest);
  //     } catch (refreshError) {
  //       processQueue(refreshError);

  //       if (window.location.pathname !== "/auth/login") {
  //         window.location.href = "/auth/login";
  //       }

  //       return Promise.reject(refreshError);
  //     } finally {
  //       isRefreshing = false;
  //     }
  //   }
  // );

  //   let isRefreshing = false;

  // let failedQueue: Array<{
  //   resolve: () => void;
  //   reject: (error: unknown) => void;
  // }> = [];

  // const processQueue = (error?: unknown) => {
  //   failedQueue.forEach((p) => {
  //     if (error) p.reject(error);
  //     else p.resolve();
  //   });

  //   failedQueue = [];
  // };

  instance.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
      if (!error.config) {
        return Promise.reject(error);
      }

      const originalRequest = error.config as InternalAxiosRequestConfig & {
        _retry?: boolean;
      };

      if (
        error.response?.status !== 401 ||
        originalRequest._retry ||
        originalRequest.url?.includes("/auth/refresh")
      ) {
        return Promise.reject(error);
      }

      if (isRefreshing) {
        return new Promise<void>((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then(() => instance(originalRequest));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        await refresh();
        processQueue();
        return instance(originalRequest);
      } catch (refreshError) {
        processQueue(refreshError);
        window.location.href = "/auth/login";
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }
  );
}
