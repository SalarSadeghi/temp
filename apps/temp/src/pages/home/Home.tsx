import {
  useAuthStore,
  useModalActions,
  useIsModalOpen,
} from "@superapp/shared-store";
import { Button } from "@superapp/ui";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const { user, setUser } = useAuthStore((state) => state);
  useEffect(() => {
    setUser({ name: "foo", family: "bar" });
  }, []);

  const { pushModal } = useModalActions();
  const handleOpenModal = () => {
    const id = pushModal("generic", {
      title: "first modal",

      children: (
        <>
          <Button
            onClick={() =>
              pushModal("generic", {
                title: "second modal",
                children: <>Second modal</>,
                baseModalProps: {
                  maxWidth: "md",
                },
              })
            }
          >
            Open Second Modal
          </Button>
        </>
      ),
    });
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
      <div>
        <Button onClick={handleOpenModal}>Open Modal</Button>
      </div>
    </div>
  );
};

export default Home;
