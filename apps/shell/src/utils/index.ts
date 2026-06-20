export const getAccessToken = (): string | null =>
  localStorage.getItem("accessToken");
export const getRefreshToken = (): string | null =>
  localStorage.getItem("refreshToken");
export const setTokens = (access: string, refresh?: string) => {
  localStorage.setItem("accessToken", access);
  if (refresh) localStorage.setItem("refreshToken", refresh);
};
export const clearTokens = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
};

type ErrorItem = string | Record<string, string[]>;
type ErrorList = ErrorItem[];
export function extractErrors(errors: ErrorList): string[] {
  if (!Array.isArray(errors)) {
    return [];
  }

  return errors.flatMap((error) => {
    if (typeof error === "string") {
      return [error];
    }
    if (typeof error === "object" && error !== null) {
      return Object.values(error).flat();
    }
    return [];
  });
}
