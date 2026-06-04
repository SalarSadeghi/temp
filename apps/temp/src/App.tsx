import AppRouter from "@routing/index";
import Layout from "@pages/layout/Layout";
import { AppThemeProvider } from "@superapp/ui";
import { useModalStore } from "@superapp/shared-store";
(window as any).remoteStore = useModalStore;
function App() {
  // Run in both shell and MFE

  return (
    <>
      <AppThemeProvider>
        <Layout>
          <AppRouter />
        </Layout>
      </AppThemeProvider>
    </>
  );
}

export default App;
