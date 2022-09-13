const router = require("express").Router();
const user = require("../controllers/userController");

router.post("/register", user.register);
router.post("/signin", user.signin);

module.exports = router;