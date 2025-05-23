const express = require("express");
const router = express.Router();
const Mood = require("../models/Mood");
const authMiddleware = require("../middleware/auth");

router.post("/log", authMiddleware, async (req, res) => {
    const { mood, note } = req.body;
    try {
      // req.user.id now available correctly
      const newMood = new Mood({ userId: req.user.id, mood, note });
      await newMood.save();
      res.status(201).json(newMood);
    } catch (err) {
      console.error("Mood log error:", err);
      res.status(500).json({ message: "Failed to log mood" });
    }
  });
  
  

router.get("/history", authMiddleware, async (req, res) => {
  try {
    const history = await Mood.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json(history);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch mood history" });
  }
});

module.exports = router;
