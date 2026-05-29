import { useModalActions } from "@superapp/shared-store";
import { Button, ModalRenderer } from "@superapp/ui";
import {
  CustomDatePicker,
  CustomDateTimePicker,
  CustomTimePicker,
} from "@superapp/ui/date-time-picker";

const ID = "FIRST_MODAL";
const FirstModal = () => {
  const { pushModal } = useModalActions();
  const handleSecondModal = () => {
    pushModal({ id: "SECOND_MODAL" });
  };
  return (
    <ModalRenderer modalId={ID} title="First Modal">
      <div>this is first modal</div>
      <div className="">
        <CustomDatePicker />
      </div>
      <div>
        <CustomTimePicker />
      </div>
      <div>
        <CustomDateTimePicker />
      </div>
      <Button onClick={handleSecondModal}>Open Second Modal</Button>
    </ModalRenderer>
  );
};

export default FirstModal;
