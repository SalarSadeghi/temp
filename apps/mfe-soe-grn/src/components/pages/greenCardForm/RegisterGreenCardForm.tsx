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
import Texts from "@assets/json/Texts.json";
import { CustomeFileUploader } from "@superapp/ui/common";
import { Controller, useForm } from "react-hook-form";
import { useState } from "react";
import { DeleteOutline } from "@superapp/icons";
import { yupResolver } from "@hookform/resolvers/yup";

import {
  CustomDatePicker,
  CustomTimePicker,
} from "@superapp/ui/date-time-picker";
import { GreenCardTypeOptions } from "@type/common";
import { RegisterGreenCardFormSchema } from "@validations/registerGreenCardFormSchema";

interface FormValues {
  unitId: { value: string; label: string };
  placeAdditionalDescription: string;
  greenCardType: { value: string; label: string };
  placeViewDescription: string;
  suggestionDescription: string;
  file: File[];
  time: Date;
  date: Date;
  viewDate: Date;
  id: string;
}
const RegisterGreenCardForm = () => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("sm"));
  const [localFiles, setLocalFiles] = useState<File[]>([]);

  const defaultValues = {
    unitId: null,
    file: null,
    greenCardType: null,
    time: null,
    date: null,
    placeAdditionalDescription: "",
    placeViewDescription: "",
    suggestionDescription: "",
  };
  const {
    handleSubmit,
    control,
    // watch,
    // reset,
    // setValue,
    // formState: { isDirty, dirtyFields },
  } = useForm<FormValues | any>({
    resolver: yupResolver(RegisterGreenCardFormSchema),
    defaultValues,
  });

  const handleAcceptedFiles = (acceptedFiles: File[]) => {
    console.log(acceptedFiles);
    setLocalFiles(acceptedFiles);
  };

  const handleRejectedFiles = (rejections: any[]) => {
    console.log(rejections);
  };

  const onsubmit = async (data: FormValues) => {
    console.log(data);
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
                label={Shared_Text.common.date}
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
                label={Shared_Text.common.time}
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
            {/* {`(${placeAdditionalDescription?.trim()?.length} ${Texts.common.character})`} */}
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
                          // onClick={() => handleDeleteLocalFiles(index)}
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
