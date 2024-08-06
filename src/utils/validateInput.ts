// src/utils/validateInput.ts

interface ValidationResult {
    isValid: boolean;
    errors: string[];
  }
  
  export const validateRegistrationInput = (email: string, password: string, roleName: string): ValidationResult => {
    const errors: string[] = [];
    if (!email || !email.includes('@')) {
      errors.push('Invalid or missing email.');
    }
    if (!password || password.length < 6) {
      errors.push('Password must be at least 6 characters.');
    }
    if (!roleName) {
      errors.push('Role is required.');
    }
  
    return {
      isValid: errors.length === 0,
      errors,
    };
  };
  
  export const validateLoginInput = (email: string, password: string): ValidationResult => {
    const errors: string[] = [];
    if (!email || !email.includes('@')) {
      errors.push('Invalid or missing email.');
    }
    if (!password) {
      errors.push('Password is required.');
    }
  
    return {
      isValid: errors.length === 0,
      errors,
    };
  };
  