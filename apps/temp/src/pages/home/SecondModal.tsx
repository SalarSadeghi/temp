import { useDialogStore } from "@superapp/shared-store";
import { Button, ModalRenderer } from "@superapp/ui";
const ID = "SECOND_MODAL";

const SecondModal = () => {
  const { changeOpen, changeBody, changeTitle } = useDialogStore();
  const handleOpenDialog = () => {
    console.log("handle open called");
    changeOpen(true);
    changeTitle("Title");
    changeBody("This is the main content of dialog In modal");
  };
  return (
    <ModalRenderer modalId={ID}>
      <div>
        This is second modal
        <Button onClick={() => handleOpenDialog()}>Open Dialog</Button>
      </div>
    </ModalRenderer>
  );
};

export default SecondModal;
