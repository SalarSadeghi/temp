import {
  CustomComboBox,
  CustomTextInput,
  Shared_Text,
  useMediaQuery,
  useTheme,
} from "@superapp/ui";
import Texts from "@assets/json/Texts.json";
import { Controller, useForm } from "react-hook-form";
import { DatePicker, TimePicker } from "@superapp/ui/date-time-picker";
interface FormValues {
  unitCode: { value: string; label: string };
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
  const defaultValues = {
    unitCode: null,
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
    watch,
    reset,
    setValue,
    formState: { isDirty, dirtyFields },
  } = useForm<FormValues | any>({
    // resolver: yupResolver(RegisterGreenCardFormSchema),
    defaultValues,
  });

  return (
    <form className="flex flex-col w-full gap-4 overflow-auto">
      <div
        className={`flex ${isDesktop ? "flex-row" : "flex-col"} w-full gap-4`}
      >
        <div className={` ${isDesktop ? "w-1/2" : "w-full"}`}>
          <CustomComboBox
            label={Texts.greenCardForm.unitCode}
            control={control}
            name="unitCode"
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
              <DatePicker
                {...field}
                slotProps={{
                  actionBar: { actions: ["accept", "cancel", "clear"] },
                  toolbar: {
                    sx: { backgroundColor: theme.palette.primary.main },
                  },
                }}
                required
                sx={{ width: "100%" }}
                openTo="day"
                // value={date as unknown as Date}
                label={Shared_Text.common.date}
                // onChange={(value) => setValue('date', value)}
                disableFuture
                error={!!fieldState.error}
                helperText={fieldState?.error?.message} // Optional validation error message
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
              <TimePicker
                {...field}
                name="time"
                required
                label={Texts.greenCardForm.seenTime}
                maxTime={new Date(Date.now())}
                // value={time}
                // onChange={(value) => setValue('time', value)}
                sx={{
                  width: "100%",
                }}
                slotProps={{
                  actionBar: { actions: ["accept", "cancel", "clear"] },
                  toolbar: {
                    sx: {
                      backgroundColor: theme.palette.primary.main,
                      "& .MuiTimePickerToolbar-ampmLabel": {
                        color: "#0f0f0f",
                      },
                      "& .MuiPickersToolbar-root:focus span": {
                        color: "#fff",
                      },
                    },
                  },
                }}
                error={!!fieldState.error}
                helperText={fieldState?.error?.message} // Optional validation error message
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
            // options={GreenCardTypeOptions}
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
            {/* {`(${suggestionDescription?.trim()?.length} ${Shared_Text.common.character})`} */}
          </span>
        </div>
      </div>
      <div>ddd</div>
      <div>ddd</div>
      <div>ddd</div>
      <div>ddd</div>
      <div>ddd</div>
    </form>
  );
};

export default RegisterGreenCardForm;
