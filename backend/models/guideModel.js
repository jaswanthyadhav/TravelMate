const db = require('../config/db');

// Create Guide Profile
const createGuide = async (data) => {
  const { user_id, city, languages, experience, price_per_hour, bio, profile_image } = data;

  const [result] = await db.execute(
    `INSERT INTO guides 
    (user_id, city, languages, experience, price_per_hour, bio, profile_image, status)
    VALUES (?, ?, ?, ?, ?, ?, ?, 'pending')`,
    [user_id, city, languages, experience, price_per_hour, bio, profile_image]
  );

  return result;
};

// Get All Approved Guides
const getAllGuides = async () => {
  const [rows] = await db.execute(
    `SELECT g.*, u.name, u.email 
     FROM guides g
     JOIN users u ON g.user_id = u.id
     WHERE g.status = 'approved'`
  );

  return rows;
};

// Get Single Guide
const getGuideById = async (id) => {
  const [rows] = await db.execute(
    `SELECT g.*, u.name, u.email 
     FROM guides g
     JOIN users u ON g.user_id = u.id
     WHERE g.id = ?`,
    [id]
  );

  return rows[0];
};

// Update Guide
const updateGuide = async (id, data) => {
  const { city, languages, experience, price_per_hour, bio, profile_image } = data;

  const [result] = await db.execute(
    `UPDATE guides 
     SET city=?, languages=?, experience=?, price_per_hour=?, bio=?, profile_image=?
     WHERE id=?`,
    [city, languages, experience, price_per_hour, bio, profile_image, id]
  );

  return result;
};

module.exports = {
  createGuide,
  getAllGuides,
  getGuideById,
  updateGuide
};