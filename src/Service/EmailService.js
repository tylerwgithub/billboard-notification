import nodemailer from "nodemailer";
let transporter = null;
if (!transporter) {
  transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "apakeetech@gmail.com",
      pass: "20201230",
    },
  });
}
export const sendEmail = async (recipients, subject, email) => {
  return await transporter.sendMail({
    from: '"Apakee" <apakeetech@gmail.com>', // sender address
    to: recipients ? recipients : "tyelsr@gmail.com", // list of receivers
    subject: subject, // Subject line
    html: email, // html body
  });
};
