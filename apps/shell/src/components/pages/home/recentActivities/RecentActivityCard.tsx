import IconBox, { IconBoxProps } from "@components/common/IconBox";

interface RecentActivityCardProps extends IconBoxProps {
  title?: string;
  subtitle?: string;
  time?: string;
}
const RecentActivityCard = ({
  icon,
  subtitle,
  time,
  title,
  iconBoxBg,
  iconBoxSX,
}: RecentActivityCardProps) => {
  return (
    <div className="flex p-1 bg-white shadow-lg justify-between items-center h-14 rounded-2xl border-primary">
      <div className="flex items-center gap-2">
        <IconBox iconBoxBg={iconBoxBg} icon={icon} iconBoxSX={iconBoxSX} />
        <div className="flex flex-col">
          <span className="text-xs font-medium">{title}</span>
          <span className="text-xs text-disabled">{subtitle}</span>
        </div>
      </div>
      <div className="flex gap-2">
        <span className="w-2 h-2 bg-primary rounded-full"></span>
        <span className="text-xs text-disabled">{time}</span>
      </div>
    </div>
  );
};

export default RecentActivityCard;
