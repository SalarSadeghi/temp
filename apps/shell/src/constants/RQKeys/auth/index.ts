export const AuthKeys = {
  login: (phone?: string) => ["auth", "login", phone],
  verify: (code?: string) => ["auth", "verify", code],
};
