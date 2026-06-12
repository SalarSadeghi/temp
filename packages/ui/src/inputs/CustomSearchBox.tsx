import {
  CircularProgress,
  IconButton,
  InputAdornment,
  SxProps,
  TextField,
  TextFieldProps,
  Theme,
} from "@mui/material";
import { CloseOutlined, SearchOutlined } from "@superapp/icons";

import React, {
  forwardRef,
  KeyboardEvent,
  useImperativeHandle,
  useRef,
} from "react";

// Types
export interface SearchComponentProps {
  /** Current search value */
  value: string;
  /** Callback when search value changes */
  onChange: (value: string) => void;
  /** Callback when search is triggered (Enter key or search button) */
  onSearch?: (value: string) => void;
  /** Label for the search field */
  label?: string;
  /** Helper text to display below the field */
  helperText?: string;
  /** Placeholder text */
  placeholder?: string;
  /** Whether the search is in loading state */
  isLoading?: boolean;
  /** Whether to show clear button */
  showClearButton?: boolean;
  /** Whether to show search button */
  showSearchButton?: boolean;
  /** Delay for debouncing search (ms). Set to 0 to disable */
  debounceDelay?: number;
  /** Full width of the component */
  fullWidth?: boolean;
  /** Disabled state */
  disabled?: boolean;
  /** Required state */
  required?: boolean;
  /** Error state */
  error?: boolean;
  /** Error message */
  errorMessage?: string;
  /** Size of the text field */
  size?: "small" | "medium";
  /** Variant of the text field */
  variant?: "outlined" | "filled" | "standard";
  /** Custom styles */
  sx?: SxProps<Theme>;
  /** Additional TextField props */
  textFieldProps?: Omit<
    TextFieldProps,
    | "value"
    | "onChange"
    | "label"
    | "placeholder"
    | "disabled"
    | "required"
    | "error"
    | "size"
    | "variant"
    | "fullWidth"
    | "sx"
  >;
  /** Auto focus on mount */
  autoFocus?: boolean;
  /** Callback when search is cleared */
  onClear?: () => void;
  /** Minimum characters before search triggers */
  minChars?: number;
}

export interface SearchComponentRef {
  /** Focus the search input */
  focus: () => void;
  /** Clear the search input */
  clear: () => void;
  /** Get the current input element */
  getInputElement: () => HTMLInputElement | null;
}

export const CustomSearchComponent = forwardRef<
  SearchComponentRef,
  SearchComponentProps
>(
  (
    {
      value,
      onChange,
      onSearch,
      label = "",
      helperText = "",
      placeholder = "جستجو",
      isLoading = false,
      showClearButton = true,
      showSearchButton = true,
      fullWidth = true,
      disabled = false,
      required = false,
      error = false,
      errorMessage,
      size = "medium",
      variant = "outlined",
      sx,
      textFieldProps = {},
      autoFocus = false,
      onClear,
      minChars = 0,
    },
    ref,
  ) => {
    const inputRef = useRef<HTMLInputElement>(null);

    // Expose methods via ref
    useImperativeHandle(ref, () => ({
      focus: () => {
        inputRef.current?.focus();
      },
      clear: () => {
        onChange("");
        onClear?.();
        inputRef.current?.focus();
      },
      getInputElement: () => inputRef.current,
    }));

    // Handle input change
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = event.target.value;
      onChange(newValue);
    };

    // Handle manual search trigger
    const handleSearchClick = () => {
      if (value.length >= minChars || value.length === 0) {
        onSearch?.(value);
      }
    };

    // Handle clear button
    const handleClearClick = () => {
      onChange("");
      onClear?.();
      inputRef.current?.focus();
    };

    // Handle Enter key
    const handleKeyPress = (event: KeyboardEvent<HTMLDivElement>) => {
      if (event.key === "Enter" && onSearch) {
        if (value.length >= minChars || value.length === 0) {
          onSearch(value);
        }
      }
    };

    // Computed helper text with error message
    const computedHelperText =
      error && errorMessage ? errorMessage : helperText;

    return (
      <TextField
        fullWidth={fullWidth}
        label={label}
        placeholder={placeholder}
        helperText={computedHelperText}
        onChange={handleChange}
        onKeyPress={handleKeyPress}
        inputRef={inputRef}
        value={value}
        disabled={disabled}
        required={required}
        error={error}
        size={size}
        variant={variant}
        sx={sx}
        autoFocus={autoFocus}
        slotProps={{
          input: {
            startAdornment: isLoading ? (
              <InputAdornment position="start">
                {/* Replace Loading with your loading component */}
                <CircularProgress />
              </InputAdornment>
            ) : undefined,
            endAdornment: (showClearButton || showSearchButton) && (
              <InputAdornment position="end">
                {showSearchButton && (
                  <IconButton
                    onClick={handleSearchClick}
                    edge="end"
                    disabled={
                      disabled ||
                      (minChars > 0 &&
                        value.length < minChars &&
                        value.length > 0)
                    }
                    aria-label="search"
                  >
                    <SearchOutlined />
                  </IconButton>
                )}
                {showClearButton && value && (
                  <IconButton
                    onClick={handleClearClick}
                    edge="end"
                    disabled={disabled}
                    aria-label="clear search"
                  >
                    <CloseOutlined />
                  </IconButton>
                )}
              </InputAdornment>
            ),
          },
        }}
        {...textFieldProps}
      />
    );
  },
);
