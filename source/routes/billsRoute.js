const router = require("express").Router();
const billsController = require("../controllers/billsController");
router.get("/createBill/student", billsController.createBill);
router.get("/createBillInClass/student", billsController.createBillInClass);
router.post("/actioncreateBill", billsController.actioncreateBill);
router.post("/actioncreateBillInClass", billsController.actioncreateBillInClass);
router.get("/:id/billDetail", billsController.billDetail);
module.exports = router;