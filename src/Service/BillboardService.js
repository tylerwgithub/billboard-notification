import { getHot100Api } from "../Helper/BillboardApi.js";
import { getChartEmail } from "../Template/ChartEmail.js";
export const getHot100Service = async (date) => {
  const chart = await getHot100Api(date);
  console.log(chart);
  const thisWeek = chart.week;
  let email = getChartEmail(chart);
  return { email, thisWeek };
};
