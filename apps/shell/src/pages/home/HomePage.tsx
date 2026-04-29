import Banner from "@components/pages/home/Banner";
import Footer from "@components/pages/home/Footer";
import Header from "@components/pages/home/Header";
import MainContent from "@components/pages/home/MainContent";

const HomePage = () => {
  return (
    <div className="min-h-screen w-full ">
      <div className="flex flex-col">
        <Header />
        <Banner />
        <MainContent />
        <Footer />
      </div>
    </div>
  );
};

export default HomePage;
