const { Classes, Students } = require("../models/Model");
const { sort } = require("../function-sever/sort");
const { paging } = require("../function-sever/paging ");
const fs = require("fs");
let appRoot = require("app-root-path");
const classesController = {
  index: async (req, res) => {
    //[Get] /classes/home
    try {
      const classes = await Classes.find({ ketThuc: false });
      const classesobj = classes.map((classs) => classs.toObject());
      res.status(200).render("./classes/classes", { classesobj });
    } catch (err) {
      res.status(400).json(err);
    }
  },
  classesManage: async (req, res) => {
    //[Get] /classes/classesManage
    try {
      res.set("Cache-Control", "no-store");
      const classes = await Classes.find({ ketThuc: false });
      const classesobj = classes.map((classs) => classs.toObject());
      res.status(200).render("./classes/classesManage", { classesobj });
    } catch (err) {
      res.status(400).json(err);
    }
  },
  classesStorage: async (req, res) => {
    //[Get] /class/classesManage
    try {
      res.set("Cache-Control", "no-store");
      const classes = await Classes.find({ ketThuc: true });
      const classesobj = classes.map((classs) => classs.toObject());
      res.status(200).render("./classes/classesStorage", { classesobj });
    } catch (err) {
      res.status(400).json(err);
    }
  },
  actionStateChange: async (req, res) => {
    //[Post] /classes/actionStateChange
    try {
      const classesId = req.body;
      for (const item of classesId) {
        const Class = await Classes.findById({ _id: item });
        await Class.updateOne({ $set: { ketThuc: !Class.ketThuc } });
      }
      res.status(200).json({
        toastMessage: "success",
      });
    } catch (err) {
      res.status(501).json({
        toastMessage: "error",
      });
    }
  },
  classCreate: async (req, res) => {
    //[Get] /classes/createClass
    try {
      res.status(200).render("./classes/classCreate");
    } catch (err) {
      res.status(400).json(err);
    }
  },
  classActionCreate: async (req, res) => {
    //[Post] /classes/actionCreate
    try {
      const newclass = new Classes(req.body);
      await newclass.save();
      res.status(200).json({
        redirectTo: "/classes/home",
        toastMessage: "success",
      });
    } catch (err) {
      res.status(501).json({
        redirectTo: "/classes/home",
        toastMessage: "error",
      });
    }
  },
  classEdit: async (req, res) => {
    //[Get] /classes/:id/editClass
    try {
      const Class = await Classes.findById(req.params.id);
      const Classobj = Class.toObject();
      res.status(200).render("./classes/classEdit", { Classobj });
    } catch (err) {
      res.status(404).render("partials/404", { content: "true" });
    }
  },
  classActionEdit: async (req, res) => {
    //[Post] /classes/:id/actionEdit
    try {
      await Classes.findByIdAndUpdate(req.params.id, { $set: req.body });
      res.status(200).json({
        redirectTo: "/classes/classesManage",
        toastMessage: "success",
      });
    } catch (err) {
      res.status(501).json({
        redirectTo: "/classes/classesManage",
        toastMessage: "error",
        //cần img khi cập nhật hình ảnh
        img: req.body.pathImg,
      });
    }
  },
  classEditImage: async (req, res) => {
    //[Get] /classes/:id/editImage
    try {
      const Class = await Classes.findById(req.params.id);
      const Classobj = Class.toObject();
      res.status(200).render("./classes/imageEdit", { Classobj });
    } catch (err) {
      res.status(404).render("partials/404", { content: "true" });
    }
  },
  actionDeleteImg: async (req, res) => {
    //[Get] /classes/actionDeleteImg
    try {
      const filePath =
        appRoot + `/source/material/assets/img/${req.body.value}`;
      // Sử dụng phương thức unlink() của module fs để xóa tệp
      fs.unlink(filePath, (err) => {
        if (err) {
          res.status(200).json({ toastMessage: "error" });
          return;
        }
        res.status(200).json({ toastMessage: "success" });
      });
    } catch (err) {
      res.status(400).json(err);
    }
  },
  addStudents: async (req, res) => {
    //[Get] /classes/:id/addStudents
    try {
      res.set("Cache-Control", "no-store");
      const Class = await Classes.findById({ _id: req.params.id });
      const classesobj = Class.toObject();
      const studentsId = Class.studentsID;
      const students = await Students.find();
      const filteredStudents = students.filter(
        (student) => !studentsId.includes(student._id)
      );
      const studentsobj = sort(filteredStudents, req).map((student) =>
        student.toObject()
      );
      res
        .status(200)
        .render("./classes/addStudents", { classesobj, studentsobj });
    } catch (err) {
      res.status(404).render("partials/404", { content: "true" });
    }
  },
  actionAddStudents: async (req, res) => {
    //[Post] /classes/:id/actionAddStudents
    try {
      const studentsId = req.body;
      let Class = await Classes.findById(req.params.id);
      //vòng lập for of sẽ chờ kết thúc await rồi mới chạy code phía sau
      for (const item of studentsId) {
        await Class.updateOne({ $push: { studentsID: item } });
        const student = await Students.findById(item);
        await student.updateOne({
          $push: {
            classesID: req.params.id,
            dungKhoaHoc: { classesId: req.params.id, value: false },
          },
        });
      }
      Class = await Classes.findById(req.params.id);
      await Class.updateOne({ soLuongHS: Class.studentsID.length });
      res.status(200).json({
        redirectTo: `/classes/${req.params.id}/classDetail`,
        toastMessage: "success",
      });
    } catch (err) {
      res.status(501).json({
        redirectTo: `/classes/${req.params.id}/classDetail`,
        toastMessage: "error",
      });
    }
  },
  classDetails: async (req, res) => {
    //[Get] /classes/:id/classDetail
    try {
      res.set("Cache-Control", "no-store");
      const Class = await Classes.findById({ _id: req.params.id }).populate(
        "studentsID"
      );
      const classesobj = Class.toObject();
      const students = Class.studentsID.filter((student) =>
        student.dungKhoaHoc.some(
          (attr) => attr.classesId == Class._id && attr.value === false
        )
      );
      const studentsobj = paging(sort(students, req), 10, req).map((student) =>
        student.toObject()
      );
      const totalPage = Math.ceil(students.length / 10);
      res.status(200).render("./classes/classDetail", {
        classesobj,
        studentsobj,
        totalPage,
      });
    } catch (err) {
      res.status(404).render("partials/404", { content: "true" });
    }
  },
  addleaveStudent: async (req, res) => {
    //[Get] /classes/:id/addLeaveStudent
    try {
      res.set("Cache-Control", "no-store");
      const Class = await Classes.findById({ _id: req.params.id }).populate(
        "studentsID"
      );
      const classesobj = Class.toObject();
      const students = Class.studentsID.filter((student) =>
        student.dungKhoaHoc.some(
          (attr) => attr.classesId == Class._id && attr.value === true
        )
      );
      const studentsobj = sort(students, req).map((student) =>
        student.toObject()
      );
      res
        .status(200)
        .render("./classes/addLeaveStudent", { classesobj, studentsobj });
    } catch (err) {
      res.status(404).render("partials/404", { content: "true" });
    }
  },
  actionAddleaveStudent: async (req, res) => {
    //[Post] /classes/:id/actionAddleaveStudent
    try {
      const studentsId = req.body;
      for (const item of studentsId) {
        const student = await Students.findById({ _id: item }).populate(
          "dungKhoaHoc"
        );
        const dungKhoaHoc = student.dungKhoaHoc;
        const index = dungKhoaHoc.findIndex(
          (item) => item.classesId == req.params.id
        );
        if (index !== -1) {
          dungKhoaHoc[index].value = false;
        }
        await student.updateOne({ $set: { dungKhoaHoc: dungKhoaHoc } });
      }
      res.status(200).json({
        redirectTo: `/classes/${req.params.id}/classDetail`,
        toastMessage: "success",
      });
    } catch (err) {
      res.status(501).json({
        redirectTo: `/classes/${req.params.id}/classDetail`,
        toastMessage: "error",
      });
    }
  },
};

module.exports = classesController;
