import { LogOut } from "@superapp/icons/lucide";
import { Button, useTheme } from "@superapp/ui";
import Texts from "@assets/json/Texts.json";
const ProfileLogout = () => {
  const theme = useTheme();
  return (
    <div className="flex bg-white shadow-md rounded-lg  justify-center items-center">
      <Button
        size="large"
        color="error"
        variant="text"
        startIcon={<LogOut size={20} color={theme.palette.error.main} />}
      >
        <span className="text-xs font-semibold"> {Texts.common.logout}</span>
      </Button>
    </div>
  );
};

export default ProfileLogout;
