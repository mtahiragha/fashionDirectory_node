const express = require('express');
const router = express.Router();
let { FAIL, SUCCESS, INVALID_INPUT } = require('../helpers/app_messages');

router.get("/api/notifications", async (req, res) => {
    res.status(200).send("Notifications");
});

module.exports = router;