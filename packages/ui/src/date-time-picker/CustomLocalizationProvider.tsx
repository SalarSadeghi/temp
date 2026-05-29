import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFnsJalali } from "@mui/x-date-pickers/AdapterDateFnsJalali";
import { faIR } from "date-fns-jalali/locale";
import { createCustomLocaleText } from "./CustomLocaleText";
import { useCallback, useMemo } from "react";
// import { faIR } from "date-fns/locale";
interface CustomLocalizationProviderProps {
  children: React.ReactNode;
}

export const CustomLocalizationProvider = ({
  children,
}: CustomLocalizationProviderProps) => {
  const localeText = useMemo(() => createCustomLocaleText(), []);

  return (
    <LocalizationProvider
      // Purpose: Defines HOW dates are calculated and manipulated
      // Responsibility: Date math, calendar system, date parsing/formatting logic (Gregorian vs Jalali calendar systems)
      dateAdapter={AdapterDateFnsJalali}
      // Purpose: Defines the LANGUAGE for date-related text
      // Month names, day names, number formatting, date formats patterns
      adapterLocale={faIR}
      // Purpose: Defines UI TEXT for the picker components themselves
      // Responsibility: Button labels, tooltips, placeholder texts, error messages
      localeText={localeText}
    >
      {children}
    </LocalizationProvider>
  );
};
