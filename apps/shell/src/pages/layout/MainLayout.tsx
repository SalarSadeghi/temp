import CustomBottomNavigation from "@components/common/CustomBottomNavigation";
import { useMediaQuery, useTheme } from "@superapp/ui";
import { getAccessToken } from "@utils/index";
import { Navigate, Outlet, useNavigation } from "react-router-dom";

const MainLayout = () => {
  const token = getAccessToken();
  if (!token) {
    return <Navigate to="/auth/login" replace />;
  }
  const theme = useTheme();
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";
  const isDesktop = useMediaQuery(theme.breakpoints.up("sm"));
  return (
    <>
      <main
        className={`${isDesktop ? "items-center" : "w-full"} h-screen flex flex-col`}
      >
        {isLoading && <>لطفا منتظر بمانید.</>}

        <div className="flex-1 overflow-y-auto">
          <Outlet />
        </div>
        <div>
          <CustomBottomNavigation />
        </div>
      </main>
    </>
  );
};

export default MainLayout;
