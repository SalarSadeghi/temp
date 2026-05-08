type PrivacyLevel = "low" | "medium" | "high" | "custom";
type ObfuscationChar = string;

// Configuration interface
interface ObfuscationConfig {
  visibleStart: number; // Number of visible digits from start
  visibleEnd: number; // Number of visible digits from end
  maskChar: string; // Character to use for masking
  preservePrefix?: boolean; // Keep '09' prefix visible
}

/**
 * Normalizes Persian/Arabic digits to English digits
 */
const normalizeToEnglish = (phone: string): string => {
  const persianDigits: { [key: string]: string } = {
    "۰": "0",
    "۱": "1",
    "۲": "2",
    "۳": "3",
    "۴": "4",
    "۵": "5",
    "۶": "6",
    "۷": "7",
    "۸": "8",
    "۹": "9",
  };
  return phone.replace(/[۰-۹]/g, (digit) => persianDigits[digit]);
};

/**
 * Validates phone number format
 */
const isValidPhone = (phone: string): boolean => {
  const normalized = normalizeToEnglish(phone);
  return /^09[0-9]{9}$/.test(normalized);
};

/**
 * Main privacy formatter function
 */
const formatPrivatePhone = (
  phone: string,
  config: ObfuscationConfig,
): string => {
  if (!phone) return "";

  const normalized = normalizeToEnglish(phone);

  if (!isValidPhone(normalized)) {
    return phone; // Return original if invalid
  }

  const phoneLength = normalized.length;
  const { visibleStart, visibleEnd, maskChar, preservePrefix = false } = config;

  let startIndex = 0;
  let actualVisibleStart = visibleStart;

  // Adjust visible digits if preserving prefix
  if (preservePrefix && phoneLength >= 2) {
    startIndex = 2;
    actualVisibleStart = Math.max(0, visibleStart - 2);
  }

  let result = "";

  if (preservePrefix) {
    result = normalized.substring(0, 2); // Keep '09' prefix
  }

  // Build the obfuscated part
  for (let i = startIndex; i < phoneLength; i++) {
    const isStart = i < startIndex + actualVisibleStart;
    const isEnd = i >= phoneLength - visibleEnd;

    if (isStart || isEnd) {
      result += normalized[i];
    } else {
      result += maskChar;
    }
  }

  return result;
};

/**
 * Pre-defined privacy levels
 */
const phonePrivacyFormatters = {
  low: (phone: string): string => {
    return formatPrivatePhone(phone, {
      visibleStart: 3,
      visibleEnd: 2,
      maskChar: "*",
      preservePrefix: true,
    });
    // Output: 0912***78
  },

  medium: (phone: string): string => {
    return formatPrivatePhone(phone, {
      visibleStart: 2,
      visibleEnd: 2,
      maskChar: "*",
      preservePrefix: true,
    });
    // Output: 09******78
  },

  high: (phone: string): string => {
    return formatPrivatePhone(phone, {
      visibleStart: 0,
      visibleEnd: 0,
      maskChar: "*",
      preservePrefix: true,
    });
    // Output: 09********
  },

  custom: (phone: string, visibleStart = 3, visibleEnd = 2): string => {
    return formatPrivatePhone(phone, {
      visibleStart,
      visibleEnd,
      maskChar: "*",
      preservePrefix: true,
    });
  },
};

/**
 * Advanced formatter with multiple masking options
 */
class PhonePrivacyFormatter {
  private phone: string;
  private normalized: string;

  constructor(phone: string) {
    this.phone = phone;
    this.normalized = normalizeToEnglish(phone);
  }

  /**
   * Mask with asterisks (default)
   */
  maskWithAsterisk(visibleStart: number = 4, visibleEnd: number = 2): string {
    return this.format(visibleStart, visibleEnd, "*");
  }

  /**
   * Mask with custom character
   */
  maskWithChar(
    visibleStart: number,
    visibleEnd: number,
    maskChar: string = "X",
  ): string {
    return this.format(visibleStart, visibleEnd, maskChar);
  }

  /**
   * Mask middle part only (keep prefix and suffix)
   */
  maskMiddle(keepFromStart: number = 4, keepFromEnd: number = 2): string {
    return this.format(keepFromStart, keepFromEnd, "*");
  }

  /**
   * Mask everything except last 4 digits
   */
  maskAllExceptLast(lastDigits: number = 4): string {
    if (!isValidPhone(this.normalized)) return this.phone;
    const phoneLength = this.normalized.length;
    const maskLength = phoneLength - lastDigits;
    return "*".repeat(maskLength) + this.normalized.slice(-lastDigits);
  }

