// 4. CustomDateTimePicker.tsx
import { TimePicker, TimePickerProps } from "@mui/x-date-pickers";
import { CustomLocalizationProvider } from "./CustomLocalizationProvider";

interface CustomTimePickerProps extends TimePickerProps {
  error?: boolean;
  helperText?: React.ReactNode;
  placeholder?: string;
  required?: boolean;
  size?: "small" | "medium";
}

export const CustomTimePicker = ({ ...props }: CustomTimePickerProps) => {
  return (
    <CustomLocalizationProvider>
      <TimePicker
        {...props}
        timeSteps={{ minutes: 1, ...props.timeSteps }}
        slotProps={{
          ...props.slotProps,
          textField: {
            ...props.slotProps?.textField,
            error: props?.error,
            helperText: props?.helperText,
            required: props?.required,
            size: props?.size,
          },
          field: { clearable: true, ...props.slotProps?.field },
        }}
      />
    </CustomLocalizationProvider>
  );
};
