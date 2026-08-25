import React, { useRef, useEffect } from "react";

export default function OTPInput({
  value = "",
  onChange,
  onComplete,
  disabled = false,
  hasError = false,
  inputRefs: externalRefs,
}) {
  const localRefs = useRef([]);
  const refs = externalRefs || localRefs;

  // Array of 6 digits from value string
  const digits = Array.from({ length: 6 }, (_, i) => value[i] || "");

  // Auto focus first input on mount
  useEffect(() => {
    if (refs.current && refs.current[0]) {
      refs.current[0].focus();
    }
  }, [refs]);

  const handleChange = (e, index) => {
    const rawVal = e.target.value;
    // Extract only digits
    const cleaned = rawVal.replace(/\D/g, "");

    if (!cleaned) {
      // Empty or deleted
      const nextOtp = digits.map((d, i) => (i === index ? "" : d)).join("");
      onChange(nextOtp);
      return;
    }

    if (cleaned.length > 1) {
      // Multiple digits entered or pasted into a single box
      handlePastedDigits(cleaned, index);
      return;
    }

    // Single digit entered
    const digit = cleaned.slice(-1);
    const newDigits = [...digits];
    newDigits[index] = digit;
    const nextOtp = newDigits.join("");
    onChange(nextOtp);

    // Auto advance to next box
    if (index < 5 && refs.current[index + 1]) {
      refs.current[index + 1].focus();
      refs.current[index + 1].select();
    }

    if (nextOtp.length === 6 && onComplete) {
      onComplete(nextOtp);
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      if (!digits[index] && index > 0 && refs.current[index - 1]) {
        // Current is empty, move back and clear previous
        e.preventDefault();
        const newDigits = [...digits];
        newDigits[index - 1] = "";
        onChange(newDigits.join(""));
        refs.current[index - 1].focus();
      }
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      if (index > 0 && refs.current[index - 1]) {
        refs.current[index - 1].focus();
      }
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      if (index < 5 && refs.current[index + 1]) {
        refs.current[index + 1].focus();
      }
    } else if (e.key === "Delete") {
      e.preventDefault();
      const newDigits = [...digits];
      newDigits[index] = "";
      onChange(newDigits.join(""));
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasteData = (e.clipboardData || window.clipboardData).getData("text");
    const cleaned = pasteData.replace(/\D/g, "").slice(0, 6);
    if (cleaned.length > 0) {
      onChange(cleaned);
      const focusIndex = Math.min(cleaned.length, 5);
      if (refs.current[focusIndex]) {
        refs.current[focusIndex].focus();
      }
      if (cleaned.length === 6 && onComplete) {
        onComplete(cleaned);
      }
    }
  };

  const handlePastedDigits = (cleanedString, startIndex) => {
    const fullPasted = cleanedString.slice(0, 6);
    const newDigits = [...digits];
    for (let i = 0; i < fullPasted.length; i++) {
      if (startIndex + i < 6) {
        newDigits[startIndex + i] = fullPasted[i];
      }
    }
    const nextOtp = newDigits.join("");
    onChange(nextOtp);
    const targetFocus = Math.min(startIndex + fullPasted.length, 5);
    if (refs.current[targetFocus]) {
      refs.current[targetFocus].focus();
    }
    if (nextOtp.length === 6 && onComplete) {
      onComplete(nextOtp);
    }
  };

  const handleFocus = (e) => {
    e.target.select();
  };

  return (
    <div
      role="group"
      aria-label="6-Digit OTP Verification Code"
      className={`flex items-center justify-center gap-2 sm:gap-3 my-2 ${
        hasError ? "animate-[shake_0.4s_ease-in-out]" : ""
      }`}
    >
      <style>{`
        @keyframes otpShake {
          0%, 100% { transform: translateX(0); }
          20%, 60% { transform: translateX(-6px); }
          40%, 80% { transform: translateX(6px); }
        }
        .otp-box-shadow {
          box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.03), 0 1px 2px rgba(0, 0, 0, 0.05);
        }
        .otp-box-focus {
          box-shadow: 0 0 0 3px rgba(6, 182, 212, 0.25), 0 4px 12px rgba(6, 182, 212, 0.15);
        }
      `}</style>

      {digits.map((digit, index) => {
        const isFilled = Boolean(digit);
        return (
          <div key={index} className="relative">
            <input
              ref={(el) => {
                refs.current[index] = el;
              }}
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              autoComplete={index === 0 ? "one-time-code" : "off"}
              maxLength={1}
              value={digit}
              disabled={disabled}
              onChange={(e) => handleChange(e, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              onPaste={handlePaste}
              onFocus={handleFocus}
              aria-label={`Digit ${index + 1} of 6`}
              className={`w-10 h-12 sm:w-12 sm:h-14 text-center font-mono font-black text-xl sm:text-2xl rounded-xl transition-all duration-200 outline-none select-none otp-box-shadow ${
                hasError
                  ? "border-2 border-red-400 bg-red-50/50 text-red-700 focus:border-red-500 focus:ring-2 focus:ring-red-300"
                  : isFilled
                  ? "border-2 border-cyan-500 bg-cyan-50/40 text-slate-900 shadow-xs"
                  : "border border-slate-200 bg-slate-50/60 text-slate-900 hover:border-slate-300 hover:bg-white"
              } focus:bg-white focus:border-cyan-500 otp-box-focus disabled:opacity-50 disabled:cursor-not-allowed`}
            />
            {/* Subtle bottom indicator dot when filled */}
            {isFilled && !hasError && (
              <span className="absolute bottom-1.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-cyan-500 pointer-events-none" />
            )}
          </div>
        );
      })}
    </div>
  );
}
