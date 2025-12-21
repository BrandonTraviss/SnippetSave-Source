export function validateRegisterInput({ username, email, password }) {
  if (!username || !email || !password) {
    return { valid: false, error: "All fields are required" };
  }

  if (username.length < 3) {
    return { valid: false, error: "Username must be at least 3 characters" };
  }

  if (!/^[a-zA-Z0-9_]+$/.test(username)) {
    return { valid: false, error: "Username can only contain letters, numbers, and underscores" };
  }

  if (!/^\S+@\S+\.\S+$/.test(email)) {
    return { valid: false, error: "Invalid email format" };
  }

  if (password.length < 6) {
    return { valid: false, error: "Password must be at least 6 characters" };
  }

  return { valid: true };
}



export function validateLoginInput({ email, password }) {
  if (!email || !password) {
    return { valid: false, error: "Email and password are required" };
  }

  if (!/^\S+@\S+\.\S+$/.test(email)) {
    return { valid: false, error: "Invalid email format" };
  }

  return { valid: true };
}