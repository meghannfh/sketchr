const express = require("express");
const router = express.Router();
const promptsController =  require('../controllers/prompts')

router.post("/addPrompt", promptsController.addPrompt)

module.exports = router;