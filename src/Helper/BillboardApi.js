import billboard from "billboard-top-100";
import moment from "moment-timezone";

export const getHot100Api = async () => {
  let date = moment(new Date()).tz("America/New_York").format("YYYY-MM-DD");
  const res = new Promise((resolve, reject) => {
    billboard.getChart("hot-100", date, (err, chart) => {
      console.log(
        "getHot100Api was called",
        date,
        err,
        chart && chart.week ? chart.week : null
      );
      if (err) reject(err);
      else {
        resolve(chart);
      }
    });
  });
  return res;
};
