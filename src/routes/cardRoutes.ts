import express from "express";
import {
  getCards,
  createCard,
  updateCard,
  deleteCard,
  setDefaultCard,
} from "../controllers/cardController";

const router = express.Router();

router.get("/:clerkId", getCards);

router.post("/:clerkId", createCard);

router.delete("/:clerkId", deleteCard);

router.post("/update/:clerkId", updateCard);

router.post("/setDefault/:clerkId", setDefaultCard);

export default router;
