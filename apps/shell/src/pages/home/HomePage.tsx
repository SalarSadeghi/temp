import Banner from "@components/pages/home/Banner";
import Footer from "@components/pages/home/Footer";
import Header from "@components/pages/home/Header";
import MainContent from "@components/pages/home/MainContent";
import { useSidebarStore } from "@superapp/shared-store/stores/sidebarStore.js";
import Sidebar from "./sidebar/Sidebar";

const HomePage = () => {
  const { isSidebarOpen, toggleSidebar } = useSidebarStore();
  return (
    <>
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-10 transition-opacity duration-300"
          onClick={() => toggleSidebar(false)}
        ></div>
      )}
      <div
        className={`w-full h-[100dvh] flex justify-between flex-col overflow-hidden`}
      >
        <div className="flex flex-col">
          <Header />
          <div className="flex flex-col h-full flex-grow p-4 gap-4">
            <Banner />
            <MainContent />
          </div>
        </div>
        <div className="w-[85%] rounded-3xl fixed bottom-0 left-0 right-0 mb-4 mx-auto flex h-16 bg-gradient-to-br from-[#9945FF] to-[#14F195] px-4">
          <Footer />
        </div>
      </div>
      <Sidebar />
    </>
  );
};

export default HomePage;
