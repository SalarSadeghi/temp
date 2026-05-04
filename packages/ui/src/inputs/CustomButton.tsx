import { Button, ButtonProps, CircularProgress } from "@mui/material";

interface ICustomButtonProps {
    onClick?: React.MouseEventHandler<HTMLButtonElement>;
    label: string;
    variant?: ButtonProps['variant'];
    color?: ButtonProps['color'];
    type?: ButtonProps['type'];
    size?: ButtonProps['size'];
    icon?: React.ReactNode;
    fullWidth?: boolean;
    isLoading?: boolean;
    disabled?: boolean;
}

export const CustomButton: React.FC<ICustomButtonProps> = ({
    onClick,
    label,
    variant = 'outlined',
    color = 'primary',
    size = undefined,
    // type = 'submit',
    type,
    fullWidth = false,
    icon,
    isLoading = false,
    disabled = false,
}) => (
        <Button
            fullWidth={fullWidth}
            className={variant === 'contained' ? '!text-white' : ''}
            onClick={onClick}
            variant={variant}
            color={color}
            type={type}
            size={size}
            startIcon={isLoading ? <CircularProgress size={15} /> : icon || undefined}
            disabled={isLoading || disabled}>
            {label}
        </Button>
    );


