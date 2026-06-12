import { Box, SxProps, Theme } from "@superapp/ui";

export interface IconBoxProps {
  iconBoxSX?: SxProps<Theme>;
  icon?: React.ReactNode;
  iconBoxBg?: string;
}
const IconBox = ({ icon, iconBoxBg, iconBoxSX }: IconBoxProps) => {
  return (
    <Box
      sx={{
        width: 48,
        height: 48,
        borderRadius: 1,
        background: iconBoxBg,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        ...iconBoxSX,
      }}
    >
      {icon}
    </Box>
  );
};

export default IconBox;
