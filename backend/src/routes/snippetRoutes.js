import express from "express";
import { protect } from "../middleware/authMiddleware.js";

import {
  createSnippet,
  getSnippetById,
  updateSnippet,
  deleteSnippet,
  getPublicSnippet,
  getAllPublicSnippets,
  getUserSnippets,
  toggleFavorite,
  getFavoriteCount,
  getUserFavorites,
} from "../controllers/snippetController.js";

const router = express.Router();

/** CREATE SNIPPET */
router.post("/", protect, createSnippet);

/** ✅ GET USER FAVORITES — MUST BE ABOVE ANY :id ROUTES */
router.get("/favorites/list", protect, getUserFavorites);

/** GET USER SNIPPETS */
router.get("/user/:userId", protect, getUserSnippets);

/** GET ALL PUBLIC SNIPPETS */
router.get("/public", protect, getAllPublicSnippets);

/** GET PUBLIC SNIPPET */
router.get("/public/:id", getPublicSnippet);

/** TOGGLE FAVORITE */
router.post("/:snippetId/favorite", protect, toggleFavorite);

/** GET FAVORITE COUNT */
router.get("/:snippetId/favoriteCount", getFavoriteCount);

/** ✅ THESE MUST COME LAST */
router.get("/:id", protect, getSnippetById);
router.put("/:id", protect, updateSnippet);
router.delete("/:id", protect, deleteSnippet);

export default router;