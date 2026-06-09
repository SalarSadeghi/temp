import MainLayout from "@pages/layout/MainLayout";
import AppRouter from "@routing/index";
// import { CustomConfirmDialog } from "@superapp/ui";

function App() {
  return (
    <>
      <MainLayout>
        <AppRouter />
      </MainLayout>
    </>
  );
}

export default App;
