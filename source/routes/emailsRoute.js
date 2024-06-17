const router = require("express").Router();
const searchMiddleWare = require("../middleWares/searchMiddleWare");
const sortMiddleWare = require("../middleWares/sortMiddleWare");
const emailsController = require("../controllers/emailsController");
router.get("/emailPage",searchMiddleWare,sortMiddleWare, emailsController.index);
router.post("/actionSendBillEmail", emailsController.sendBillEmail);
router.post("/actionsendRemindEmail", emailsController.sendRemindEmail);

module.exports = router;
