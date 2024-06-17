const { Students, Classes } = require("../models/Model");
const { sort } = require("../function-sever/sort");
const { paging } = require("../function-sever/paging ");
const { search } = require("../function-sever/search");
const studentsController = {
  index: async (req, res) => {
    //[Get] /students/studentPage
    try {
      res.set("Cache-Control", "no-store");

      const students = await Students.find();

      let studentsobj;
      if (req.query.hasOwnProperty("_sort")) {
        studentsobj = sort(students, req).map((student) => student.toObject());
      } else if (req.query.hasOwnProperty("_search")) {
        studentsobj = search(students, req).map((student) =>
          student.toObject()
        );
      } else {
        studentsobj = students.map((student) => student.toObject());
      }

      res.status(200).render("students/students", { studentsobj });
    } catch (err) {
      res.status(400).json(err);
    }
  },

  studentCreate: async (req, res) => {
    //[Get] /students/createStudent
    try {
      const classes = await Classes.find({ ketThuc: false });

      const classesobj = classes.map((Class) => Class.toObject());
      res.status(200).render("students/studentCreate", { classesobj });
    } catch (err) {
      res.status(400).json(err);
    }
  },

  studentActionCreate: async (req, res) => {
    //[Post] /students/actionCreate
    try {
      const classID = req.body.classesID;

      const newStudent = new Students(req.body);

      const savedStudent = await newStudent.save();

      if (classID.length != 0) {
        classID.forEach(async (item, index) => {
          let Class = await Classes.findById(item);
          await Class.updateOne({ $push: { studentsID: savedStudent._id } });

          Class = await Classes.findById(item);
          await Class.updateOne({
            $set: { soLuongHS: Class.studentsID.length },
          });
        });
      }
      res.status(200).json({
        redirectTo: "/students/studentPage",
        toastMessage: "success",
      });
    } catch (err) {
      res.status(501).json({
        redirectTo: "/students/studentPage",
        toastMessage: "error",
      });
    }
  },
  studentDetail: async (req, res) => {
    //[Get] /students/student/:idStudent
    try {
      const student = await Students.findById(req.params.idStudent)
        .populate("classesID")
        .populate("billsID");
      const studentobj = student.toObject();

      const Classesobj = student.classesID.map((Class) => Class.toObject());
      const billsobj = paging(sort(student.billsID, req), 15, req).map((bill) =>
        bill.toObject()
      );
      const totalPage = Math.ceil(student.billsID.length / 15);
      res.status(200).render("students/studentDetail", {
        Classesobj,
        studentobj,
        billsobj,
        totalPage,
      });
    } catch (err) {
      res.status(404).render("partials/404", { content: "true" });
    }
  },
  studentDetailInClass: async (req, res) => {
    //[Get] /students/class/:idClass/student/:idStudent
    try {
      const Class = await Classes.findById(req.params.idClass).populate(
        "studentsID"
      );
      const classesobj = Class.toObject();
      const student = await Students.findById(req.params.idStudent).populate(
        "billsID"
      );
      const studentobj = student.toObject();
      const bills = student.billsID.filter((obj) =>
        obj.ChiTiet.some((chiTiet) => chiTiet.idLopHoc === req.params.idClass)
      );
      const billsobj = paging(sort(bills, req), 15, req).map((bill) =>
        bill.toObject()
      );
      const totalPage = Math.ceil(bills.length / 15);
      const dungKhoaHoc = student.dungKhoaHoc.find(
        (item) => item.classesId == req.params.idClass
      ).value;
      res.status(200).render("students/studentDetailInClass", {
        classesobj,
        studentobj,
        billsobj,
        totalPage,
        dungHoc: dungKhoaHoc,
      });
    } catch (err) {
      res.status(404).render("partials/404", { content: "true" });
    }
  },
  studentEdit: async (req, res) => {
    //[Get] /students/:id/editStudent
    try {
      const student = await Students.findById(req.params.id);
      const studentobj = student.toObject();
      res.status(200).render("students/studentEdit", { studentobj });
    } catch (err) {
      res.status(400).json(err);
    }
  },
  studentActionEdit: async (req, res) => {
    //[patch] /students/:id/actionEdit
    try {
      await Students.findByIdAndUpdate(req.params.id, { $set: req.body });
      res.status(200).json({
        toastMessage: "success",
      });
    } catch (err) {
      res.status(501).json({
        toastMessage: "error",
      });
    }
  },
  //checked
  actionUpdateEmailStudents: async (req, res) => {
    //[Patch] /students/:id/actionUpdateEmailStudents
    try {
      const dataToUpdate = req.body;

      await Students.findByIdAndUpdate(req.params.id, dataToUpdate);
      res.status(200).json({
        toastMessage: "success",
      });
    } catch (err) {
      res.status(501).json({
        toastMessage: "error",
      });
    }
  },

  actionUpdateDungKhoaHocStudents: async (req, res) => {
    //[Post] /students/:id/actionUpdateDungKhoaHocStudents
    try {
      const dataToUpdate = req.body;

      const student = await Students.findById({ _id: req.params.id }).populate(
        "dungKhoaHoc"
      );

      const dungKhoaHoc = student.dungKhoaHoc;

      const index = dungKhoaHoc.findIndex(
        (item) => item.classesId === dataToUpdate.classesId
      );

      if (index !== -1) {
        dungKhoaHoc[index].value = dataToUpdate.value;
      }
      await student.updateOne({ $set: { dungKhoaHoc: dungKhoaHoc } });
      res.status(200).json({
        toastMessage: "success",
      });
    } catch (err) {
      res.status(501).json({
        toastMessage: "error",
      });
    }
  },
};
module.exports = studentsController;
