import {
  Box,
  Card,
  CardActionArea,
  // CardContent,
  IconButton,
  SxProps,
  Theme,
  Typography,
} from "@superapp/ui";
import IconBox, { IconBoxProps } from "./IconBox";
import React from "react";
import { ChevronLeft } from "@superapp/icons/lucide";

type ListItemVariant = "default" | "card" | "compactInfo" | "compactAction";

interface BaseListItemProps {
  onClick?: () => void;
  containerSX?: SxProps<Theme>;
  containerClassName?: string;
  children?: React.ReactNode;
}

const BaseListItem = ({
  containerSX,
  containerClassName,
  onClick,
  children,
}: BaseListItemProps) => {
  return (
    <Card
      className={containerClassName}
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
        ...containerSX,
      }}
    >
      {onClick ? (
        <CardActionArea className="w-full h-full" onClick={onClick}>
          {children}
        </CardActionArea>
      ) : (
        children
      )}
    </Card>
  );
};

export interface CustomListItemProps extends IconBoxProps, BaseListItemProps {
  variant?: ListItemVariant;
  // onClick?: () => void;
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  icon?: React.ReactNode;
  href?: string;
  // containerSX?: SxProps<Theme>;
  // containerClassName?: string;
  titleSX?: SxProps<Theme>;
  titleClassName?: string;
  subtitleSX?: SxProps<Theme>;
  subtitleClassName?: string;
  info?: React.ReactNode;
}

const CustomListItem = ({
  variant = "default",
  ...rest
}: CustomListItemProps) => {
  return variant === "default" ? (
    <DefaultListItem {...rest} />
  ) : variant === "compactInfo" ? (
    <CompactInfoListItem {...rest} />
  ) : variant === "compactAction" ? (
    <CompactActionListItem {...rest} />
  ) : null;
};

export default CustomListItem;

const DefaultListItem = ({
  icon,
  iconBoxBg,
  iconBoxSX,
  onClick,
  title,
  containerSX,
  containerClassName,
  titleClassName,
  titleSX,
}: CustomListItemProps) => {
  return (
    <BaseListItem
      containerSX={containerSX}
      containerClassName={containerClassName}
      onClick={onClick}
    >
      <Box
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
        <Typography
          noWrap
          sx={{ fontSize: 10, fontWeight: 600, ...titleSX }}
          className={titleClassName}
        >
          {title}
        </Typography>
      </Box>
    </BaseListItem>
  );
};

const CompactInfoListItem = ({
  icon,
  iconBoxBg,
  iconBoxSX,
  onClick,
  title,
  containerSX,
  containerClassName,
  titleClassName,
  titleSX,
  // href,
  subtitle,
  subtitleClassName,
  subtitleSX,
  info,
}: CustomListItemProps) => {
  return (
    <BaseListItem
      onClick={onClick}
      containerSX={{ height: 56, width: "100%", ...containerSX }}
      containerClassName={containerClassName}
    >
      <div className="flex w-full p-1 justify-between items-center">
        <div className="flex items-center gap-2">
          <IconBox iconBoxBg={iconBoxBg} icon={icon} iconBoxSX={iconBoxSX} />
          <div className="flex flex-col">
            <Typography
              sx={{ fontSize: "12px", fontWeight: 500, ...titleSX }}
              className={`${titleClassName}`}
            >
              {title}
            </Typography>
            <Typography
              sx={{ fontSize: "12px", ...subtitleSX }}
              className={`text-xs text-disabled ${subtitleClassName}`}
            >
              {subtitle}
            </Typography>
          </div>
        </div>
        {info && (
          <div className="flex gap-2">
            <span className="w-2 h-2 bg-primary rounded-full"></span>
            <Typography
              sx={{ fontSize: "12px" }}
              className="text-xs text-disabled"
            >
              {info}
            </Typography>
          </div>
        )}
      </div>
    </BaseListItem>
  );
};

const CompactActionListItem = ({
  icon,
  iconBoxBg,
  iconBoxSX,
  onClick,
  title,
  containerSX,
  containerClassName,
  titleClassName,
  titleSX,
  subtitle,
  subtitleClassName,
  subtitleSX,
}: CustomListItemProps) => {
  return (
    <BaseListItem
      onClick={onClick}
      containerSX={{ height: 56, width: "100%", ...containerSX }}
      containerClassName={containerClassName}
    >
      <div className="flex w-full p-1 justify-between items-center">
        <div className="flex items-center gap-2">
          <IconBox iconBoxBg={iconBoxBg} icon={icon} iconBoxSX={iconBoxSX} />
          <div className="flex flex-col">
            <Typography
              sx={{ fontSize: "12px", fontWeight: 500, ...titleSX }}
              className={`${titleClassName}`}
            >
              {title}
            </Typography>
            <Typography
              sx={{ fontSize: "12px", ...subtitleSX }}
              className={`text-xs text-disabled ${subtitleClassName}`}
            >
              {subtitle}
            </Typography>
          </div>
        </div>
        <IconButton size="small">
          <ChevronLeft size={18} />
        </IconButton>
      </div>
    </BaseListItem>
  );
};
