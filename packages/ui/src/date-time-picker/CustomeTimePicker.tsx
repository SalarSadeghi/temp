// 4. CustomDateTimePicker.tsx
import {
  DateTimePickerProps,
  TimePicker,
  TimePickerProps,
} from "@mui/x-date-pickers";
import { CustomLocalizationProvider } from "./CustomLocalizationProvider";

interface CustomTimePickerProps extends TimePickerProps {}

export const CustomTimePicker = ({ ...props }: CustomTimePickerProps) => {
  return (
    <CustomLocalizationProvider>
      <TimePicker
        {...props}
        slotProps={{
          ...props.slotProps,
          field: { clearable: true, ...props.slotProps?.field },
        }}
      />
    </CustomLocalizationProvider>
  );
};
