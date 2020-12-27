// const express = require("express");
import express from "express";
import billboard from "billboard-top-100";
import nodemailer from "nodemailer";
import moment from "moment-timezone";

const app = express();
app.listen(3000, () => {
  console.log("Server running on port 3000");
});

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "tongyutest@gmail.com",
    pass: "20201226",
  },
});

let lastWeek = "";
const getHot100 = async () => {
  let date = moment(new Date()).tz("America/New_York").format("YYYY-MM-DD");
  const res = new Promise((resolve, reject) => {
    billboard.getChart("hot-100", date, (err, chart) => {
      if (err) reject(err);
      const thisWeek =
        chart.songs[0].title +
        chart.songs[0].artist +
        chart.songs[0].position.weeksOnChart;
      if (lastWeek != thisWeek) {
        resolve({ chart, emailToBeSent: true });
      }
      lastWeek = thisWeek;
      //   const ranking =
      //     chart && chart.songs
      //       ? chart.songs.map((song) => {
      //           return song.rank + ": " + song.title + " - " + song.artist;
      //         })
      //       : "";
      resolve({ chart, emailToBeSent: false });
    });
  });
  return res;
};

const updateChart = async () => {
  const { chart, emailToBeSent } = await getHot100();
  if (emailToBeSent) {
    let email = chart.songs
      .map((song) => {
        return song.rank + ": " + song.title + " - " + song.artist;
      })
      .reduce((acc, cur) => {
        const element = `<tr><td>${cur}</td></tr>`;
        return acc + element;
      });
    const sentEmail = await transporter.sendMail({
      from: '"Tongyu Wang Tech" <tongyutest@gmail.com>', // sender address
      to: "tyelsr@gmail.com", // list of receivers
      subject: "Billboard Update Test", // Subject line
      html: `<table>${email}</table>`, // html body
    });
    console.log(sentEmail);
  }
};

setInterval(updateChart, 60 * 1000);

app.get("/", async (req, res, next) => {
  const { chart, emailToBeSent } = await getHot100();
  let email = chart.songs
    .map((song) => {
      return song.rank + ": " + song.title + " - " + song.artist;
    })
    .reduce((acc, cur) => {
      const element = `<tr><td>${cur}</td></tr>`;
      return acc + element;
    });
  if (emailToBeSent) {
    const sentEmail = await transporter.sendMail({
      from: '"Tongyu Wang Tech" <tongyutest@gmail.com>', // sender address
      to: "tyelsr@gmail.com", // list of receivers
      subject: "Billboard Update Test", // Subject line
      html: `<table>${email}</table>`, // html body
    });
    console.log(sentEmail);
  }
  res.send(email);
});
