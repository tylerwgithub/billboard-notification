import { getHot100Api } from "../Helper/BillboardApi.js";
export const getHot100Service = async () => {
  const chart = await getHot100Api();
  const thisWeek =
    chart.songs[0].title +
    chart.songs[0].artist +
    chart.songs[0].position.weeksOnChart;
  let email = chart.songs
    .map((song) => {
      return song.rank + ": " + song.title + " - " + song.artist;
    })
    .reduce((acc, cur) => {
      const element = `<tr><td>${cur}</td></tr>`;
      return acc + element;
    });
  email = "<table>" + email + "</table>";
  return { email, thisWeek };
};
