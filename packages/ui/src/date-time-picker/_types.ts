export interface IDateTimePickerBaseProps {
    error?: boolean;
    helperText?: string;
    required?: boolean;
    placeholder?: string;
    size?: 'small' | 'medium';
    language?: 'fa' | 'ar' | 'en';
    calendar?: 'shamsi' | 'qamari' | 'miladi';
}