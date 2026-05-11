import AppRouter from "@routing/index";
import Layout from "@pages/layout/Layout";
import { AppThemeProvider } from "@superapp/ui";

function App() {
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
