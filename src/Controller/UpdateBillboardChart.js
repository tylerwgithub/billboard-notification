import { getHot100 } from "../Service/BillboardService.js";
let lastWeek = "";
export const updateChart = async () => {
  try {
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
  } catch (error) {
    console.log(error);
  }
};
