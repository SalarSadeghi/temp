import {
  ArrowRight,
  //EllipsisVertical
} from "@superapp/icons/lucide";
import { IconButton, useTheme } from "@superapp/ui";
import { useNavigate } from "react-router-dom";

const FeatureHeader = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const handleFeatureHeaderNavigation = () => {
    navigate("/home");
  };

  return (
    <div className="w-full flex p-4 bg-white justify-between items-center shadow-md">
      <div className="flex gap-2 items-center">
        <IconButton onClick={handleFeatureHeaderNavigation} size="small">
          <ArrowRight color={theme.palette.primary.main} />
        </IconButton>
        <span>کارت سبز</span>
      </div>
      {/* <div>
        <IconButton size="small">
          <EllipsisVertical />
        </IconButton>
      </div> */}
    </div>
  );
};

export default FeatureHeader;
