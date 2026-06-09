import { Bell } from "@superapp/icons/lucide/index.ts";
import { ChevronRight } from "@superapp/icons/mui/index.ts";
import { Avatar, Badge, IconButton, Typography } from "@superapp/ui";
const Header = () => {
  return (
    <div className="flex justify-between items-center">
      <div className="flex gap-4">
        <Avatar
          sx={{
            width: 56,
            height: 56,
          }}
        />
        <div className="flex flex-col gap-1">
          <Typography fontWeight={700}>سلام علی جان 👋</Typography>
          <span className="text-xs text-gray-500">واحد منابع انسانی</span>
          <div className="text-xs text-[#0288d1]">
            <ChevronRight fontSize="small" />
            <span>مشاهده پروفایل</span>
          </div>
        </div>
      </div>
      <div>
        <IconButton size="small">
          <Badge
            color="info"
            badgeContent={3}
            anchorOrigin={{
              horizontal: "left",
            }}
          >
            <Bell size={22} />
          </Badge>
        </IconButton>
      </div>
    </div>
  );
};

export default Header;
