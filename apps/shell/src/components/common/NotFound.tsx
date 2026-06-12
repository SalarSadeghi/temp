import { Button } from "@superapp/ui";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();
  const handleExitNotFoundPage = () => {
    navigate("/");
  };
  return (
    <div className="flex flex-1 h-full w-full gap-4 flex-col justify-center items-center">
      <span> تو یه جای مخفی رو پیدا کردی!</span>
      <Button onClick={handleExitNotFoundPage} variant="text">
        بزن بریم
      </Button>
    </div>
  );
};

export default NotFound;
