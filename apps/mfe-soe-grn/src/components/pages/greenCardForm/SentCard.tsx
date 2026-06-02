import { AccessTimeOutlined, CalendarMonthOutlined } from "@superapp/icons";
import { getTimeFromTimestamp } from "@superapp/shared-utils";
import { useMediaQuery, useTheme } from "@superapp/ui";
import { GreenCardSentResponseDTO } from "@type/response";

interface SentCardProps {
  sent: GreenCardSentResponseDTO;
}
const SentCard = ({ sent }: SentCardProps) => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("sm"));
  return (
    <>
      <div
        className={`flex min-h-[93px] max-h-[93px] relative items-center ${isDesktop ? "p-4" : "p-2"} shadow-md border border-blue-300 border-solid rounded-lg ${isDesktop ? "w-[90%]" : "w-[90%]"} self-center hover:bg-slate-50`}
      >
        {/* <div className={`${isDesktop ? '' : ''}`}>
                    <Avatar
                        style={{ objectFit: 'cover', border: '1px solid lightblue' }}
                        src={sent?.avatar ?? ''}
                        sx={{ width: 40, height: 40 }}>
                        {!sent.avatar && sent?.personelNameFamily.trim()[0]}
                    </Avatar>
                </div> */}
        <div className={`flex flex-col ${isDesktop ? "px-2" : "px-2"}`}>
          <div className="flex max-w-[100px]">
            <span className="font-bold text-sm text-gray-400 truncate">
              {/* {isDesktop ? draft.title.slice(0, 80) : draft.title.slice(0, 20)} ... */}
              {sent.commiteeTitle ?? sent.personelNameFamily ?? "-"}
            </span>
          </div>
          <div className="flex max-w-[100px]">
            <span className="font-normal text-sm text-gray-400 truncate">
              {sent.commiteeCode || "-"}
            </span>
          </div>
        </div>
        <div
          className={`flex flex-col grow items-end ${isDesktop ? "gap-2" : "gap-2"}`}
        >
          <div className={`flex gap-2 items-center`}>
            <span className="text-gray-400 text-sm">
              {getTimeFromTimestamp(sent.createDate)}
            </span>
            <AccessTimeOutlined fontSize={`small`} color="primary" />
          </div>
          <div className={`flex gap-2 items-center`}>
            <span className="text-gray-400 text-sm">
              {/* {formatJalaliNumeric(sent.createDate)} */}
              {sent.createDate}
            </span>
            <CalendarMonthOutlined fontSize={`small`} color="primary" />
          </div>
        </div>
      </div>
    </>
  );
};

export default SentCard;
