const express = require('express');
const {
  getDailySuggestion,
  generateSuggestion,
  getCatalog,
  logRoutine
} = require('../controllers/suggestionController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// All suggestion routes require authentication
router.use(protect);

// GET today's personalized suggestion
router.get('/daily', getDailySuggestion);

// POST generate custom routine based on parameters
router.post('/generate', generateSuggestion);

// GET curated routines catalog
router.get('/catalog', getCatalog);

// POST log entire routine to user's workout collection
router.post('/log-routine', logRoutine);

module.exports = router;
