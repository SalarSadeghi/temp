// src/components/OtpInput.tsx
import React, { useRef, useEffect, useState } from "react";

interface OtpInputProps {
  value: string;
  onChange: (value: string) => void;
  length?: number;
  disabled?: boolean;
  onComplete?: () => void;
}

export const OTPInput: React.FC<OtpInputProps> = ({
  value,
  onChange,
  length = 6,
  disabled = false,
  onComplete,
}) => {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    // Auto-focus first input on mount
    if (inputRefs.current[0] && !disabled) {
      inputRefs.current[0].focus();
    }
  }, [disabled]);

  const handleChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const newValue = e.target.value;
    if (newValue.length > 1) return;

    const otpArray = value.split("");
    otpArray[index] = newValue;
    const newOtp = otpArray.join("").slice(0, length);
    onChange(newOtp);

    // Auto-focus next input
    if (newValue && index < length - 1 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1]?.focus();
    }

    // Check if OTP is complete
    if (newOtp.length === length && onComplete) {
      onComplete();
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>,
  ) => {
    if (e.key === "Backspace" && !value[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text/plain").slice(0, length);
    if (/^\d+$/.test(pastedData)) {
      onChange(pastedData);
    }
  };

  return (
    <div className="flex flex-row-reverse gap-2">
      {Array.from({ length }, (_, index) => (
        <input
          key={index}
          ref={(el) => (inputRefs.current[index] = el)}
          type="tel"
          maxLength={1}
          value={value[index] || ""}
          onChange={(e) => handleChange(index, e)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          onPaste={handlePaste}
          disabled={disabled}
          className={`w-10 h-10 font-semibold 
           ${value[index] ? "border-[#9945FF]" : "border-gray-300"} 
            border-2 text-center rounded-md`}
          inputMode="numeric"
          pattern="[0-9]*"
        />
      ))}
    </div>
  );
};
