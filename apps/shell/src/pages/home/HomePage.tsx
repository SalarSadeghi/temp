// import Footer from "@components/pages/home/Footer";
import FavoriteServices from "@components/pages/home/favoriteServices/FavoriteServices";
import Header from "@components/pages/home/header/Header";
import QuickActionList from "@components/pages/home/quickActions/QuickActionList";
import RecentActivityList from "@components/pages/home/recentActivities/RecentActivityList";
// import HomeSearch from "@components/pages/home/search/HomeSearch";

const HomePage = () => {
  return (
    <>
      <div className="flex flex-col p-4 gap-6">
        <Header />
        {/* <HomeSearch /> */}
        {/* <FavoriteServices /> */}
        {/* <RecentActivityList /> */}
        <QuickActionList />
      </div>
    </>
  );
};

export default HomePage;
