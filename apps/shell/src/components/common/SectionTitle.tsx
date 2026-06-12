import { Button } from "@superapp/ui";

interface SectionTitleProps {
  title?: string;
  buttonText?: string;
  onButtonClick?: React.MouseEventHandler<HTMLButtonElement>;
  buttonProps?: {
    size?: "small" | "medium" | "large";
    variant?: "text" | "contained" | "outlined";
    color?: "info" | "primary" | "secondary" | "error" | "warning" | "success";
  };
  className?: string;
}
const SectionTitle: React.FC<SectionTitleProps> = ({
  buttonProps = { size: "small", variant: "text", color: "info" },
  buttonText,
  className,
  onButtonClick,
  title,
}) => {
  return (
    <div className={`flex justify-between items-center ${className}`}>
      <span className="font-semibold text-xs">{title}</span>
      <Button
        size={buttonProps.size}
        variant={buttonProps.variant}
        color={buttonProps.color}
        onClick={onButtonClick}
      >
        {buttonText}
      </Button>
    </div>
  );
};

export default SectionTitle;
