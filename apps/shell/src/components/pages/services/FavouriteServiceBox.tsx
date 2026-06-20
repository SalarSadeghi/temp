import IconBox, { IconBoxProps } from "@components/common/IconBox";
import { Star } from "@superapp/icons/lucide";
import { IconButton } from "@superapp/ui";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface FavouriteServiceBoxProps extends IconBoxProps {
  title?: string;
  subtitle?: string;
  href?: string;
}

const FavouriteServiceBox = (props: FavouriteServiceBoxProps) => {
  const [favourte, setFavourite] = useState<boolean>(false);
  const navigate = useNavigate();
  const handleNavigation = (item: FavouriteServiceBoxProps) => {
    if (item.href) navigate(item.href, {});
  };
  const handleStartClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setFavourite((prev) => !prev);
  };
  return (
    <div
      onClick={() => handleNavigation(props)}
      className="flex gap-2 items-center relative bg-white p-2 rounded-md shadow-md w-[160px] h-16"
    >
      <div>
        <IconBox
          icon={props.icon}
          iconBoxBg={props.iconBoxBg}
          iconBoxSX={{
            width: 30,
            height: 30,
          }}
        />
      </div>
      <div className="flex flex-col gap-1">
        <span className="text-xs font-medium">{props.title}</span>
        <span className="text-disabled text-[10px]">{props.subtitle}</span>
      </div>
      <div className="flex absolute left-1 top-1 h-full items-start justify-end">
        <IconButton onClick={handleStartClick} size="small">
          <Star
            fill={favourte ? "gold" : "#eee"}
            color={favourte ? "gold" : undefined}
            strokeWidth={favourte ? 3 : 1}
            size={14}
          />
        </IconButton>
      </div>
    </div>
  );
};

export default FavouriteServiceBox;
