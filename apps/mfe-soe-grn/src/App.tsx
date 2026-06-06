import AppRouter from "@routing/index";
import Layout from "@pages/layout/Layout";
import { AppThemeProvider, CustomConfirmDialog } from "@superapp/ui";
import { CustomSnackbar } from "@superapp/ui/snackbar";

function App() {
  // Run in both shell and MFE
  return (
    <>
      <AppThemeProvider>
        <Layout>
          <AppRouter />
          {import.meta.env.DEV && <CustomSnackbar />}
          {import.meta.env.DEV && <CustomConfirmDialog />}
        </Layout>
      </AppThemeProvider>
    </>
  );
}

export default App;
