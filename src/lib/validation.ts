// Validation utilities for auth forms

export interface ValidationError {
  field: string;
  message: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
}

// Email validation regex
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Phone validation regex (supports Rwanda format and international)
const PHONE_REGEX = /^(\+?250|0)[0-9]{9}$/;

// Password strength validation
export const validatePassword = (
  password: string
): { isStrong: boolean; feedback: string[] } => {
  const feedback: string[] = [];
  let isStrong = true;

  if (password.length < 8) {
    feedback.push("Password must be at least 8 characters long");
    isStrong = false;
  }
  if (!/[A-Z]/.test(password)) {
    feedback.push("Password must contain at least one uppercase letter");
    isStrong = false;
  }
  if (!/[a-z]/.test(password)) {
    feedback.push("Password must contain at least one lowercase letter");
    isStrong = false;
  }
  if (!/[0-9]/.test(password)) {
    feedback.push("Password must contain at least one number");
    isStrong = false;
  }
  if (!/[!@#$%^&*]/.test(password)) {
    feedback.push(
      "Password must contain at least one special character (!@#$%^&*)"
    );
    isStrong = false;
  }

  return { isStrong, feedback };
};

// Email validation
export const validateEmail = (email: string): boolean => {
  return EMAIL_REGEX.test(email);
};

// Phone validation
export const validatePhone = (phone: string): boolean => {
  return PHONE_REGEX.test(phone);
};

// Driver License validation (basic - Rwanda format RWA + 5 digits + letter)
export const validateDriverLicense = (license: string): boolean => {
  return /^[A-Z]{2,3}\d{5,7}[A-Z]?$/i.test(license);
};

// Full name validation
export const validateFullName = (name: string): boolean => {
  return name.trim().length >= 2 && /^[a-zA-Z\s'-]+$/.test(name);
};

// SignUp validation
export const validateSignUp = (data: {
  full_name: string;
  email: string;
  phone_number: string;
  password: string;
  role: "driver" | "passenger";
  driver_license_id?: string;
}): ValidationResult => {
  const errors: ValidationError[] = [];

  // Validate name
  if (!data.full_name?.trim()) {
    errors.push({ field: "full_name", message: "Full name is required" });
  } else if (!validateFullName(data.full_name)) {
    errors.push({
      field: "full_name",
      message: "Full name must contain only letters, spaces, and hyphens",
    });
  }

  // Validate email
  if (!data.email?.trim()) {
    errors.push({ field: "email", message: "Email is required" });
  } else if (!validateEmail(data.email)) {
    errors.push({
      field: "email",
      message: "Please enter a valid email address",
    });
  }

  // Validate phone
  if (!data.phone_number?.trim()) {
    errors.push({ field: "phone_number", message: "Phone number is required" });
  } else if (!validatePhone(data.phone_number)) {
    errors.push({
      field: "phone_number",
      message:
        "Phone number must be a valid Rwanda number (e.g., +250788123456 or 0788123456)",
    });
  }

  // Validate password
  if (!data.password) {
    errors.push({ field: "password", message: "Password is required" });
  } else {
    const { feedback } = validatePassword(data.password);
    if (feedback.length > 0) {
      errors.push({ field: "password", message: feedback.join(". ") });
    }
  }

  // Validate driver license if driver
  if (data.role === "driver") {
    if (!data.driver_license_id?.trim()) {
      errors.push({
        field: "driver_license_id",
        message: "Driver license ID is required for drivers",
      });
    } else if (!validateDriverLicense(data.driver_license_id)) {
      errors.push({
        field: "driver_license_id",
        message: "Invalid driver license format (e.g., RWA12345D)",
      });
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};

// Login validation
export const validateLogin = (data: {
  email: string;
  password: string;
}): ValidationResult => {
  const errors: ValidationError[] = [];

  // Validate email
  if (!data.email?.trim()) {
    errors.push({ field: "email", message: "Email is required" });
  } else if (!validateEmail(data.email)) {
    errors.push({
      field: "email",
      message: "Please enter a valid email address",
    });
  }

  // Validate password
  if (!data.password) {
    errors.push({ field: "password", message: "Password is required" });
  } else if (data.password.length < 6) {
    errors.push({
      field: "password",
      message: "Password must be at least 6 characters",
    });
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};
