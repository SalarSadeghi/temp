import Texts from "@assets/json/Texts.json";
import { RQKeys } from "@constants/queryKeys";
import {
  AccessTimeOutlined,
  CalendarMonthOutlined,
  DeleteOutline,
} from "@superapp/icons";
import { MouseEvent, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteGreenCardDraft } from "@api/grnApi";
import { GreenCardDraftResponseDTO } from "@type/response";
import {
  IconButton,
  Shared_Text,
  useMediaQuery,
  useSnackbar,
  useTheme,
} from "@superapp/ui";
import {
  formatJalaliNumeric,
  getTimeFromTimestamp,
} from "@superapp/shared-utils";

interface DraftCardProps {
  draft: GreenCardDraftResponseDTO;
}
const DraftCard = ({ draft }: DraftCardProps) => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("sm"));
  const [draftToDeleteId, setDeraftToDeleteId] = useState<string>("");
  const { showSnackbar } = useSnackbar();
  const qc = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: () => deleteGreenCardDraft(draft?.id as string),
    onSuccess: () => {
      setDeraftToDeleteId("");
      qc.invalidateQueries({
        queryKey: RQKeys.getGreenCardDrafts()[0] as any,
      });
      showSnackbar({
        message: Shared_Text.common.successOperationMsg,
        severity: "success",
      });
    },
    onError: () => {
      showSnackbar({
        message: Shared_Text.common.errorOperationMsg,
        severity: "error",
      });
    },
  });

  const handleDeleteDraft = async (e: MouseEvent<HTMLButtonElement>) => {
    if (draft.lock) {
      return;
    }
    e.stopPropagation();
    setDeraftToDeleteId(draft.id as string);
    // changeDialogOpen(true);
    // changeDialogTitle(`${Texts.pages.suggestionForm.deleteDraft}`);
    // changeDialogText(Texts.common.deleteItemConfirm);
    // changeDialogOnOk(() => {
    //   mutate();
    // });
  };

  return (
    <>
      <div
        className={`flex min-h-[93px] relative items-center ${isDesktop ? "p-4" : "p-2"} shadow-md border border-blue-300 border-solid rounded-lg ${isDesktop ? "w-[90%]" : "w-[90%]"} self-center hover:bg-slate-50`}
      >
        <div className={`${isDesktop ? "" : ""}`}>
          {/* <Avatar
            style={{ objectFit: "cover", border: "1px solid lightblue" }}
            src={draft?.avatar ?? ""}
            sx={{ width: 40, height: 40 }}
          >
            {!draft.avatar && draft.fullName.trim()[0]}
          </Avatar> */}
        </div>
        <div className={`flex flex-col ${isDesktop ? "px-2" : "px-2"}`}>
          <div className="flex max-w-[100px]">
            <span className="font-bold text-sm text-gray-400 truncate">
              {draft.greenCardTypeTitle ?? "-"}
            </span>
          </div>
          <div className="flex max-w-[100px]">
            <span className="font-normal text-sm text-gray-400 truncate">
              {draft.unit?.name ||
                draft.placeViewDescription ||
                draft.suggestionDescription ||
                "-"}
            </span>
          </div>
        </div>
        <div
          className={`flex flex-col grow items-end ${isDesktop ? "gap-2" : "gap-2"}`}
        >
          <div className={`flex ${isDesktop ? "gap-4" : "gap-2"} items-center`}>
            <span className="text-gray-400 text-sm">
              {getTimeFromTimestamp(draft.updatedAt)}
            </span>
            <AccessTimeOutlined fontSize={`small`} color="primary" />
          </div>
          <div className={`flex ${isDesktop ? "gap-4" : "gap-2"} items-center`}>
            <span className="text-gray-400 text-sm">
              {formatJalaliNumeric(draft.updatedAt)}
            </span>
            <CalendarMonthOutlined fontSize={`small`} color="primary" />
          </div>
        </div>
        <div className="absolute top-[-10px] left-[-15px] bg-[#ebf5f5] rounded-full">
          {isPending && draft.id === draftToDeleteId ? (
            <span>لطفا منتظر بمانید...</span>
          ) : (
            <IconButton
              onClick={(e) => handleDeleteDraft(e)}
              color="error"
              size="small"
            >
              <DeleteOutline />
            </IconButton>
          )}
        </div>
        {draft.lock && (
          <div className="ribbon flex items-center justify-center">
            <span className="text-xs font-light">
              {Texts.greenCardForm.underReview}
            </span>
          </div>
        )}
      </div>
    </>
  );
};

export default DraftCard;
