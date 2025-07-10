

import nodemailer from "nodemailer";

// Create a test account or replace with real credentials.
const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",// "smtp: là server smtp sử dụng cho giao thức smtp
  // port: 465,
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: "khanhnguyen0827@gmail.com",
    pass: "soozoltipypxqueo",
  },
});

const sendMail =  async (to) => {
  const info = await transporter.sendMail({
    from: '"Nqkhanh" <mkhanhnguyen0827@gmail.com>',// "from: la nguoi gui"
    to: to,// "to: la nguoi nhan"
    subject: "Hello ✔ Đăng nhập",// "subject: la tieu de"
    text: "Cảnh báo hoạt động", // Text body
    html: `<b>Cảnh báo hoạt động</b>`, // HTML body
  });

  console.log("Message sent:", info.messageId);
};

export default sendMail;