import CustomListItem from "@components/common/CustomListItem";
import { IconBoxProps } from "@components/common/IconBox";
import { BriefcaseBusiness, FileText } from "@superapp/icons/lucide";
import { Divider, useTheme } from "@superapp/ui";

interface IDocumentItem extends IconBoxProps {
  title?: string;
  href?: string;
  icon?: React.ReactNode;
}
const ProfileDocuments = () => {
  const theme = useTheme();
  const DocumentsItem: IDocumentItem[] = [
    {
      title: "سوابق شغلی",
      icon: <BriefcaseBusiness size={18} color={theme.palette.success.main} />,
    },
    {
      title: "مدارک و گواهی‌نامه‌ها",
      icon: <FileText size={18} color={theme.palette.success.dark} />,
    },
  ];
  return (
    <div className="p-4 rounded-lg bg-white flex flex-col shadow-md">
      <div className="flex flex-col items-center justify-center gap-1">
        <div className="flex w-full justify-start">
          <span className="text-xs font-semibold">سوابق و مدارک</span>
        </div>
      </div>
      {DocumentsItem?.map((item, i, arr) => (
        <>
          {/* <div className="flex w-full justify-between items-center px-1 mt-1">
            <div className="flex justify-center gap-4 items-center">
              <IconBox
                iconBoxBg={theme.palette.success.light}
                icon={item.icon}
                iconBoxSX={{ width: 28, height: 28 }}
              />
              <span className="text-xs ">{item.title}</span>
            </div>
            <div>
              <IconButton size="small">
                <ChevronLeft size={18} />
              </IconButton>
            </div>
          </div> */}
          <CustomListItem
            onClick={() => {}}
            variant="compactAction"
            containerSX={{ border: "none", p: "0", m: "0", height: "" }}
            iconBoxBg={theme.palette.success.light}
            icon={item.icon}
            iconBoxSX={{ width: 28, height: 28 }}
            title={item.title}
            titleSX={{ fontWeight: "" }}
          />
          {arr.length - 1 !== i && <Divider className="w-full bg-default" />}
        </>
      ))}
    </div>
  );
};

export default ProfileDocuments;
