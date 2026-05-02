import { QuestionMark } from "@superapp/icons";
import { ReactNode } from "react";

interface ServiceBoxProps {
  icon?: ReactNode;
  title?: string;
  boxClassName?: string;
  titleClassName?: string;
}

const ServiceBox = ({
  boxClassName = "",
  titleClassName = "",
  icon = <QuestionMark color="primary" />,
  title = "",
}: ServiceBoxProps) => {
  return (
    <div className="flex flex-col items-center gap-1 justify-center w-16 cursor-pointer">
      <div
        className={`h-14 w-14 rounded-full bg-white flex items-center justify-center ${boxClassName}`}
      >
        {icon}
      </div>
      <div
        className={`text-white font-semibold text-xs break-words ${titleClassName}`}
      >
        {title}
      </div>
    </div>
  );
};

export default ServiceBox;
