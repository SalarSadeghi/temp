import { DateTimePicker, DateTimePickerProps } from "@mui/x-date-pickers";
import { CustomLocalizationProvider } from "./CustomLocalizationProvider";
import { AppThemeProvider } from "../theme/ThemeProvider";

interface CustomDateTimePickerProps extends DateTimePickerProps {}
export const CustomDateTimePicker = ({
  ...props
}: CustomDateTimePickerProps) => {
  return (
    <AppThemeProvider direction="rtl">
      <div dir="rtl">
        <CustomLocalizationProvider>
          <DateTimePicker
            {...props}
            slotProps={{
              ...props.slotProps,
              field: { clearable: true, ...props.slotProps?.field },
            }}
          />
        </CustomLocalizationProvider>
      </div>
    </AppThemeProvider>
  );
};
