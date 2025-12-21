// backend/src/validators/snippetValidators.js

export function validateSnippetInput({ title, language, code, description, tags, isPublic }) {
  if (!title || !title.trim()) {
    return { valid: false, error: "Title is required" };
  }

  if (title.trim().length < 2) {
    return { valid: false, error: "Title must be at least 2 characters" };
  }

  if (!language || !language.trim()) {
    return { valid: false, error: "Language is required" };
  }

  if (!code || !code.trim()) {
    return { valid: false, error: "Code cannot be empty" };
  }

  if (description && description.length > 1000) {
    return { valid: false, error: "Description cannot exceed 1000 characters" };
  }

  if (tags && !Array.isArray(tags)) {
    return { valid: false, error: "Tags must be an array" };
  }

  if (typeof isPublic !== "boolean") {
    return { valid: false, error: "isPublic must be a boolean" };
  }

  return { valid: true };
}