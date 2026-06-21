import { me } from "@api/auth";
import { useAuthStore } from "@store/auth/authStore";
import { useEffect } from "react";

type Props = {
  children: React.ReactNode;
};

const AuthProvider = ({ children }: Props) => {
  const { setIsAuthenticated, isBootStarpping, setIsBootStrapping } =
    useAuthStore((state) => state);
  const bootstrap = async () => {
    try {
      await me();
      setIsAuthenticated(true);
    } catch {
      setIsAuthenticated(false);
    } finally {
      setIsBootStrapping(false);
    }
  };
  useEffect(() => {
    setIsBootStrapping(true);
    bootstrap();
  }, []);

  if (isBootStarpping) {
    return <div>در حال بوت استرپ...</div>;
  }

  return children;
};

export default AuthProvider;
