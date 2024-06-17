const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const classSchema = new Schema(
  {
    tenMonHoc: { type: String, require: true },
    tenGiaoVien: { type: String, require: true },
    ngayDay: { type: String, require: true },
    gioBatDau: { type: String, require: true },
    gioKetThuc: { type: String, require: true },
    soLuongHS: { type: Number, min: 0, default: 0, require: true },
    hocPhi: { type: Number, min: 0, default: 0, require: true },
    ngayKhaiGiang: { type: String, require: true },
    pathImg:{ type: String,default:""},
    namHoc: { type: String, require: true },
    hocKi: { type: String, require: true },
    ketThuc: { type: Boolean, default: false },
    studentsID: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "students",
      },
    ],
  },
  { timestamps: true }
);

const studentSchema = new Schema({
  tenHocSinh: { type: String, require: true },
  diaChi: { type: String },
  soDienThoai: { type: String },
  email: { type: String },
  tenCha: { type: String },
  soDienThoaiCha: { type: String },
  tenMe: { type: String },
  soDienThoaiMe: { type: String },
  emailHocPhi: { type: Boolean },
  emailHoaDon: { type: Boolean },
  dungKhoaHoc: { type: Array, require: true },
  classesID: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "classes",
    },
  ],
  billsID: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "bills",
    },
  ],
},  { timestamps: true });

const billSchema = new Schema({
  studentsID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "students",
  },
  ChiTiet: { type: Array, require: true },
  ghiChu: { type: String, maxLength: 100 },
  tongTien: { type: Number, require: true },
  ngayDongHocPhi: { type: Date, require: true },
  phuongThucThanhToan: { type: String, require: true },
  CreateDay: { type: Date, default: Date.now},
});
const emailSchema = new Schema({
  billID: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "bills",
  },
  fromEmail: { type: String, require: true },
  toEmail: { type: String, require: true },
  type: { type: String, require: true },
  send: { type: Boolean, require: true },
  trangThai: { type: String, require: true },
  CreateDay: { type: Date, default: Date.now },
});

let Classes = mongoose.model("classes", classSchema);
let Students = mongoose.model("students", studentSchema);
let Bills = mongoose.model("bills", billSchema);
let Emails = mongoose.model("emails", emailSchema);
module.exports = { Classes, Students, Bills, Emails };
