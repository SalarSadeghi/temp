import FeatureHeader from "@components/common/FeatureHeader";
// import { getAccessToken } from "@utils/index";
import { Outlet, useNavigation } from "react-router-dom";

const FeatureLayout = () => {
  // const token = getAccessToken();
  // const accessToken = useAuthStore((state) => state.accessToken);

  // if (!token) {
  //   return <Navigate to="/auth/login" replace />;
  // }
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
