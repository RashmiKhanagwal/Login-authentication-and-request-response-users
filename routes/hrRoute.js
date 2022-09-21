const router = require("express").Router();
const { adminAuth } = require("../middlewares/auth");
const hr = require("../controllers/managerController");
const upload = require("../server");

router.put("/send/document/:id", adminAuth, upload.single("docfile"), hr.sendDocument);
router.get("/received/document/:id", adminAuth, hr.requestsReceived);

module.exports = router;