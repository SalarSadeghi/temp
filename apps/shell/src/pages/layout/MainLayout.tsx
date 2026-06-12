import CustomBottomNavigation from "@components/common/CustomBottomNavigation";
import { getAccessToken } from "@utils/index";
import { Navigate, Outlet, useNavigation } from "react-router-dom";

const MainLayout = () => {
  const token = getAccessToken();
  if (!token) {
    return <Navigate to="/auth/login" replace />;
  }
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";
  return (
    <>
      <main className="w-full h-screen flex flex-col">
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
