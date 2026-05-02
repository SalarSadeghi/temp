import Banner from "@components/pages/home/Banner";
import Footer from "@components/pages/home/Footer";
import Header from "@components/pages/home/Header";
import MainContent from "@components/pages/home/MainContent";

const HomePage = () => {
  return (
    <div className="w-full relative">
      <div className="flex flex-col h-screen">
        <Header />
        <div className="flex flex-col h-full flex-grow bg-gray-800 p-4 relative gap-4">
          <Banner />
          <MainContent />
        </div>
      </div>
      <div className="w-[85%] rounded-3xl left-0 right-0 mx-auto flex justify-center items-center h-16 bg-gray-500 absolute bottom-4 p-4">
        <Footer />
      </div>
    </div>
  );
};

export default HomePage;
