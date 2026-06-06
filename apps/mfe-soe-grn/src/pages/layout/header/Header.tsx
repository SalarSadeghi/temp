import { ArrowRightAlt } from "@superapp/icons";
import { IconButton } from "@superapp/ui/components";
import { useNavigate } from "react-router-dom";
const Header = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };
  return (
    <div className="w-full h-16 bg-gradient-to-bl  from-[#432b6f] to-[#00807e] p-4 flex items-center rounded-tr-md rounded-tl-md">
      <IconButton onClick={handleGoHome}>
        <ArrowRightAlt fontSize="large" sx={{ color: "white" }} />
      </IconButton>
      <span className="text-white">کارت سبز</span>
    </div>
  );
};

export default Header;