  /**
   * Partial visibility with range
   */
  maskRange(start: number, end: number, maskChar: string = "*"): string {
    if (!isValidPhone(this.normalized)) return this.phone;

    let result = "";
    for (let i = 0; i < this.normalized.length; i++) {
      if (i >= start && i < end) {
        result += maskChar;
      } else {
        result += this.normalized[i];
      }
    }
    return result;
  }

  /**
   * Pattern-based masking
   */
  maskWithPattern(pattern: string): string {
    if (!isValidPhone(this.normalized)) return this.phone;

    let result = "";
    let patternIndex = 0;

    for (let i = 0; i < this.normalized.length; i++) {
      if (pattern[patternIndex] === "*") {
        result += "*";
        patternIndex++;
      } else if (pattern[patternIndex] === "#") {
        result += this.normalized[i];
        patternIndex++;
      } else if (pattern[patternIndex] === this.normalized[i]) {
        result += this.normalized[i];
        patternIndex++;
      } else {
        result += this.normalized[i];
      }

      if (patternIndex >= pattern.length) {
        patternIndex = 0;
      }
    }

    return result;
  }

  private format(
    visibleStart: number,
    visibleEnd: number,
    maskChar: string,
  ): string {
    if (!isValidPhone(this.normalized)) return this.phone;

    const phoneLength = this.normalized.length;
    let result = "";

    for (let i = 0; i < phoneLength; i++) {
      if (i < visibleStart || i >= phoneLength - visibleEnd) {
        result += this.normalized[i];
      } else {
        result += maskChar;
      }
    }

    return result;
  }
}

/**
 * Utility functions for common use cases
 */
const phonePrivacyUtils = {
  /**
   * For displaying in UI lists (shows first 4, last 2 digits)
   */
  forList: (phone: string): string => {
    return phonePrivacyFormatters.custom(phone, 4, 2);
  },

  /**
   * For showing last 4 digits only (common in verification)
   */
  forVerification: (phone: string): string => {
    const normalized = normalizeToEnglish(phone);
    if (!isValidPhone(normalized)) return phone;
    return `*******${normalized.slice(-4)}`;
  },

  /**
   * For showing in receipts or order details (partial visibility)
   */
  forReceipt: (phone: string): string => {
    return phonePrivacyFormatters.medium(phone);
  },

  /**
   * Full privacy (minimum information)
   */
  forPublic: (phone: string): string => {
    return phonePrivacyFormatters.high(phone);
  },

  /**
   * Custom pattern: 09** *** **78
   */
  withSpacing: (phone: string): string => {
    const masked = phonePrivacyFormatters.medium(phone);
    if (masked.length === 11) {
      return `${masked.slice(0, 4)} ${masked.slice(4, 7)} ${masked.slice(7)}`;
    }
    return masked;
  },
};

const usePhonePrivacy = () => {
  return {
    format: (phone: string, level: PrivacyLevel = "medium") => {
      switch (level) {
        case "low":
          return phonePrivacyFormatters.low(phone);
        case "medium":
          return phonePrivacyFormatters.medium(phone);
        case "high":
          return phonePrivacyFormatters.high(phone);
        case "custom":
          return phonePrivacyFormatters.custom(phone, 4, 2);
        default:
          return phonePrivacyFormatters.medium(phone);
      }
    },
  };
};

export {
  phonePrivacyFormatters,
  phonePrivacyUtils,
  PhonePrivacyFormatter,
  usePhonePrivacy,
  formatPrivatePhone,
  isValidPhone,
  normalizeToEnglish,
};

//const phone = "09123456789";

// console.log(phonePrivacyFormatters.low(phone));      // "0912***78"
// console.log(phonePrivacyFormatters.medium(phone));   // "09******78"
// console.log(phonePrivacyFormatters.high(phone));     // "09********"
// console.log(phonePrivacyFormatters.custom(phone, 3, 3)); // "091****789"

// const formatter = new PhonePrivacyFormatter(phone);
// console.log(formatter.maskWithAsterisk(4, 2));       // "0912***78"
// console.log(formatter.maskWithChar(4, 2, '#'));      // "0912###78"
// console.log(formatter.maskRange(4, 9));              // "0912*****89"
// console.log(formatter.maskAllExceptLast(4));         // "*******6789"
// console.log(formatter.maskWithPattern('09** *** **78')); // "09** *** **78"

// console.log(phonePrivacyUtils.forList(phone));       // "0912***78"
// console.log(phonePrivacyUtils.forVerification(phone)); // "*******6789"
// console.log(phonePrivacyUtils.withSpacing(phone));   // "09** *** **78"
