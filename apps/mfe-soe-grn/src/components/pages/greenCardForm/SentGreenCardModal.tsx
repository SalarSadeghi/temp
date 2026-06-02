import { useGreenCardStore } from "@store/greenCardStore";
import {
  Chip,
  ModalRenderer,
  Shared_Text,
  useMediaQuery,
  useTheme,
} from "@superapp/ui";
import { useSearchParams } from "react-router-dom";
import Texts from "@assets/json/Texts.json";
import { CalendarMonthOutlined } from "@superapp/icons";

export const SentGreenCardModalID = "SentGreenCardModalID";
const SentGreenCardModal = () => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("sm"));
  const [_searchParam, setSearchParam] = useSearchParams();
  const { sent } = useGreenCardStore();

  return (
    <ModalRenderer
      onClose={() => {
        setSearchParam();
      }}
      modalId={SentGreenCardModalID}
      title={Texts.greenCardForm.greenCard}
    >
      <div className="p-4 border-solid border-2 rounded-md border-[#f57c00] relative flex flex-col gap-4">
        {/* <div className="absolute w-16 h-16 mx-auto left-0 right-0 top-[-32px] border-[#f57c00] border-2 border-solid z-10 rounded-full bg-white">
          <Avatar
            style={{ objectFit: "cover", border: "1px solid lightblue" }}
            src={sent?.avatar ?? ""}
            sx={{
              width: 60,
              height: 60,
              objectFit: "cover",
            }}
          >
          </Avatar>
        </div> */}
        <div
          className={`absolute ${isDesktop ? "left-4 top-4" : "left-2 top-2"} flex items-center gap-1`}
        >
          <span className={`text-[#0288d1] ${isDesktop ? "" : "text-xs"}`}>
            {/* {formatJalaliNumeric(sent?.createDate)} */}
            {sent?.createDate}
          </span>
          <CalendarMonthOutlined
            fontSize={isDesktop ? "medium" : "small"}
            color="info"
          />
        </div>
        {sent?.greenCardStatus ? (
          <div className="flex justify-center mt-8">
            <Chip
              className="!text-white"
              color="primary"
              label={sent?.greenCardStatus}
              size="small"
            />
          </div>
        ) : null}
        <div
          className={`flex ${isDesktop ? "flex-row items-center gap-4" : "flex-col gap-2"} mt-8`}
        >
          <span className="text-sm">{Shared_Text.common.committee}:</span>
          <span className="text-gray-400 font-thin text-xs">
            {sent?.commiteeTitle} {sent?.commiteeCode}
          </span>
        </div>
        <div
          className={`flex ${isDesktop ? "flex-row items-center gap-4" : "flex-col gap-2"}`}
        >
          <span className="text-sm">
            {Texts.greenCardForm.placeViewDescription}:
          </span>
          <span className="text-gray-400 font-thin text-xs">
            {sent?.greenCardSubject ?? "-"}
          </span>
        </div>
        <div
          className={`flex ${isDesktop ? "flex-row items-center gap-4" : "flex-col gap-2"}`}
        >
          <span className="text-sm">
            {Texts.greenCardForm.placeAdditionalDescription}:
          </span>

          <span className="text-gray-400 font-thin text-xs">
            {sent?.greenCardNamOrganization ?? "-"}
          </span>
        </div>
        <div
          className={`flex ${isDesktop ? "flex-row items-center gap-4" : "flex-col gap-2"}`}
        >
          <span className="text-sm">{Texts.greenCardForm.greenCardType}:</span>

          <span className="text-gray-400 font-thin text-xs">
            {/* {Texts.pages.greenCardForm.greenCardTypeOptions[
                                `${sent?.greenCardType}` as GreenCardType
                            ] ?? '-'} */}
            {sent?.greenCardType ?? "-"}
          </span>
        </div>
        <div
          className={`flex ${isDesktop ? "flex-row items-center gap-4" : "flex-col gap-2"}`}
        >
          <span className="text-sm">
            {Texts.greenCardForm.suggestionDescription}:
          </span>

          <span className="text-gray-400 font-thin text-xs">
            {sent?.greenCardTxtCorrectiveAct ?? "-"}
          </span>
        </div>
      </div>
    </ModalRenderer>
  );
};

export default SentGreenCardModal;
