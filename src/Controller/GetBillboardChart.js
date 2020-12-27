export const getHot100 = (app) => {
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
};
