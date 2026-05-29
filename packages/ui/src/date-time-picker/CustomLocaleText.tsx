// CustomLocaleText.tsx
import { faIR } from "date-fns-jalali/locale";
import { PickersLocaleText } from "@mui/x-date-pickers";

// Define the type for custom locale text
type CustomLocaleTextInput = Partial<PickersLocaleText>;

// Default UI text from MUI X (English fallbacks)
const defaultMuiLocaleText: Partial<PickersLocaleText> = {
  // Toolbar titles
  datePickerToolbarTitle: "انتخاب تاریخ",
  timePickerToolbarTitle: "انتخاب زمان",
  dateTimePickerToolbarTitle: "انتخاب تاریخ و زمان",
  dateRangePickerToolbarTitle: "محدوده تاریخ را انتخاب کنید",

  // Button labels
  cancelButtonLabel: "انصراف",
  clearButtonLabel: "پاک کردن",
  okButtonLabel: "تأیید",
  todayButtonLabel: "امروز",

  // Clock labels
  clockLabelText: (view, formattedTime) =>
    `انتخاب ${view}. ${formattedTime === null ? "زمانی انتخاب نشده" : `زمان انتخاب شده ${formattedTime}`}`,
  hoursClockNumberText: (hours) => `${hours} ساعت‌ها`,
  minutesClockNumberText: (minutes) => `${minutes} دقیقه‌ها`,
  secondsClockNumberText: (seconds) => `${seconds} ثانیه‌ها`,

  // Calendar labels
  calendarWeekNumberHeaderLabel: "شماره هفته",
  calendarWeekNumberHeaderText: "هفته",
  calendarWeekNumberAriaLabelText: (weekNumber: number) => `هفته ${weekNumber}`,
  calendarWeekNumberText: (weekNumber) => `${weekNumber}`,

  // Field labels
  fieldMonthPlaceholder: (params) => "ماه",
  fieldYearPlaceholder: (params) => "سال",
  fieldDayPlaceholder: (params) => "روز",
  fieldHoursPlaceholder: (params) => "ساعت",
  fieldMinutesPlaceholder: (params) => "دقیقه",
  fieldSecondsPlaceholder: (params) => "ثانیه",
  fieldMeridiemPlaceholder: (params) => "قبل/بعد از ظهر",

  openDatePickerDialogue: (formattedDate) =>
    formattedDate
      ? `تاریخ انتخاب شده ${formattedDate} را ویرایش کنید`
      : "تاریخ را انتخاب کنید",
  openTimePickerDialogue: (formattedTime) =>
    formattedTime
      ? `زمان انتخاب شده ${formattedTime} را ویرایش کنید`
      : "زمان را انتخاب کنید",

  previousMonth: "ماه قبل",
  nextMonth: "ماه بعد",
};

// Create a function to merge custom overrides
export const createCustomLocaleText = (
  customOverrides?: CustomLocaleTextInput,
): Partial<PickersLocaleText> => {
  // Start with MUI X defaults, then override with faIR values
  const mergedLocaleText = {
    ...defaultMuiLocaleText,
    ...faIR,
    ...customOverrides,
  };

  return mergedLocaleText;
};

// Pre-configured locale text with Persian defaults
export const getPersianLocaleText = (): Partial<PickersLocaleText> => {
  return {
    cancelButtonLabel: "انصراف",
    clearButtonLabel: "پاک کردن",
    okButtonLabel: "تأیید",
    todayButtonLabel: "امروز",
    datePickerToolbarTitle: "انتخاب تاریخ",
    timePickerToolbarTitle: "انتخاب زمان",
    dateTimePickerToolbarTitle: "انتخاب تاریخ و زمان",
    previousMonth: "ماه قبل",
    nextMonth: "ماه بعد",
    // Add more as needed
  };
};
