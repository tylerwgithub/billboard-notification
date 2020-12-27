import { getHot100Service } from "../Service/BillboardService.js";
import nodemailer from "nodemailer";
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "tongyutest@gmail.com",
    pass: "20201226",
  },
});
let lastWeek = "";
const helper = async () => {
  const { email, thisWeek } = await getHot100Service();
  if (lastWeek != thisWeek) {
    lastWeek = thisWeek;
    const sentEmail = await transporter.sendMail({
      from: '"Tongyu Wang Tech" <tongyutest@gmail.com>', // sender address
      to: "tyelsr@gmail.com", // list of receivers
      subject: "Billboard Update Test", // Subject line
      html: email, // html body
    });
    console.log("Chart Updated", sentEmail, thisWeek);
  } else {
    console.log("No Update", thisWeek);
  }
  return email;
};

export const getHot100 = async (req, res) => {
  try {
    const email = helper();
    res.send(email);
  } catch (error) {
    console.log(error);
    res.send(error);
  }
};

const updateChart = async () => {
  try {
    helper();
  } catch (error) {
    console.log(error);
  }
};
setInterval(updateChart, 10 * 60 * 1000);
