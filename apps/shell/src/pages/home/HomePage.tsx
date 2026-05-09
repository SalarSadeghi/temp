import Banner from "@components/pages/home/Banner";
import Footer from "@components/pages/home/Footer";
import Header from "@components/pages/home/Header";
import MainContent from "@components/pages/home/MainContent";

const HomePage = () => {
  return (
    <div
      className={`w-full h-[100dvh] flex justify-between flex-col overflow-hidden`}
    >
      <div className="flex flex-col ">
        <Header />
        <div className="flex flex-col h-full flex-grow  p-4  gap-4">
          <Banner />
          <MainContent />
        </div>
      </div>
      <div className="w-[85%] rounded-3xl fixed bottom-0 left-0 right-0 mb-4 mx-auto flex h-16 bg-gradient-to-br  from-[#9945FF] to-[#14F195] px-4">
        <Footer />
      </div>
    </div>
  );
};

export default HomePage;
