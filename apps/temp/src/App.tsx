import AppRouter from "@routing/index";
import Layout from "@pages/layout/Layout";
import { AppThemeProvider, CustomConfirmDialog } from "@superapp/ui";

function App() {
  // Run in both shell and MFE

  return (
    <>
      <AppThemeProvider>
        <Layout>
          <AppRouter />
        </Layout>
        {/* <ModalRenderer /> */}
      </AppThemeProvider>
    </>
  );
}

export default App;
