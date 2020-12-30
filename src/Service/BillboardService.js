import { getHot100Api } from "../Helper/BillboardApi.js";
export const getHot100Service = async (date) => {
  const chart = await getHot100Api(date);
  console.log(chart);
  const thisWeek = chart.week;
  let email = chart.songs
    .map((song) => {
      return (
        "<tr><td>" +
        song.rank +
        ": " +
        song.title +
        " - " +
        song.artist +
        "</td></tr>"
      );
    })
    .reduce((acc, cur) => {
      return acc + cur;
    });
  email = `<h2>${"Week of " + chart.week}</h2><table>${email}</table>`;
  return { email, thisWeek };
};
