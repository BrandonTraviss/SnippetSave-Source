import mongoose from "mongoose";
import Snippet from "../models/Snippet.js";
import User from "../models/Users.js";
import { validateSnippetInput } from "../validators/snippetValidators.js";

/**
 * Build a MongoDB filter from multi-field query params
 */
const buildMultiFieldFilter = ({ title, language, tags }) => {
  const filter = {};
  
  if (title && title.trim()) {
    filter.title = { $regex: title.trim(), $options: "i" };
  }

  if (language && language.trim()) {
    filter.language = { $regex: `^${language.trim()}$`, $options: "i" };
  }

  if (Array.isArray(tags) && tags.length > 0) {
    const normalizedTags = tags
      .map((tag) => (typeof tag === "string" ? tag.trim().toLowerCase() : ""))
      .filter((tag) => tag.length > 0);

    if (normalizedTags.length > 0) {
      filter.$or = normalizedTags.map((tag) => ({
        tags: { $regex: `^${tag}$`, $options: "i" },
      }));
    }
  }

  return filter;
};
/**
 * Pagination helper
 */
const paginateSnippets = async ({ baseQuery, page, limit, filters }) => {
  const multiFieldFilter = buildMultiFieldFilter(filters);

  const finalQuery = {
    ...baseQuery,
    ...multiFieldFilter,
  };

  const skip = (page - 1) * limit;

  const [snippets, total] = await Promise.all([
    Snippet.find(finalQuery)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate("user", "username"),
    Snippet.countDocuments(finalQuery),
  ]);

  const hasMore = total > page * limit;

  return { snippets, hasMore };
};

// Create snippet
export const createSnippet = async (req, res) => {
  try {
    const { title, language, code, description, tags, isPublic } = req.body;

    const { valid, error } = validateSnippetInput({
      title,
      language,
      code,
      description,
      tags,
      isPublic,
    });

    if (!valid) return res.status(400).json({ error });

    let normalizedTags = [];
    if (Array.isArray(tags)) {
      normalizedTags = tags
        .map((tag) => (typeof tag === "string" ? tag.trim().toLowerCase() : ""))
        .filter((tag) => tag.length > 0);
    }

    const snippet = await Snippet.create({
      user: req.user._id,
      title,
      language,
      code,
      description,
      tags: normalizedTags,
      isPublic,
    });

    res.status(201).json(snippet);
  } catch (error) {
    console.error("Create snippet error:", error);
    res.status(500).json({ error: "Failed to create snippet" });
  }
};

// Get snippets for a specific user
export const getUserSnippets = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({ error: "Invalid user ID" });
    }

    const isOwner = req.user && req.user._id.toString() === userId.toString();

    const baseQuery = isOwner
      ? { user: userId }
      : { user: userId, isPublic: true };

    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 12;

    const title = req.query.title || "";
    const language = req.query.language || "";

    let tags = [];
    if (req.query.tags) {
      tags = Array.isArray(req.query.tags)
        ? req.query.tags
        : req.query.tags.split(",").map((t) => t.trim());
    }

    const { snippets, hasMore } = await paginateSnippets({
      baseQuery,
      page,
      limit,
      filters: { title, language, tags },
    });

    return res.json({ snippets, hasMore });
  } catch (error) {
    console.error("Get user snippets error:", error);
    res.status(500).json({ error: "Failed to fetch user snippets" });
  }
};

// Get snippet by ID
export const getSnippetById = async (req, res) => {
  try {
    const snippet = await Snippet.findById(req.params.id).populate(
      "user",
      "username"
    );

    if (!snippet) {
      return res.status(404).json({ error: "Snippet not found" });
    }

    if (!snippet.isPublic) {
      if (!req.user || snippet.user._id.toString() !== req.user._id.toString()) {
        return res.status(403).json({ error: "Not authorized" });
      }
    }

    res.json(snippet);
  } catch (error) {
    console.error("Get snippet by ID error:", error);
    res.status(500).json({ error: "Failed to fetch snippet" });
  }
};

// Update snippet
export const updateSnippet = async (req, res) => {
  try {
    const snippet = await Snippet.findById(req.params.id);

    if (!snippet) {
      return res.status(404).json({ error: "Snippet not found" });
    }

    if (snippet.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: "Not authorized" });
    }

    const { title, language, code, description, tags, isPublic } = req.body;

    const { valid, error } = validateSnippetInput({
      title,
      language,
      code,
      description,
      tags,
      isPublic,
    });

    if (!valid) return res.status(400).json({ error });

    let normalizedTags = [];
    if (Array.isArray(tags)) {
      normalizedTags = tags
        .map((tag) => (typeof tag === "string" ? tag.trim().toLowerCase() : ""))
        .filter((tag) => tag.length > 0);
    }

    snippet.title = title;
    snippet.language = language;
    snippet.code = code;
    snippet.description = description;
    snippet.tags = normalizedTags;
    snippet.isPublic = isPublic;

    const updated = await snippet.save();
    res.json(updated);
  } catch (error) {
    console.error("Update snippet error:", error);
    res.status(500).json({ error: "Failed to update snippet" });
  }
};

