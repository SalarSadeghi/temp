import AppRouter from "@routing/index";
// import { CustomConfirmDialog } from "@superapp/ui";
import { InstallPWABanner } from "@components/common/InstallPWABanner";
// import { useAuthInit } from "@hooks/useAuthInit";

function App() {
  // useAuthInit();

  return (
    <>
      <AppRouter />
      <InstallPWABanner />
    </>
  );
}

export default App;
