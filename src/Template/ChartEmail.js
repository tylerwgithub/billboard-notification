export const getChartEmail = (chart) => {
  let email = chart.songs
    .map((song) => {
      return (
        "<tr>" +
        `<tr><td style="border: 1px solid #dddddd">${song.rank}</td>` +
        `<td style="border: 1px solid #dddddd">${song.position.positionLastWeek}</td>` +
        `<td style="border: 1px solid #dddddd">${song.position.peakPosition}</td>` +
        `<td style="border: 1px solid #dddddd">${song.position.weeksOnChart}</td>` +
        `<td style="border: 1px solid #dddddd">${song.title}</td>` +
        `<td style="border: 1px solid #dddddd">${song.artist}</td></tr>`
      );
    })
    .reduce((acc, cur) => {
      return acc + cur;
    });
  return `<!DOCTYPE html>
  <html>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css" />
    <body>
      <div
        class="w3-container w3-padding-64"
        id="contact"
        style="text-align: center"
      >
        <h2>${"Week of " + chart.week}</h2>
        <table>
          <tr>
            <th
              style="
                width: 50px;
                border: 1px solid #dddddd;
                text-align: center;
                padding: 8px;
              "
            >
              This Week
            </th>
            <th
              style="
                width: 50px;
                border: 1px solid #dddddd;
                text-align: center;
                padding: 8px;
              "
            >
              Last Week
            </th>
            <th
              style="
                width: 50px;
                border: 1px solid #dddddd;
                text-align: center;
                padding: 8px;
              "
            >
              Peak
            </th>
            <th
              style="
                width: 50px;
                border: 1px solid #dddddd;
                text-align: center;
                padding: 8px;
              "
            >
              Weeks
            </th>
            <th
              style="
                width: 50px;
                border: 1px solid #dddddd;
                text-align: center;
                padding: 8px;
              "
            >
              Title
            </th>
            <th
              style="
                width: 50px;
                border: 1px solid #dddddd;
                text-align: center;
                padding: 8px;
              "
            >
              Artist
            </th>
          </tr>
          ${email}
        </table>
      </div>
    </body>
  </html>`;
};
