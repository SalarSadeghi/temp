import AppRouter from "@routing/index";
import Layout from "@pages/layout/Layout";
import { AppThemeProvider } from "@superapp/ui";
import { CustomSnackbar } from "@superapp/ui/snackbar";

function App() {
  // Run in both shell and MFE
  return (
    <>
      <AppThemeProvider>
        <Layout>
          <AppRouter />
          <CustomSnackbar
          // {...snackbarProps} may handle this to override per service
          />
        </Layout>
      </AppThemeProvider>
    </>
  );
}

export default App;
