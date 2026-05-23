import { useModalActions } from "@superapp/shared-store";
import { Button, ModalRenderer } from "@superapp/ui";

const ID = "FIRST_MODAL";
const FirstModal = () => {
  const { pushModal } = useModalActions();
  const handleSecondModal = () => {
    pushModal({ id: "SECOND_MODAL" });
  };
  return (
    <ModalRenderer modalId={ID} title="First Modal">
      <div>this is first modal</div>
      <Button onClick={handleSecondModal}>Open Second Modal</Button>
    </ModalRenderer>
  );
};

export default FirstModal;
