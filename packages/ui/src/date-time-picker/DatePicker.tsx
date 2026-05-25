import { MobileDatePicker as MuiDatePicker, MobileDatePickerProps } from '@mui/x-date-pickers';
import { forwardRef } from 'react';
import { CustomLocalizationProvider } from './CustomLocalizationProvider.js';
import { IDateTimePickerBaseProps } from './_types.js';


interface IProps extends MobileDatePickerProps<Date>, IDateTimePickerBaseProps {
}

export const DatePicker = forwardRef<HTMLDivElement, IProps>(
    (props, ref) => {

        return (
            <CustomLocalizationProvider language={props.language} calendar={props.calendar}>
                <MuiDatePicker
                    ref={ref}
                    {...props}
                    closeOnSelect
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
                    views={props.views ?? ['year', 'month', 'day']}
                    openTo={props.openTo ?? 'year'}
                />
            </CustomLocalizationProvider>
        );
    });
DatePicker.displayName = 'DatePicker';