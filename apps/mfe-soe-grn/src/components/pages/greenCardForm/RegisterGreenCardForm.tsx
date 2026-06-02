import {
  Chip,
  CustomButton,
  CustomComboBox,
  CustomTextInput,
  IconButton,
  Shared_Text,
  useMediaQuery,
  useTheme,
} from "@superapp/ui";
import { useSnackbar, CustomSnackbar } from "@superapp/ui/snackbar";
import Texts from "@assets/json/Texts.json";
import { CustomeFileUploader } from "@superapp/ui/common";
import { Controller, useForm, useWatch } from "react-hook-form";
import { useState } from "react";
import { DeleteOutline } from "@superapp/icons";
import { yupResolver } from "@hookform/resolvers/yup";

import {
  CustomDatePicker,
  CustomTimePicker,
} from "@superapp/ui/date-time-picker";
import { GreenCardTypeOption, GreenCardTypeOptions } from "@type/common";
import { RegisterGreenCardFormSchema } from "@validations/registerGreenCardFormSchema";
import { Unit } from "@superapp/shared-types/unit";
import { useGreenCardStore } from "@store/greenCardStore";
import { combineDateTimeFields } from "@superapp/shared-utils";
import { GreenCardDraftResponseDTO } from "@type/response";
import { useModalActions } from "@superapp/shared-store";
import { useDialogStore } from "@superapp/shared-store/stores/dialogStore.js";
import { useMutation } from "@tanstack/react-query";
import { createGRN } from "@api/grnApi";

interface FormValues {
  unitId: Unit;
  placeAdditionalDescription: string;
  greenCardType: GreenCardTypeOption[];
  placeViewDescription: string;
  suggestionDescription: string;
  file: File[];
  time: Date;
  date: Date;
}

type Mode = "edit" | "add" | null;
const formDataMapper = (
  data: FormValues | GreenCardDraftResponseDTO | any,
  mode: Mode = "add"
) => {
  if (mode === "add") {
    return {
      unitId: data.unitId.value,
      placeViewDescription: data.placeViewDescription,
      greenCardType: data.greenCardType.value,
      viewDate: data.viewDate,
      placeAdditionalDescription: data.placeAdditionalDescription,
      ...(data.suggestionDescription && {
        suggestionDescription: data.suggestionDescription,
      }),
      ...(data.file && data.file.length > 0 && { file: data.file[0] }),
    };
  }
  if (mode === "edit") {
    return {
      ...(data.id && { id: data.id }),
      ...(data.unitId && { unitId: data.unitId.value }),
      ...(data.placeViewDescription && {
        placeViewDescription: data.placeViewDescription,
      }),
      ...(data.greenCardType && { greenCardType: data.greenCardType?.value }),
      ...(data.placeAdditionalDescription && {
        placeAdditionalDescription: data.placeAdditionalDescription,
      }),
      ...(data.viewDate && { viewDate: data.viewDate }),
      ...(data.suggestionDescription && {
        suggestionDescription: data.suggestionDescription,
      }),
      ...(data.file && data.file.length > 0 && { file: data.file[0] }),
      ...(data.deletedFileId &&
        data.deletedFileId.length > 0 && { deletedFileId: data.deletedFileId }),
    };
  }
};

