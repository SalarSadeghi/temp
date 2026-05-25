import {
  MobileTimePicker as MuiTimePicker,
  MobileTimePickerProps,
} from "@mui/x-date-pickers";
import { forwardRef } from "react";
import { CustomLocalizationProvider } from "./CustomLocalizationProvider.js";
import { IDateTimePickerBaseProps } from "./_types.js";

interface IProps
  extends MobileTimePickerProps<Date>,
    IDateTimePickerBaseProps {}

export const TimePicker = forwardRef<HTMLDivElement, IProps>((props, ref) => {
  return (
    <CustomLocalizationProvider
      language={props.language}
      calendar={props.calendar}
    >
      <MuiTimePicker
        ref={ref}
        {...props}
        closeOnSelect={
          props.closeOnSelect !== undefined ? props.closeOnSelect : true
        }
        slotProps={{
          ...props.slotProps,
          textField: {
            ...props.slotProps?.textField,
            error: props.error,
            helperText: props.helperText,
            required: props.required,
            placeholder: props.placeholder,
            size: props.size,
          },
        }}
        openTo={props.openTo ?? "hours"}
      />
    </CustomLocalizationProvider>
  );
});
TimePicker.displayName = "TimePicker";
