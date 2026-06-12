import IconBox, { IconBoxProps } from "./IconBox";
import { Card, SxProps, Theme, Typography } from "@superapp/ui";

interface ServiceBoxProps extends IconBoxProps {
  serviceBoxSX?: SxProps<Theme>;
  title?: string;
  titleSX?: SxProps<Theme>;
}

const ServiceBox: React.FC<ServiceBoxProps> = ({
  icon,
  serviceBoxSX,
  iconBoxBg,
  iconBoxSX,
  title,
  titleSX,
}: ServiceBoxProps) => {
  return (
    <Card
      sx={{
        width: 96,
        height: 96,
        borderRadius: 2,
        border: "1px solid #E2E8F0",
        boxShadow: "none",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 1,
        flexShrink: 0,
        ...serviceBoxSX,
      }}
    >
      <IconBox icon={icon} iconBoxBg={iconBoxBg} iconBoxSX={iconBoxSX} />
      <Typography sx={{ fontSize: 10, fontWeight: 600, ...titleSX }}>
        {title}
      </Typography>
    </Card>
  );
};

export default ServiceBox;
