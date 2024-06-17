const nodemailer = require("nodemailer");
const ejs = require("ejs");
const fs = require("fs");
const { formatDate } = require("../function-sever/formatTime");
require("dotenv").config();

const sendEmailService = async (sender,data) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.Email_UserName,
        pass: process.env.Email_PassWord,
      },
    });

    // Đọc file template EJS đồng bộ
    const template = fs.readFileSync("source/material/views/emails/emailTemplate.ejs", "utf-8");

    // Render template bằng EJS với dữ liệu
    const html = ejs.render(template,{data:data,PaymentDate:formatDate(data.ngayDongTien)});

    // Gửi email
    await transporter.sendMail({
      from: `"Lớp học thêm,dạy thêm" <${sender}>`, // Địa chỉ email người gửi
      to: data.studentData.email, // Địa chỉ email người nhận
      subject:data.tieuDe, // Chủ đề email
      html: html, // Nội dung HTML của email
    });

   return true
  } catch (error) {
    return false
  }
};

module.exports = { sendEmailService };
