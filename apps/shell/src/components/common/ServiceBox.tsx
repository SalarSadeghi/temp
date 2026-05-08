import { QuestionMark } from "@superapp/icons";
import { ReactNode } from "react";

interface ServiceBoxProps {
  icon?: ReactNode;
  title?: string;
  innerBoxClassName?: string;
  titleClassName?: string;
  outerBoxClassName?: string;
}

const ServiceBox = ({
  innerBoxClassName = "",
  titleClassName = "",
  icon = <QuestionMark color="primary" />,
  title = "",
  outerBoxClassName = "",
}: ServiceBoxProps) => {
  return (
    <div className="flex flex-col items-center gap-1 justify-center  cursor-pointer p-1">
      <div
        className={`bg-gradient-to-br rounded-md  from-[#9945FF] to-[#14F195] p-1 ${outerBoxClassName}`}
      >
        <div
          className={`h-10 w-10 bg-white flex items-center justify-center ${innerBoxClassName}`}
        >
          {icon}
        </div>
      </div>
      <div
        className={`font-semibold text-[10px] break-words ${titleClassName}`}
      >
        {title}
      </div>
    </div>
  );
};

export default ServiceBox;
