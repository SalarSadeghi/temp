// import Footer from "@components/pages/home/Footer";
import Header from "@components/pages/home/header/Header";
import QuickActionList from "@components/pages/home/quickActions/QuickActionList";
import HomeSearch from "@components/pages/home/search/HomeSearch";

const HomePage = () => {
  return (
    <>
      <div className="flex flex-col p-4 gap-4">
        <Header />
        <HomeSearch />
        {/* RecentActivity */}
        <QuickActionList />

        {/* ServiceCategory */}
      </div>
    </>
  );
};

export default HomePage;
