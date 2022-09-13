const router = require("express").Router();
const {userAuth} = require("../middlewares/auth");
const employee = require("../controllers/employeeController");

router.post("/request/document", userAuth, employee.requestForDocument);
router.get("/received/document/:id", userAuth, employee.receivedDocument);

module.exports = router;