const router = require("express").Router();
const otherController = require("../controllers/otherController");
const upload = require("../middleWares/uploadPhotoMiddleWare");
router.get("/reports", otherController.report);
router.post("/photos/upload", upload, otherController.actionUploadPhoto);
router.get("/infor", otherController.infor);
router.get("/intro", otherController.intro);
module.exports = router;
