import AppRouter from "@routing/index";
import { CustomConfirmDialog } from "@superapp/ui";
import { useModalStore } from "@superapp/shared-store";

function App() {
  // Run in both shell and MFE
  (window as any).hostStore = useModalStore;
  return (
    <>
      <AppRouter />
      <CustomConfirmDialog />
    </>
  );
}

export default App;
