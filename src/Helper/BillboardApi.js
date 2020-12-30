import billboard from "billboard-top-100";

export const getHot100Api = async (date) => {
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
