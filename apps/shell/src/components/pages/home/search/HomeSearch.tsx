import { CustomSearchComponent } from "@superapp/ui";

const HomeSearch = () => {
  return (
    <div className="bg-white">
      <CustomSearchComponent
        value=""
        onChange={() => {}}
        placeholder="جستجو در سرویس‌ها..."
      />
    </div>
  );
};

export default HomeSearch;
