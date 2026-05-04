// src/components/LoginPage.tsx
import React, { useState } from "react";
import { OTPInput } from "./OTPInput";
import { useTimer } from "@hooks/useTimer";
import { Lock } from "@superapp/icons";
import { SubmitHandler, useForm } from "react-hook-form";
import { CustomButton, CustomTextInput } from "@superapp/ui";
import { yupResolver } from "@hookform/resolvers/yup";
import { LoginFormSchema } from "@validations/loginPage/LoginFormSchema";
// import "./LoginPage.css";
// src/types/auth.types.ts
export interface PhoneNumberRequest {
  phoneNumber: string;
}

export interface OtpVerificationRequest {
  phoneNumber: string;
  otp: string;
}

export interface AuthResponse {
  success: boolean;
  message?: string;
  token?: string;
}

export type OtpStatus =
  | "idle"
  | "sending"
  | "sent"
  | "verifying"
  | "success"
  | "error";

interface FormValues {
  phoneNumber: string;
}
export const authService = {
  sendOtp: async (data: PhoneNumberRequest): Promise<AuthResponse> => {
    // Simulate API call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // For demo purposes, always succeed
        // In production, make actual API call
        if (data.phoneNumber.length === 10) {
          console.log(`OTP sent to ${data.phoneNumber}`);
          // Store OTP in session for verification (in production, this is server-side)
          sessionStorage.setItem("expectedOtp", "123456"); // Demo only!
          resolve({ success: true, message: "OTP sent successfully" });
        } else {
          reject(new Error("Invalid phone number"));
        }
      }, 1500);
    });
  },

  verifyOtp: async (data: OtpVerificationRequest): Promise<AuthResponse> => {
    // Simulate API call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Demo verification - in production, verify with backend
        const expectedOtp = sessionStorage.getItem("expectedOtp");
        if (data.otp === expectedOtp) {
          resolve({
            success: true,
            message: "OTP verified successfully",
            token: "demo-jwt-token-12345",
          });
        } else {
          reject(new Error("Invalid OTP. Please try again."));
        }
      }, 1000);
    });
  },
};
export const LoginPage: React.FC = () => {
  //   const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [otp, setOtp] = useState<string>("");
  const [status, setStatus] = useState<OtpStatus>("idle");
  //   const [error, setError] = useState<string>("");
  const [showOtpInput, setShowOtpInput] = useState<boolean>(false);

  const { startTimer, resetTimer, formatTime, isActive, seconds } =
    useTimer(120);

  const validatePhoneNumber = (phone: string): boolean => {
    const phoneRegex = /^[0-9]{10}$/; // Adjust based on your country's format
    return phoneRegex.test(phone);
  };
  const {
    handleSubmit,
    control,
    reset,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormValues | any>({
    resolver: yupResolver(LoginFormSchema),
  });
  const { phoneNumber } = watch();
  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validatePhoneNumber(phoneNumber)) {
      //   setError("Please enter a valid 10-digit phone number");
      return;
    }

    // setError("");
    setStatus("sending");

    try {
      // Call API to send OTP
      const response = await authService.sendOtp({ phoneNumber });

      if (response.success) {
        setStatus("sent");
        setShowOtpInput(true);
        startTimer();
        setOtp("");
      } else {
        throw new Error(response.message || "Failed to send OTP");
      }
    } catch (err) {
      setStatus("error");
      //   setError(
      //     err instanceof Error
      //       ? err.message
      //       : "Failed to send OTP. Please try again."
      //   );
      setShowOtpInput(false);
    }
  };

  const handleVerifyOtp = async () => {
    if (otp.length !== 6) {
      //   setError("Please enter complete 6-digit OTP");
      return;
    }

    // setError("");
    setStatus("verifying");
    console.log(errors);

    try {
      const response = await authService.verifyOtp({ phoneNumber, otp });

      if (response.success) {
        setStatus("success");
        // Store token, redirect user, etc.
        if (response.token) {
          localStorage.setItem("authToken", response.token);
        }
        // Redirect to dashboard or home page
        window.location.href = "/dashboard";
      } else {
        throw new Error(response.message || "Invalid OTP");
      }
    } catch (err) {
      setStatus("error");
      //   setError(
      //     err instanceof Error ? err.message : "Invalid OTP. Please try again."
      //   );
    }
  };

  const handleResendOtp = async () => {
    if (!isActive) {
      resetTimer();
      await handleSendOtp(new Event("submit") as any);
    }
  };

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    console.log(data);
  };

  return (
    <div className="flex justify-center items-center h-screen p-4 bg-white">
      <div className="flex bg-white border-blue-400 border-2 flex-col shadow-lg rounded-lg p-8 w-full gap-4">
        <div className="flex  justify-center">
          <Lock sx={{ color: "#764ba2" }} fontSize="large" />
        </div>

        {!!showOtpInput ? (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            {/* <div className="form-group">
              <label htmlFor="phone">Phone Number</label>
              <input
                className="w-full p-3"
                id="phone"
                type="tel"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                // placeholder="Enter your 10-digit phone number"
                disabled={status === "sending"}
                autoComplete="off"
              />
            </div> */}

            <CustomTextInput
              type="tel"
              control={control}
              name="phoneNumber"
              label="شماره همراه"
            />
            {errors && (
              <div className="error-message">{errors.form?.message}</div>
            )}

            {/* <button
              type="submit"
              disabled={status === "sending" || !phoneNumber}
              className="submit-btn"
            >
              {status === "sending" ? "Sending OTP..." : "Send OTP"}
            </button> */}
            <CustomButton
              type="submit"
              disabled={status === "sending" || !phoneNumber}
              label="ارسال"
              color="info"
              variant="contained"
            />
          </form>
        ) : (
          <div className="">
            <div className="flex items-center">
              <p className="text-xs text-gray-500">
                کد یکبار مصرف به (
                <span dir="ltr" className="inline-flex">
                  0912****127
                </span>
                ) ارسال شد.
              </p>
            </div>

            <div className="w-full">
              <label>کد</label>
              <OTPInput
                value={otp}
                onChange={setOtp}
                length={6}
                disabled={status === "verifying"}
                onComplete={handleVerifyOtp}
              />
            </div>

            <div className="timer-section">
              {!isActive ? (
                <p className="text-sm text-gray-500">
                  زمان باقیمانده: <strong>{formatTime()}</strong>
                </p>
              ) : (
                <button
                  onClick={handleResendOtp}
                  className="resend-btn"
                  disabled={status === "sending"}
                >
                  Resend OTP
                </button>
              )}
            </div>

            {/* {error && <div className="error-message">{error}</div>} */}

            <button
              onClick={handleVerifyOtp}
              disabled={otp.length !== 6 || status === "verifying"}
              className="submit-btn"
            >
              {status === "verifying" ? "Verifying..." : "Verify OTP"}
            </button>
          </div>
        )}

        {status === "success" && (
          <div className="success-message">
            Login successful! Redirecting...
          </div>
        )}
      </div>
    </div>
  );
};
