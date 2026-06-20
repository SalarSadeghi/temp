import IconBox, { IconBoxProps } from "./IconBox";
import { Card, CardActionArea, SxProps, Theme, Typography } from "@superapp/ui";

interface ServiceBoxProps extends IconBoxProps {
  serviceBoxSX?: SxProps<Theme>;
  title?: string;
  titleSX?: SxProps<Theme>;
  onClick?: () => void;
}

const ServiceBox: React.FC<ServiceBoxProps> = ({
  icon,
  serviceBoxSX,
  iconBoxBg,
  iconBoxSX,
  title,
  titleSX,
  onClick,
}: ServiceBoxProps) => {
  const handleActionAreaClick = () => {
    if (onClick) onClick();
  };
  
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
      <CardActionArea
        onClick={handleActionAreaClick}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 1,
          flexShrink: 0,
        }}
      >
        <IconBox icon={icon} iconBoxBg={iconBoxBg} iconBoxSX={iconBoxSX} />
        <Typography sx={{ fontSize: 10, fontWeight: 600, ...titleSX }}>
          {title}
        </Typography>
      </CardActionArea>
    </Card>
  );
};

export default ServiceBox;
