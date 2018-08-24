const express = require('express');
const migrateDatabaseController = require('../controllers/migrateDatabaseController');
const router = express.Router();

router.get('/', migrateDatabaseController.migrateDatabase);

module.exports = router;
