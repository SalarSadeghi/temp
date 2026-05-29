import { DateTimePicker, DateTimePickerProps } from "@mui/x-date-pickers";
import { CustomLocalizationProvider } from "./CustomLocalizationProvider";

interface CustomDateTimePickerProps extends DateTimePickerProps {}
export const CustomDateTimePicker = ({
  ...props
}: CustomDateTimePickerProps) => {
  return (
    <CustomLocalizationProvider>
      <DateTimePicker
        {...props}
        slotProps={{
          ...props.slotProps,
          field: { clearable: true, ...props.slotProps?.field },
        }}
      />
    </CustomLocalizationProvider>
  );
};
