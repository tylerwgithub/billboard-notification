export const getSubscribe = () => {
  return `<!DOCTYPE html>
    <html>
      <title>Subscribe</title>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css" />
      <body>
        <div
          class="w3-container w3-padding-64"
          id="contact"
          style="text-align: center"
        >
        <h2>Subscribe to Apakee</h2>
        <div>Get BB Hot100 update everyweek for free :)</div>
          <form
            action="https://apakee.com/user"
            target="_blank"
          >
            <p style="padding: 50px 5% 50px 5%">
              <input
                style="text-align: center"
                class="w3-input w3-padding-16"
                type="string"
                placeholder="Please enter your email address"
                required
                name="email"
              />
            </p>
            <p>
              <button class="w3-button w3-light-grey w3-section" type="submit">
                Subscribe
              </button>
            </p>
          </form>
          <div>This project is for personal learning purpose only.</div>
        </div>
      </body>
    </html>
    `;
};
