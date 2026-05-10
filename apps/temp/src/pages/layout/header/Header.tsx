import {} from "@superapp/icons";
import { IconButton } from "@superapp/ui/components";
const Header = () => {
  return (
    <div className="w-full h-16 bg-gradient-to-bl  from-[#9945FF] to-[#14F195] p-4 flex justify-between items-center rounded-tr-md rounded-tl-md">
      <IconButton></IconButton>
      <span>کارت سبز</span>
    </div>
  );
};

export default Header;
