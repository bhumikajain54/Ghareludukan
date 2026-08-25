import React, { useState, useEffect, useRef, useCallback } from "react";
import { AlertCircle } from "lucide-react";
import OTPHeader from "./otp/OTPHeader";
import OTPInput from "./otp/OTPInput";
import VerifyButton from "./otp/VerifyButton";
import ResendOTP from "./otp/ResendOTP";
import OTPSuccess from "./otp/OTPSuccess";

const INITIAL_COUNTDOWN = 30; // 30 seconds countdown timer

export default function OtpStep({
  phone,
  otp = "",
  onOtpChange,
  onVerify,
  onChangePhone,
  error: parentError = "",
}) {
  const [secondsLeft, setSecondsLeft] = useState(INITIAL_COUNTDOWN);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [resendSuccess, setResendSuccess] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [localError, setLocalError] = useState("");
  const [shake, setShake] = useState(false);

  const inputRefs = useRef([]);

  const activeError = localError || parentError;

  // Countdown timer effect
  useEffect(() => {
    if (secondsLeft <= 0) return;
    const interval = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [secondsLeft]);

  // Sync parent error changes to trigger shake
  useEffect(() => {
    if (parentError) {
      setShake(true);
      const t = setTimeout(() => setShake(false), 500);
      return () => clearTimeout(t);
    }
  }, [parentError]);

  const triggerErrorShake = (msg) => {
    setLocalError(msg);
    setShake(true);
    setTimeout(() => setShake(false), 500);
    // Refocus the first input
    if (inputRefs.current && inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  };

  const handleOtpUpdate = (newVal) => {
    if (localError) setLocalError("");
    onOtpChange(newVal);
  };

  // Resend OTP handler
  const handleResendOtp = async () => {
    if (secondsLeft > 0 || isResending) return;

    setIsResending(true);
    setLocalError("");
    setResendSuccess(false);

    try {
      // Simulate network request for resend OTP
      await new Promise((resolve) => setTimeout(resolve, 400));

      // Reset state
      onOtpChange("");
      setSecondsLeft(INITIAL_COUNTDOWN);
      setResendSuccess(true);

      // Auto focus first input
      setTimeout(() => {
        if (inputRefs.current && inputRefs.current[0]) {
          inputRefs.current[0].focus();
        }
      }, 50);

      // Hide success banner after 3 seconds
      setTimeout(() => {
        setResendSuccess(false);
      }, 3000);
    } catch (err) {
      setLocalError("Failed to resend OTP. Please try again.");
    } finally {
      setIsResending(false);
    }
  };

  // Verification handler
  const handleVerifyOtp = useCallback(
    async (codeToVerify = otp) => {
      if (isVerifying || isVerified) return;

      // 1. Empty / Incomplete OTP Validation
      if (!codeToVerify || codeToVerify.length < 6) {
        triggerErrorShake("Please enter the complete 6-digit OTP.");
        return;
      }

      // 2. Expiration check
      if (secondsLeft <= 0) {
        triggerErrorShake("OTP has expired. Please request a new OTP.");
        return;
      }

      setLocalError("");
      setIsVerifying(true);

      try {
        // Run verify with a small async feedback delay for smooth UX
        await new Promise((resolve) => setTimeout(resolve, 500));

        let isValid = true;
        if (onVerify) {
          const res = await onVerify(codeToVerify);
          // If onVerify explicitly returns false, treat as failed
          if (res === false) {
            isValid = false;
          }
        }

        if (isValid) {
          setIsVerified(true);
        }
      } catch (err) {
        triggerErrorShake(
          err?.message || "Invalid OTP. Please enter the correct 6-digit code."
        );
      } finally {
        setIsVerifying(false);
      }
    },
    [otp, isVerifying, isVerified, secondsLeft, onVerify]
  );

  // When all 6 digits are typed, we can auto-submit or let user click
  const handleComplete = (completedOtp) => {
    // If completed and not expired, we can trigger verification
    if (completedOtp.length === 6 && secondsLeft > 0) {
      handleVerifyOtp(completedOtp);
    }
  };

  if (isVerified) {
    return <OTPSuccess message="Your OTP has been successfully verified." />;
  }

  return (
    <div className="space-y-2">
      {/* 1. Header with Logo, Title, and Masked Phone */}
      <OTPHeader phone={phone} onChangePhone={onChangePhone} />

      {/* 2. 6-Digit OTP Inputs */}
      <div className="py-1">
        <OTPInput
          value={otp}
          onChange={handleOtpUpdate}
          onComplete={handleComplete}
          disabled={isVerifying}
          hasError={Boolean(activeError) && shake}
          inputRefs={inputRefs}
        />
      </div>

      {/* 3. Error Alert Banner */}
      {activeError && (
        <div className="flex items-center gap-2 p-2.5 rounded-xl bg-red-50 border border-red-200 text-red-600 text-xs font-medium animate-fade-in my-2">
          <AlertCircle size={14} className="shrink-0 text-red-500" />
          <span>{activeError}</span>
        </div>
      )}

      {/* 4. Verify OTP Button */}
      <VerifyButton
        onClick={() => handleVerifyOtp(otp)}
        disabled={otp.length !== 6 || secondsLeft <= 0}
        loading={isVerifying}
      />

      {/* 5. Resend OTP & Expiration Timer */}
      <ResendOTP
        secondsLeft={secondsLeft}
        onResend={handleResendOtp}
        loading={isResending}
        resendSuccess={resendSuccess}
      />
    </div>
  );
}
