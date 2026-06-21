import AppRouter from "@routing/index";
// import { CustomConfirmDialog } from "@superapp/ui";
import { InstallPWABanner } from "@components/common/InstallPWABanner";
import AuthProvider from "@routing/auth/AuthProvider";

function App() {
  // useAuthInit();

  return (
    <>
      <AuthProvider>
        <AppRouter />
      </AuthProvider>
      <InstallPWABanner />
    </>
  );
}

export default App;
