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
    const subject = "Music Feed from Apakee";
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
    const subject = "Error from Apakee";
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
      if (createdUser) {
        const date = moment(new Date())
          .tz("America/New_York")
          .format("YYYY-MM-DD");
        const chart = await getHot100Service(date);
        console.log("this is chart", chart);
        const subject =
          "Thanks for your subscription! Here's the chart for current week.";
        sendEmail(email, subject, chart.email);
        console.log("A New User was Created: ", email);
        sendEmail(
          "tyelsr@gmail.com",
          `New User: ${email}`,
          `New User: ${email}`
        );
        res.send("Thanks for your subscription!");
      } else res.send("You are already subscribed!");
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
// const testdate = moment(new Date()).tz("America/New_York").format("YYYY-MM-DD");
// const testdate1 = moment(new Date())
//   .subtract(5, "days")
//   .tz("America/New_York")
//   .format("YYYY-MM-DD");
// console.log(testdate, testdate1);
