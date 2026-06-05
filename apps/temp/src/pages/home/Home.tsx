import { useTempStore } from "@store/tempStore";
import {
  useAuthStore,
  useDialogStore,
  useModalActions,
  // useModalStore,
  // useIsModalOpen,
} from "@superapp/shared-store";
import { Button } from "@superapp/ui";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import FirstModal from "./FirstModal";
import SecondModal from "./SecondModal";
import {
  CustomDatePicker,
  CustomDateTimePicker,
  CustomTimePicker,
} from "@superapp/ui/date-time-picker";
const Home = () => {
  const { user, setUser } = useAuthStore((state) => state);
  const { changeOpen, changeBody, changeTitle } = useDialogStore();
  const { temp } = useTempStore();
  useEffect(() => {
    setUser({ name: "foo", family: "bar" });
  }, []);

  const { pushModal } = useModalActions();
  const handleOpenModal = () => {
    pushModal({
      id: "FIRST_MODAL",
    });
  };

  const handleOpenDialog = () => {
    changeOpen(true);
    changeTitle("Title");
    changeBody("This is the main content of dialog");
  };

  return (
    <div className="flex flex-col h-screen justify-center items-center gap-4">
      <p>USER NAME IS: {user?.name ?? "-"}</p>
      <Link relative="path" to={"./"}>
        Home
      </Link>
      <Link relative="path" to={"./about"}>
        About
      </Link>
      <div>This is local store: {temp}</div>
      <div>
        <Button onClick={handleOpenModal}>Open Modal</Button>
      </div>
      <div>
        <Button onClick={() => handleOpenDialog()}>Open Dialog</Button>
      </div>
      <div className="">
        <CustomDatePicker />
      </div>
      <div>
        <CustomTimePicker />
      </div>
      <div>
        <CustomDateTimePicker />
      </div>
      <FirstModal />
      <SecondModal />
    </div>
  );
};

export default Home;
