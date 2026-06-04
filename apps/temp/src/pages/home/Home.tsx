import { useTempStore } from "@store/tempStore";
import {
  useAuthStore,
  useModalActions,
  useModalStore,
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
  console.log("temp home called");

  const { user, setUser } = useAuthStore((state) => state);
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

  useEffect(() => {
    // Subscribe directly to the whole state (or a selector)
    const unsub = useModalStore.subscribe(
      (state) => state.stack.length,
      (newLength, prevLength) => {
        console.log(
          `🔄 Stack length changed from ${prevLength} to ${newLength}`,
        );
      },
    );
    return unsub;
  }, []);
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
