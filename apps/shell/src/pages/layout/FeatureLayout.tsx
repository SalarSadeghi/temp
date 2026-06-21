import FeatureHeader from "@components/common/FeatureHeader";
import { useAuthStore } from "@store/auth/authStore";
// import { getAccessToken } from "@utils/index";
import { Navigate, Outlet, useNavigation } from "react-router-dom";

const FeatureLayout = () => {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  if (!isAuthenticated) {
    return <Navigate to="/auth/login" replace />;
  }

  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";
  return (
    <>
      <main className="w-full h-screen flex flex-col">
        <FeatureHeader />
        {isLoading && <>لطفا منتظر بمانید.</>}
        <div className="flex-1 overflow-y-auto">
          <Outlet />
        </div>
      </main>
    </>
  );
};

export default FeatureLayout;
