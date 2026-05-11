import { ArrowRightAlt } from "@superapp/icons";
import { IconButton } from "@superapp/ui/components";
import { useNavigate } from "react-router-dom";
const Header = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };
  return (
    <div className="w-full h-16 bg-gradient-to-bl  from-[#9945FF] to-[#14F195] p-4 flex items-center rounded-tr-md rounded-tl-md">
      <IconButton onClick={handleGoHome}>
        <ArrowRightAlt fontSize="large" sx={{ color: "white" }} />
      </IconButton>
      <span className="text-white">کارت سبز</span>
    </div>
  );
};

export default Header;
