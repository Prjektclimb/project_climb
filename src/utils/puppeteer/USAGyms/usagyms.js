import { Cluster } from "puppeteer-cluster";
import puppeteer from "puppeteer";

export const states = [
  "alabama",
    "alaska",
  //   "arizona",
  // "Arkansas",
  // "California",
  // "Colorado",
  // "Connecticut",
  // "Delaware",
  // "Florida",
  // "Georgia",
  // "Hawaii",
  // "Idaho",
  // "Illinois",
  // "Indiana",
  // "Iowa",
  // "Kansas",
  // "Kentucky",
  // "Louisiana",
  // "Maine",
  // "Maryland",
  // "Massachusetts",
  // "Michigan",
  // "Minnesota",
  // "Mississippi",
  // "Missouri",
  // "Montana",
  // "Nebraska",
  // "Nevada",
  // "New Hampshire",
  // "New Jersey",
  // "New Mexico",
  // "New York",
  // "North Carolina",
  // "North Dakota",
  // "Ohio",
  // "Oklahoma",
  // "Oregon",
  // "Pennsylvania",
  // "Rhode Island",
  // "South Carolina",
  // "South Dakota",
  // "Tennessee",
  // "Texas",
  // "Utah",
  // "Vermont",
  // "Virginia",
  // "Washington",
  // "West Virginia",
  // "Wisconsin",
  // "Wyoming"
];
//Function for parse addresss -- NOT USING yet
// const parseAddress = (address) => {
//   // Define a regular expression pattern to match street address, city, state, and zip code
//   const addressRegex = /(.+),\s*([^,]+),\s*([A-Za-z]+)\s*([\d-]+)?/;

//   // Use the regular expression to match the address
//   const match = address.match(addressRegex);

//   if (match) {
//     // Extract captured groups
//     const streetAddress = match[1].trim();
//     const city = match[2].trim();
//     const state = match[3].trim();
//     const zipCode = match[4] ? match[4].trim() : null;

//     // Create and return a JSON object
//     return {
//       streetAddress,
//       city,
//       state,
//       zipCode,
//     };
//   } else {
//     // Return null if the address does not match the expected pattern
//     return null;
//   }
// };

const url = "https://www.mountainproject.com/gyms/";

export const scrapeUSAGyms = async (state) => {
  // Launch the browser and open a new blank page
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();

  await page.waitForNetworkIdle();

  // Navigate the page to a URL
  const stateUrl = `${url}${state}`;
  await page.goto(stateUrl);

  const gymsData = await page.evaluate(() => {
    try {
      const gymLinks = Array.from(
        document.querySelectorAll(".table-striped tbody tr td:first-child a"),
      );
      const gymHrefs = gymLinks.map((link) => link.getAttribute("href"));

      return gymHrefs;
    } catch (error) {
      console.error(`Error scraping ${state}:`, error);
    }
    console.log("gym data", gymsData);
  });

  await browser.close();
  return gymsData;
};









const runScapeForStates = async () => {

//   const gymsUrl = await scrapeUSAGyms(states);

//   console.log(gymsUrl);

  const cluster = await Cluster.launch({
    concurrency: Cluster.CONCURRENCY_CONTEXT,
    maxConcurrency: 10,
    monitor: false,
    puppeteerOptions: {
      headless: true,
    },
  });

  cluster.on("taskerror", (err, data) => {
    console.error(`Error crawling ${data}: ${err.message}`);
  });

  // need to go into each link
  await cluster.task(async ({ page, data: gym }) => {
    try {
      await page.goto(gym);
      await page.waitForNetworkIdle();
      const data = await page.evaluate(() => {
        const gym = document.querySelector(
          "#climbing-gyms > div.row.pt-main-content > div > h1",
        );
        const mainNumber = document.querySelector(
          "#climbing-gyms > div:nth-child(2) > div.col-md-8.col-lg-9 > div.gym-overview > div.gym-info > div:nth-child(3)",
        );
        const website = document.querySelector(
          "#climbing-gyms > div:nth-child(2) > div.col-md-8.col-lg-9 > div.gym-overview > div.gym-info > div:nth-child(2) > a",
        );
        const address = document.querySelector(
          "#climbing-gyms > div:nth-child(2) > div.col-md-8.col-lg-9 > div.gym-overview > div.gym-info > div:nth-child(4) > a",
        )
        const state = document.querySelector("#climbing-gyms > div.row.pt-main-content > div > div > a:nth-child(2)")

        return {
          gym: gym?.innerText,
          state: state?.innerText, 
          number: mainNumber?.innerText,
          address: address?.innerText,
          website: website?.innerText,
        };
      });

      console.log("Gym Name:", data);
    } catch (error) {
      console.log("Error", error);
    }
  });

  for (const state of states) {
    const gymsUrl = await scrapeUSAGyms(state);
    for (const gym of gymsUrl) {
      await cluster.queue(gym);
    }
  }

  await cluster.idle();
  await cluster.close();
};

runScapeForStates();
