import { MobileDateTimePicker as MuiDateTimePicker, MobileDateTimePickerProps } from '@mui/x-date-pickers';
import { forwardRef } from 'react';
import { CustomLocalizationProvider } from './CustomLocalizationProvider.js';
import { IDateTimePickerBaseProps } from './_types.js';


interface IProps extends MobileDateTimePickerProps<Date>, IDateTimePickerBaseProps {
}

export const DateTimePicker = forwardRef<HTMLDivElement, IProps>(
    (props, ref) => {

        return (
            <CustomLocalizationProvider language={props.language} calendar={props.calendar}>
                <MuiDateTimePicker
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
                    views={props.views ?? ['year', 'month', 'day', 'hours', 'minutes']}
                    openTo={props.openTo ?? 'year'}
                />
            </CustomLocalizationProvider>
        );
    });
DateTimePicker.displayName = 'DateTimePicker';