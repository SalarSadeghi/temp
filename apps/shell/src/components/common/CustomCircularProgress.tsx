import {
  Box,
  CircularProgress,
  CircularProgressProps,
  Typography,
} from "@superapp/ui";
import React from "react";

interface CircularProgressWithLabelProps extends CircularProgressProps {
  label?: string;
}

const CustomCircularProgress = React.forwardRef<
  HTMLDivElement,
  CircularProgressWithLabelProps
>(function CircularProgressWithLabel(props, ref) {
  const {
    label,
    size = 30,
    thickness = 4,
    variant = "indeterminate",
    value = 0,
    color = "primary",
    ...rest
  } = props;

  const labelFontSize = (size as number) * 0.22;

  return (
    <Box
      ref={ref}
      role="progressbar"
      aria-valuenow={variant === "determinate" ? value : undefined}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={label ? `${label} complete` : "loading progress"}
      sx={{
        position: "relative",
        display: "inline-flex",
        width: size,
        height: size,
      }}
      {...rest}
    >
      {/* Background track (optional, for visual effect) */}
      <CircularProgress
        variant="determinate"
        value={100}
        size={size}
        thickness={thickness}
        sx={{
          color: "action.disabledBackground", // use theme token
          position: "absolute",
          left: 0,
        }}
      />

      {/* Foreground progress */}
      <CircularProgress
        variant={variant}
        value={value}
        size={size}
        thickness={thickness}
        color={color}
        sx={{
          // Override rotation so it starts from top
          "& .MuiCircularProgress-circle": {
            strokeLinecap: "round",
          },
        }}
      />

      {label && (
        <Box
          sx={{
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            position: "absolute",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography
            variant="caption"
            component="div"
            color="text.secondary"
            aria-hidden // The outer Box already provides the accessible label
            sx={{ fontSize: labelFontSize }}
          >
            {label}
          </Typography>
        </Box>
      )}
    </Box>
  );
});

export default CustomCircularProgress;
