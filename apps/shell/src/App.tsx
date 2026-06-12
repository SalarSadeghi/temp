import AppRouter from "@routing/index";
// import { CustomConfirmDialog } from "@superapp/ui";
import { InstallPWABanner } from "@components/common/InstallPWABanner";

function App() {
  return (
    <>
      <AppRouter />
      <InstallPWABanner />
    </>
  );
}

export default App;