// Delete snippet
export const deleteSnippet = async (req, res) => {
  try {
    const snippet = await Snippet.findById(req.params.id);

    if (!snippet) {
      return res.status(404).json({ error: "Snippet not found" });
    }

    if (snippet.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: "Not authorized" });
    }

    await snippet.deleteOne();
    res.json({ message: "Snippet deleted" });
  } catch (error) {
    console.error("Delete snippet error:", error);
    res.status(500).json({ error: "Failed to delete snippet" });
  }
};

// Public snippet
export const getPublicSnippet = async (req, res) => {
  try {
    const snippet = await Snippet.findById(req.params.id).populate(
      "user",
      "username"
    );

    if (!snippet || !snippet.isPublic) {
      return res.status(404).json({ error: "Public snippet not found" });
    }

    res.json(snippet);
  } catch (error) {
    console.error("Get public snippet error:", error);
    res.status(500).json({ error: "Failed to fetch public snippet" });
  }
};

// Get all public snippets
export const getAllPublicSnippets = async (req, res) => {
  try {
    const currentUserId = new mongoose.Types.ObjectId(req.user._id);

    const baseQuery = {
      isPublic: true,
      user: { $ne: currentUserId },
    };

    if (req.query.username) {
      const username = req.query.username.trim();
      const user = await User.findOne({ username });

      if (!user) {
        return res.json({ snippets: [], hasMore: false });
      }

      baseQuery.user = user._id;
    }

    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 12;

    const title = req.query.title || "";
    const language = req.query.language || "";

    let tags = [];
    if (req.query.tags) {
      tags = Array.isArray(req.query.tags)
        ? req.query.tags
        : req.query.tags.split(",").map((t) => t.trim());
    }

    const { snippets, hasMore } = await paginateSnippets({
      baseQuery,
      page,
      limit,
      filters: { title, language, tags },
    });

    return res.json({ snippets, hasMore });
  } catch (error) {
    console.error("Get all public snippets error:", error);
    res.status(500).json({ error: "Failed to fetch public snippets" });
  }
};

// Toggle favorite
export const toggleFavorite = async (req, res) => {
  try {
    const userId = req.user._id;
    const snippetId = req.params.snippetId;

    const snippet = await Snippet.findById(snippetId);
    if (!snippet) {
      return res.status(404).json({ error: "Snippet not found" });
    }

    const hasFavorited = snippet.favoritedBy.includes(userId);

    if (hasFavorited) {
      snippet.favoritedBy.pull(userId);
    } else {
      snippet.favoritedBy.addToSet(userId);
    }

    await snippet.save();

    return res.json({
      favorited: !hasFavorited,
      favoritesCount: snippet.favoritedBy.length,
    });

  } catch (error) {
    console.error("Toggle favorite error:", error);
    res.status(500).json({ error: "Failed to toggle favorite" });
  }
};

// Get favorite count
export const getFavoriteCount = async (req, res) => {
  try {
    const snippetId = req.params.snippetId;

    const snippet = await Snippet.findById(snippetId).select("favoritedBy");
    if (!snippet) {
      return res.status(404).json({ error: "Snippet not found" });
    }

    return res.json({ favoritesCount: snippet.favoritedBy.length });

  } catch (error) {
    console.error("Get favorite count error:", error);
    res.status(500).json({ error: "Failed to fetch favorite count" });
  }
};

// Get all favorites for the logged-in user (with pagination + filters)
export const getUserFavorites = async (req, res) => {
  try {
    const userId = req.user._id;

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 12;
    const skip = (page - 1) * limit;

    const { title = "", language = "", tags = "" } = req.query;

    const tagList = Array.isArray(tags)
      ? tags
      : tags.split(",").map((t) => t.trim()).filter(Boolean);

    const filters = buildMultiFieldFilter({ title, language, tags: tagList });

    const baseQuery = { favoritedBy: userId, ...filters };

    const [favorites, total] = await Promise.all([
      Snippet.find(baseQuery)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .populate("user", "username"),

      Snippet.countDocuments(baseQuery),
    ]);

    res.json({
      favorites,
      hasMore: total > page * limit,
    });

  } catch (error) {
    console.error("Get user favorites error:", error);
    res.status(500).json({ error: "Failed to fetch favorites" });
  }
};