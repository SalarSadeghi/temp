import { SlidersHorizontal } from "@superapp/icons/lucide";
import { useTheme } from "@superapp/ui";

const ServicesTitle = () => {
  const theme = useTheme();
  return (
    <div className="flex justify-between items-center">
      <div>
        <span className="font-medium">همه سرویس‌ها</span>
      </div>
      <div>
        <div className="flex gap-2 items-center bg-white p-2 rounded-lg">
          <span className="text-xs">مرتب سازی</span>
          <SlidersHorizontal color={theme.palette.primary.main} size={20} />
        </div>
      </div>
    </div>
  );
};

export default ServicesTitle;
