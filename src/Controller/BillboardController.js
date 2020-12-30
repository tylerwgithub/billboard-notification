import { getHot100Service } from "../Service/BillboardService.js";
import {
  getAllEmailsService,
  createUserService,
  createWeekService,
} from "../Service/DatabaseService.js";
import { sendEmail } from "../Service/EmailService.js";
import moment from "moment-timezone";

const helper = async () => {
  const date = moment(new Date()).tz("America/New_York").format("YYYY-MM-DD");
  const { email, thisWeek } = await getHot100Service(date);
  const isWeekCreated = await createWeekService(thisWeek);
  if (isWeekCreated) {
    const subject = "Music Feed from Tongyu Tech";
    const recipients = await getAllEmailsService();
    const sentEmail = await sendEmail(recipients, subject, email);
    console.log(
      "Chart Updated, current week: ",
      thisWeek,
      isWeekCreated,
      sentEmail
    );
  } else {
    console.log("No Update, current week: ", thisWeek, isWeekCreated);
  }
  return email;
};

export const getHot100 = async (req, res) => {
  try {
    const email = await helper();
    res.send(email);
  } catch (error) {
    const recipients = "tyelsr@gmail.com";
    const subject = "Error from Tongyu Tech";
    const email = error;
    const sentEmail = await sendEmail(recipients, subject, email);
    console.log(sentEmail);
    res.send(sentEmail, error);
  }
};

export const createUser = async (req, res) => {
  try {
    const { email } = req.query;
    if (!email) throw new Error();
    else {
      const createdUser = await createUserService(email);
      console.log("New User was Created: ", createdUser);
      const recipients = "tyelsr@gmail.com";
      const subject = `New User: ${email}`;
      sendEmail(recipients, subject, "Haha");
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
