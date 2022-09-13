const router = require("express").Router();
const { adminAuth } = require("../middlewares/auth");
const hr = require("../controllers/managerController");

router.put("/send/document/:id", adminAuth, hr.sendDocument);
router.get("/received/document/:id", adminAuth, hr.requestsReceived);

module.exports = router;