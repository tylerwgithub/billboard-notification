import { getHot100Service } from "../Service/BillboardService.js";
import nodemailer from "nodemailer";
import {
  getAllEmailsService,
  createUserService,
} from "../Service/DatabaseService.js";

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
    const recipients = await getAllEmailsService();
    const sentEmail = await transporter.sendMail({
      from: '"Tongyu Tech" <tongyutest@gmail.com>', // sender address
      to: recipients ? recipients : "tyelsr@gmail.com", // list of receivers
      subject: "Music Feed from Tongyu Tech", // Subject line
      html: email, // html body
    });
    console.log("Chart Updated", sentEmail, thisWeek);
  } else {
    await transporter.sendMail({
      from: '"Tongyu Tech" <tongyutest@gmail.com>', // sender address
      to: "tyelsr@gmail.com", // list of receivers
      subject: "No Update from Tongyu Tech", // Subject line
      html: email, // html body
    });
    console.log("No Update", thisWeek);
  }
  return email;
};

export const getHot100 = async (req, res) => {
  try {
    const email = await helper();
    res.send(email);
  } catch (error) {
    await transporter.sendMail({
      from: '"Tongyu Tech" <tongyutest@gmail.com>', // sender address
      to: "tyelsr@gmail.com", // list of receivers
      subject: "Error from Tongyu Tech", // Subject line
      html: error, // html body
    });
    console.log(error);
    res.send(error);
  }
};

export const createUser = async (req, res) => {
  try {
    const { email } = req.query;
    if (!email) throw new Error();
    else {
      const createdUser = await createUserService({ email: email });
      console.log("New User was Created: ", createdUser);
      res.send(createdUser);
    }
  } catch (error) {
    console.log("Fail to create user: ", error);
    res.send(error);
  }
};

const updateChart = async () => {
  try {
    await helper();
  } catch (error) {
    await transporter.sendMail({
      from: '"Tongyu Tech" <tongyutest@gmail.com>', // sender address
      to: "tyelsr@gmail.com", // list of receivers
      subject: "Error from Tongyu Tech", // Subject line
      html: error, // html body
    });
    console.log(error);
  }
};
// updateChart();
// setInterval(updateChart, 30 * 60 * 1000);
