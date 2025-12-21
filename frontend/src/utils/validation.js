// utils/validation.js

// ✅ LOGIN VALIDATION (Frontend)
export function validateLogin({ email, password }) {
  const errors = {};

  if (!email || !email.trim()) {
    errors.email = "Email is required.";
  } else if (!/^\S+@\S+\.\S+$/.test(email)) {
    errors.email = "Invalid email format.";
  }

  if (!password || !password.trim()) {
    errors.password = "Password is required.";
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}



// ✅ REGISTER VALIDATION (Frontend)
export function validateRegister({ username, email, password, confirmPassword }) {
  const errors = {};

  // Username
  if (!username || !username.trim()) {
    errors.username = "Username is required.";
  } else if (username.length < 3) {
    errors.username = "Username must be at least 3 characters.";
  } else if (!/^[a-zA-Z0-9_]+$/.test(username)) {
    errors.username = "Username can only contain letters, numbers, and underscores.";
  }

  // Email
  if (!email || !email.trim()) {
    errors.email = "Email is required.";
  } else if (!/^\S+@\S+\.\S+$/.test(email)) {
    errors.email = "Invalid email format.";
  }

  // Password
  if (!password || !password.trim()) {
    errors.password = "Password is required.";
  } else if (password.length < 6) {
    errors.password = "Password must be at least 6 characters.";
  }

  // Confirm Password
  if (confirmPassword !== password) {
    errors.confirmPassword = "Passwords do not match.";
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}



// ✅ CREATE SNIPPET VALIDATION (Frontend)
export function validateSnippet({ title, language, code, description }) {
  const errors = {};

  // Title
  if (!title || !title.trim()) {
    errors.title = "Title is required.";
  } else if (title.length < 2) {
    errors.title = "Title must be at least 2 characters.";
  }

  // Language
  if (!language || !language.trim()) {
    errors.language = "Language is required.";
  }

  // Code
  if (!code || !code.trim()) {
    errors.code = "Code cannot be empty.";
  }

  // Description (optional)
  if (description && description.length > 1000) {
    errors.description = "Description cannot exceed 1000 characters.";
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}