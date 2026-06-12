import { CustomSearchComponent } from "@superapp/ui";

const HomeSearch = () => {
  return (
    <div className="bg-white shadow-md rounded-lg">
      <CustomSearchComponent
        value=""
        onChange={() => {}}
        placeholder="جستجو در سرویس‌ها..."
        sx={{}}
      />
    </div>
  );
};

export default HomeSearch;
