import { Bell, ChevronRight } from "@superapp/icons/lucide";
import { Avatar, Badge, Button, IconButton, Typography } from "@superapp/ui";
const Header = () => {
  return (
    <div className="flex justify-between items-center">
      <div className="flex gap-4">
        <Avatar
          className=""
          sx={{
            width: 56,
            height: 56,
          }}
        />
        <div className="flex flex-col gap-0">
          <Typography fontWeight={700}>سلام علی جان 👋</Typography>
          <span className="text-xs text-gray-500 font-medium">
            واحد منابع انسانی
          </span>
          <div className="text-xs">
            <Button size="small" variant="text">
              <ChevronRight size={14} />
              <span className="text-xs">مشاهده پروفایل</span>
            </Button>
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
            <Bell size={20} color="black" />
          </Badge>
        </IconButton>
      </div>
    </div>
  );
};

export default Header;
