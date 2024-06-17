const { Classes, Students, Bills } = require("../models/Model");
const multer = require("multer");
const upload = multer().single("photo");
const otherController = {
  report: async (req, res) => {
    //[Get] /reports
    try {
      const activityClasses = await Classes.find({ ketThuc: false });
      const allClasses = await Classes.find();
      const bills = await Bills.find();
      let totalStudentActivityClasses = 0;
      let totalStudentAllClasses = 0;
      let totalCost = 0;
      for (const item of activityClasses) {
        totalStudentActivityClasses += item.soLuongHS;
      }
      for (const item of allClasses) {
        totalStudentAllClasses += item.soLuongHS;
      }
      for (const item of bills) {
        totalCost += item.tongTien;
      }
      const report = {
        totalCost: totalCost,
        totalStudentAllClasses: totalStudentAllClasses,
        totalStudentActivityClasses: totalStudentActivityClasses,
      };
      res.status(200).render("./other/report", {
        report,
        allClasses: JSON.stringify(allClasses),
        bills: JSON.stringify(bills),
      });
    } catch (err) {
      res.status(400).json(err);
    }
  },
  //[Post] /photos/upload
  actionUploadPhoto: async (req, res) => {
    upload(req, res, function (err) {
      if (err instanceof multer.MulterError) {
        res.json({ toastMessage: "error" });
      } else if (err) {
        res.json({ file: req.file.filename, toastMessage: "success" });
      }
      res.json({ file: req.file.filename, toastMessage: "success" });
    });
  },
  infor: async (req, res) => {
    //[Get] /infor
    try {
      res.status(200).render("./other/infor");
    } catch (err) {
      res.status(400).json(err);
    }
  },
  intro: async (req, res) => {
    //[Get] /intro
    try {
      res.status(200).render("./other/intro");
    } catch (err) {
      res.status(400).json(err);
    }
  },
};

module.exports = otherController;
