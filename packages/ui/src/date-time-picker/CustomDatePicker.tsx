import { DatePicker, DatePickerProps } from "@mui/x-date-pickers";
import { CustomLocalizationProvider } from "./CustomLocalizationProvider";

interface CustomDatePickerProps extends DatePickerProps {}

export const CustomDatePicker = ({ ...props }: CustomDatePickerProps) => {
  return (
    <CustomLocalizationProvider>
      <DatePicker
        {...props}
        slotProps={{
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
  );
};
