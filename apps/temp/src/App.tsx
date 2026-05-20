import AppRouter from "@routing/index";
import Layout from "@pages/layout/Layout";
import { AppThemeProvider, ModalRenderer } from "@superapp/ui";

function App() {
  return (
    <>
      <AppThemeProvider>
        <Layout>
          <AppRouter />
        </Layout>
        <ModalRenderer />
      </AppThemeProvider>
    </>
  );
}

export default App;
