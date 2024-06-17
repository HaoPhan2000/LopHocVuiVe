const { Classes, Students, Bills } = require("../models/Model");
const billsController = {
  createBill: async (req, res) => {
    //[Get] /bills/createBill/student
    try {
      const student = await Students.findById({
        _id: req.query.idStudent,
      }).populate("classesID");
      const classesobj = student.classesID.map((Class) => Class.toObject());
      const studentobj = student.toObject();

      res.status(200).render("./bills/billCreate", { classesobj, studentobj });
    } catch (err) {
      res.status(400).json(err);
    }
  },
  createBillInClass: async (req, res) => {
    //[Get] /bills/createBillInClass/student
    try {
      const Class = await Classes.findById(req.query.idClass).populate(
        "studentsID"
      );
      const classesobj = Class.toObject();
      const studentArr = Class.studentsID.filter(
        (item) => item._id.toString() === req.query.idStudent
      );
      const student = studentArr[0];
      const studentobj = student.toObject();
      res
        .status(200)
        .render("./bills/billCreateInClass", { classesobj, studentobj });
    } catch (err) {
      res.status(404).render("partials/404", { content: "true" });
    }
  },
  actioncreateBill: async (req, res) => {
    //[Post] /bills/actioncreateBill
    try {
      const newBill = new Bills(req.body);
      const savedBill = await newBill.save();
      const student = await Students.findById(req.body.studentsID);
      await student.updateOne({ $push: { billsID: savedBill._id } });
      let isSendMail = false;
      if (
        student.email.trim().toLowerCase().endsWith("@gmail.com") &&
        student.emailHoaDon
      ) {
        isSendMail = true;
      }
      res.status(200).json({
        billID: savedBill._id,
        toastMessage: "success",
        isSendMail: isSendMail,
        redirectTo: `/students/student/${req.body.studentsID}`,
      });
    } catch (err) {
      res.status(400).jsonson({
        toastMessage: "error",
        redirectTo: `/students/student/${req.body.studentsID}`,
      });
    }
  },
  actioncreateBillInClass: async (req, res) => {
    //[Post] bills/actioncreateBillInClass
    try {
      const newBill = new Bills(req.body);
      const savedBill = await newBill.save();
      const student = await Students.findById(req.body.studentsID);
      await student.updateOne({ $push: { billsID: savedBill._id } });
      let isSendMail = false;
      if (
        student.email.trim().toLowerCase().endsWith("@gmail.com") &&
        student.emailHoaDon
      ) {
        isSendMail = true;
      }
      res.status(200).json({
        billID: savedBill._id,
        toastMessage: "success",
        isSendMail: isSendMail,
        redirectTo: `/students/class/${req.body.ChiTiet[0].idLopHoc}/student/${req.body.studentsID}`,
      });
    } catch (err) {
      res.status(400).jsonson({
        toastMessage: "error",
        redirectTo: `/students/class/${req.body.ChiTiet[0].idLopHoc}/student/${req.body.studentsID}`,
      });
    }
  },
  billDetail: async (req, res) => {
    //[Get] bills/:id/billDetail
    try {
      const bill = await Bills.findById(req.params.id).populate("studentsID");
      const billobj = bill.toObject();
      const student = bill.studentsID;
      const studentobj = student.toObject();
      res.status(200).render("./bills/billDetail", { studentobj, billobj });
    } catch (err) {
      res.status(404).render("partials/404", { content: "true" });
    }
  },
};

module.exports = billsController;
