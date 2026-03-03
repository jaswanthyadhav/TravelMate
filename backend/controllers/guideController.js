const guideModel = require('../models/guideModel');

// Create Guide
exports.createGuide = async (req, res) => {
  try {
    const result = await guideModel.createGuide(req.body);
    res.status(201).json({ message: "Guide profile created", result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

// Get All Guides
exports.getAllGuides = async (req, res) => {
  try {
    const guides = await guideModel.getAllGuides();
    res.json(guides);
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "Server error" });
  }
};

// Get Single Guide
exports.getGuideById = async (req, res) => {
  try {
    const guide = await guideModel.getGuideById(req.params.id);
    if (!guide) {
      return res.status(404).json({ message: "Guide not found" });
    }
    res.json(guide);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};

// Update Guide
exports.updateGuide = async (req, res) => {
  try {
    await guideModel.updateGuide(req.params.id, req.body);
    res.json({ message: "Guide updated successfully" });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
};