const express = require('express');
const router = express.Router();
const guideController = require('../controllers/guideController');

router.post('/', guideController.createGuide);
router.get('/', guideController.getAllGuides);
router.get('/:id', guideController.getGuideById);
router.put('/:id', guideController.updateGuide);

module.exports = router;