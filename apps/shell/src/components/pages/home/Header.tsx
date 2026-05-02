import { Menu, Search } from "@superapp/icons";
const Header = () => {
  return (
    <div className="w-full h-16 bg-gray-600 p-4 flex justify-between items-center rounded-tr-md rounded-tl-md">
      <div>
        <Menu className="text-white cursor-pointer" />
      </div>
      <div>
        <Search className="text-white cursor-pointer" />
      </div>
    </div>
  );
};

export default Header;
