import { DatePicker, DatePickerProps } from "@mui/x-date-pickers";
import { CustomLocalizationProvider } from "./CustomLocalizationProvider";
import { ReactNode } from "react";
import { AppThemeProvider } from "../theme/ThemeProvider";

interface CustomDatePickerProps extends DatePickerProps {
  error?: boolean;
  helperText?: ReactNode;
  placeholder?: string;
  required?: boolean;
  size?: "small" | "medium";
}

export const CustomDatePicker = ({ ...props }: CustomDatePickerProps) => {
  return (
    <AppThemeProvider direction="rtl">
      <div dir="rtl">
        <CustomLocalizationProvider>
          <DatePicker
            {...props}
            slotProps={{
              textField: {
                ...props.slotProps?.textField,
                error: props?.error,
                helperText: props?.helperText,
                required: props?.required,
                size: props?.size,
              },
              toolbar: {
                ...props.slotProps?.toolbar,
                sx: {
                  ...props.slotProps?.toolbar?.sx,
                },
              },
              field: { clearable: true, ...props.slotProps?.field },
              ...props.slotProps,
            }}
          />
        </CustomLocalizationProvider>
      </div>
    </AppThemeProvider>
  );
};