const DefaultValues = {
  unitId: undefined,
  file: [],
  greenCardType: undefined,
  time: undefined,
  date: undefined,
  placeAdditionalDescription: "",
  placeViewDescription: "",
  suggestionDescription: "",
};
const RegisterGreenCardForm = () => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("sm"));
  const [localFiles, setLocalFiles] = useState<File[]>([]);
  const [deletedFileId, setDeletedFileId] = useState<string[]>([]);
  const { mode, draft, changeMode, setDraft } = useGreenCardStore();
  const { showSnackbar } = useSnackbar();
  const {
    changeOpen: changeDialogOpen,
    changeTitle: changeDialogTitle,
    changeBody: changeDialogText,
    changeOnOk: changeDialogOnOk,
    changeHasCancelBtn: changeDialogHasCancelBtn,
  } = useDialogStore();
  // const placeAdditionalDescription = useWatch({
  //   name: "placeAdditionalDescription",
  // });

  const {
    handleSubmit,
    control,
    // watch,
    reset,
    setValue,
    // formState: { isDirty, dirtyFields },
  } = useForm<FormValues | any>({
    // resolver: yupResolver(RegisterGreenCardFormSchema),
    defaultValues: DefaultValues,
  });

  const handleAcceptedFiles = (acceptedFiles: File[]) => {
    setLocalFiles(acceptedFiles);
  };

  const handleRejectedFiles = (rejections: any[]) => {
    console.log(rejections);
  };

  const handleDeleteLocalFiles = (index: number) => {
    setLocalFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  const { mutate, isPending } = useMutation({
    mutationFn: createGRN,
    onSuccess: async () => {
      reset();
      changeMode("add");
      setDraft(null);
      setLocalFiles([]);
      showSnackbar({
        message: Shared_Text.common.successOperationMsg,
        severity: "success",
      });
      changeDialogTitle(Shared_Text.common.successOperationMsg);
      changeDialogText(
        <div className="flex flex-col gap-8">
          {/* <SuccessAnimation /> */}
          <span className={`${isDesktop ? "text-base" : "text-sm"}`}>
            {Texts.greenCardForm.successPostGreenCardMSG}
          </span>
        </div>
      );
      changeDialogOpen(true);
      changeDialogHasCancelBtn(false);
    },
  });

  const onsubmit = async (data: FormValues) => {
    const formData: FormData = new FormData();
    if (mode === "add") {
      const viewDate = combineDateTimeFields({
        time: data.time,
        date: data.date,
      });
      const dataToSend = formDataMapper({ ...data, viewDate }, "add");
      Object.entries(dataToSend).forEach(([key, value]) => {
        formData.append(key, value as any);
      });
      localFiles.forEach((f) => formData.append("file", f));
      changeDialogOpen(true);
      changeDialogOnOk(() => mutate(formData));
      changeDialogTitle(Texts.greenCardForm.registerTitle);
      changeDialogText(Texts.greenCardForm.confirmModalRegeisterText);
    } else if (mode === "edit") {
      const viewDate = combineDateTimeFields({
        time: data.time,
        date: data.date,
      });
      const dataToSend = formDataMapper(
        {
          ...data,
          viewDate,
          id: draft?.id,
          deletedFileId,
        },
        mode
      );
      Object.entries(dataToSend).forEach(([key, value]) => {
        formData.append(key, value as any);
      });
      localFiles.forEach((f) => formData.append("file", f));
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onsubmit)}
      className="flex flex-col w-full gap-4"
    >
      <div
        className={`flex ${isDesktop ? "flex-row" : "flex-col"} w-full gap-4`}
      >
        <div className={` ${isDesktop ? "w-1/2" : "w-full"}`}>
          <CustomComboBox
            label={Texts.greenCardForm.unitCode}
            control={control}
            name="unitId"
            // options={novanUnitsData?.map((u) => ({
            //   value: u.code,
            //   label: u.fullName,
            // }))}
          />
        </div>
        <div className={` ${isDesktop ? "w-1/2" : "w-full"}`}>
          <Controller
            control={control}
            name="date"
            render={({ field, fieldState }) => (
              <CustomDatePicker
                className="w-full"
                {...field}
                label={Texts.greenCardForm.seenDate}
                disableFuture
                helperText={fieldState?.error?.message}
                error={!!fieldState.error}
              />
            )}
          />
        </div>
      </div>
      <div
        className={`flex ${isDesktop ? "flex-row" : "flex-col"} w-full gap-4`}
      >
        <div className={` ${isDesktop ? "w-1/2" : "w-full"}`}>
          <Controller
            control={control}
            name="time"
            render={({ field, fieldState }) => (
              <CustomTimePicker
                className="w-full"
                {...field}
                label={Texts.greenCardForm.seenTime}
                disableFuture
                error={!!fieldState.error}
                helperText={fieldState?.error?.message}
              />
            )}
          />
        </div>
        <div className={` ${isDesktop ? "w-1/2" : "w-full"}`}>
          <CustomTextInput
            label={Texts.greenCardForm.placeAdditionalDescription}
            name="placeAdditionalDescription"
            control={control}
          />
          <span className="text-xs text-gray-500 px-4">
            {Texts.greenCardForm.placeAdditionalDescriptionHelpMSG}{" "}
            {/* {`(${placeAdditionalDescription?.trim()?.length} ${Shared_Text.common.character})`} */}
          </span>
        </div>
      </div>
      <div
        className={`flex ${isDesktop ? "flex-row" : "flex-col"} w-full gap-4`}
      >
        <div className={` ${isDesktop ? "w-1/2" : "w-full"}`}>
          <CustomComboBox
            label={Texts.greenCardForm.greenCardType}
            control={control}
            name="greenCardType"
            options={GreenCardTypeOptions}
          />
        </div>
        <div className={` ${isDesktop ? "w-1/2" : "w-full"}`} />
      </div>
      <div
        className={`flex ${isDesktop ? "flex-row" : "flex-col"} w-full gap-4`}
      >
        <div className="flex w-full flex-col gap-2">
          <CustomTextInput
            multiline
            rows={3}
            label={Texts.greenCardForm.placeViewDescription}
            control={control}
            name="placeViewDescription"
          />
          <span className="text-xs text-gray-500 px-4">
            {Texts.greenCardForm.placeViewDescriptionHelpMSG}{" "}
            {/* {`(${placeViewDescription?.trim()?.length} ${Shared_Text.common.})`} */}
          </span>
        </div>
      </div>
      <div
        className={`flex ${isDesktop ? "flex-row" : "flex-col"} w-full gap-3`}
      >
        <div className="flex w-full flex-col gap-2">
          <CustomTextInput
            name="suggestionDescription"
            control={control}
            label={Texts.greenCardForm.suggestionDescription}
            multiline
            rows={3}
          />
          <span className="text-xs text-gray-500 px-4">
            {Texts.greenCardForm.suggestionDescriptionHelpMSG}{" "}
            {/* {`(${suggestionDescription?.trim()?.length} ${Texts.common.character})`} */}
          </span>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <CustomeFileUploader
          onFilesAccepted={handleAcceptedFiles}
          onFilesRejected={handleRejectedFiles}
          maxFiles={1}
          required={true}
        />
        <div>
          <ul className="gap-2 flex flex-col">
            {localFiles?.map((file, index) => (
              <li
                key={index}
                className="flex items-center"
                style={{ color: theme.palette.primary.contrastText }}
              >
                <div className="flex gap-2 items-center">
                  {/* <FilePresentOutlined sx={{ color: 'gray' }} /> */}
                  <Chip
                    sx={{
                      "& .MuiChip-label": {
                        display: "flex",
                        overflow: "hidden",
                      },
                      maxWidth: "100%",
                    }}
                    icon={
                      <>
                        <IconButton
                          color="error"
                          onClick={() => handleDeleteLocalFiles(index)}
                        >
                          <DeleteOutline />
                        </IconButton>
                      </>
                    }
                    label={
                      <div
                        className={`flex gap-1 ${isDesktop ? "max-w-[700px]" : "max-w-[200px]"}`}
                      >
                        <span className="truncate">{file.name}</span>
                        <span className="whitespace-nowrap">
                          (
                          <b>
                            {(file.size / 1024 / 1024).toFixed(2)}
                            MB
                          </b>
                          )
                        </span>
                      </div>
                    }
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="flex justify-end w-full py-4 gap-4">
        <CustomButton
          // onClick={() => saveAsDraft()}
          type="button"
          // disabled={isLoading || isLoadingDraft}
          // isLoading={isLoadingDraft}
          color="primary"
          variant="contained"
          label={Texts.greenCardForm.saveAsDraft}
        />
        <CustomButton
          // disabled={isLoading}
          // isLoading={isLoading}
          color="success"
          variant="contained"
          label={Shared_Text.common.saveAndSend}
          type="submit"
        />
      </div>
    </form>
  );
};

export default RegisterGreenCardForm;
