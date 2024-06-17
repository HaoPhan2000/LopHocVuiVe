const { Emails } = require("../models/Model");
const { sendEmailService } = require("../services/EmailService");
const { sort } = require("../function-sever/sort");
const { searchTime } = require("../function-sever/search");
const emailsController = {
  index: async (req, res) => {
    //[Get] /emails/emailPage
    try {
      let emails;
      if (req.query.hasOwnProperty("_search")) {
        emails = await Emails.find(searchTime(req));
      } else if (req.query.hasOwnProperty("_sort")) {
        emails = sort(await Emails.find(), req);
      } else {
        emails = await Emails.find();
      }
      const emailsobj = emails.map((email) => email.toObject());
      res.status(200).render("emails/emails", { emailsobj });
    } catch (err) {
      res.status(404).render("partials/404", { content: "true" });
    }
  },
  sendBillEmail: async (req, res) => {
    //[Post] /emails/actionSendBillEmail
    const sendEmail = await sendEmailService(
      "trochoivuongquyen30012000@gmail.com",
      req.body
    );
    if (sendEmail) {
      try {
        const newEmail = new Emails({
          billID: req.body.billID,
          fromEmail: "trochoivuongquyen30012000@gmail.com",
          toEmail: req.body.studentData.email,
          type: "Biên lai học phí",
          trangThai: "Thành công",
          send: true,
        });
        await newEmail.save();
        res.status(200).json({ toastMessage: "success" });
      } catch {
        res.status(400).json({ toastMessage: "warning" });
      }
    } else {
      try {
        const newEmail = new Emails({
          billID: req.body.billID,
          fromEmail: "trochoivuongquyen30012000@gmail.com",
          toEmail: req.body.studentData.email,
          type: "Biên lai học phí",
          trangThai: "Thất bại",
          send: false,
        });
        await newEmail.save();
        res.status(200).json({ toastMessage: "error" });
      } catch {
        res.status(400).json({ toastMessage: "warning" });
      }
    }
  },
  sendRemindEmail: async (req, res) => {
    //[Post] /emails/actionsendRemindEmail
    try {
    } catch (err) {
      res.status(400).json(err);
    }
  },
};
module.exports = emailsController;
