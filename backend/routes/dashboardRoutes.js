const express = require('express');
const {protect} = require('../middleware/authMiddleware');  
const {getDashboardData, getNotifications} = require('../controllers/dashboardController.js');
const router = express.Router();

router.get('/', protect, getDashboardData);
router.get('/notifications', protect, getNotifications);

module.exports = router;