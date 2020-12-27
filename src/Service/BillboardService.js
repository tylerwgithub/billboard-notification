import billboard from "billboard-top-100";
export const getHot100 = async (lastWeek) => {
  let date = moment(new Date()).tz("America/New_York").format("YYYY-MM-DD");
  const res = new Promise((resolve, reject) => {
    billboard.getChart("hot-100", date, (err, chart) => {
      if (err) reject(err);
      const thisWeek =
        chart.songs[0].title +
        chart.songs[0].artist +
        chart.songs[0].position.weeksOnChart;
      if (lastWeek != thisWeek) {
        resolve({ chart, thisWeek, emailToBeSent: true });
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
