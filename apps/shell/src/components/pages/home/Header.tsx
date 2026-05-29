import { Menu, Search } from "@superapp/icons";
import { useSidebarStore } from "@superapp/shared-store/stores/sidebarStore.js";
import { IconButton } from "@superapp/ui";
const Header = () => {
  const { toggleSidebar } = useSidebarStore();
  const handleToggleSdebar = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    toggleSidebar(true);
  };

  return (
    <div className="w-full h-16 bg-gradient-to-r  from-[#432b6f] to-[#00807e] p-4 flex justify-between items-center rounded-tr-md rounded-tl-md">
      <div>
        <IconButton onClick={handleToggleSdebar}>
          <Menu className="text-white cursor-pointer" />
        </IconButton>
      </div>
      <div>
        <Search className="text-white cursor-pointer" />
      </div>
    </div>
  );
};

export default Header;
