import { useAuthStore } from "@superapp/shared-store";
import { Link } from "react-router-dom";

const Home = () => {
  const { user } = useAuthStore((state) => state);
  return (
    <div className="flex flex-col h-screen justify-center items-center gap-4">
      <p>USER NAME IS: {user?.name ?? "-"}</p>
      <Link relative="path" to={"./"}>
        Home
      </Link>
      <Link relative="path" to={"./about"}>
        About
      </Link>
    </div>
  );
};

export default Home;
