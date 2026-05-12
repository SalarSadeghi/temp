import { AccountCircle } from "@superapp/icons";

const SidebarHeader = () => {
  return (
    <div className="w-full text-white flex flex-col">
      <div className="flex gap-2 items-center">
        <AccountCircle fontSize="medium" sx={{ color: "white" }} />
        <span className="text-sm">09217440127</span>
      </div>
    </div>
  );
};

export default SidebarHeader;
