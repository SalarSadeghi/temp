import CustomBottomNavigation from "@components/common/CustomBottomNavigation";
import { CustomConfirmDialog, CustomSnackbar } from "@superapp/ui";

interface MainLayoutProps {
  children?: React.ReactNode;
}
const MainLayout = (props: MainLayoutProps) => {
  return (
    <>
      <main className="w-full h-screen">
        <div>{props.children}</div>
        <div className="fixed bottom-0 left-0 right-0">
          <CustomBottomNavigation />
        </div>
        <CustomSnackbar />
        <CustomConfirmDialog />
      </main>
    </>
  );
};

export default MainLayout;
