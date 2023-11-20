import { Cluster } from "puppeteer-cluster";
import puppeteer from "puppeteer";

import { createClient } from "@supabase/supabase-js";

const DATABASE_SUPABASE_URL = "https://zaedmhdsfypksviqybsm.supabase.co";
const DATABASE_SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InphZWRtaGRzZnlwa3N2aXF5YnNtIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTQ0Nzg5MDEsImV4cCI6MjAxMDA1NDkwMX0.p_vcRgkhMjxR5F_00YW_MZ13PoCvTdJywAZ2nySAzTU";

export const supabaseclient = createClient(
  DATABASE_SUPABASE_URL,
  DATABASE_SUPABASE_ANON_KEY,
);

function parseAddress(address) {
  if (typeof address !== "string" || !address.trim()) {
    // Return null for invalid or empty addresses
    return null;
  }

  // Define a regular expression pattern to match street address, city, state, and zip code
  const addressRegex =
    /(.+?)(?:\s+((?:Ste|Suite|#)\s*\d+))?,\s*([^,]+),\s*([A-Za-z]+)\s*([\d-]+)/;

  // Use the regular expression to match the address
  const match = address.match(addressRegex);

  if (match) {
    // Extract captured groups
    const street_address = match[1].trim();
    const suite = match[2] ? match[2].trim() : null;
    const city = match[3].trim();
    const state = match[4].trim();
    const zip_code = match[5].trim();

    // Create and return a JSON object
    return {
      street_address,
      suite,
      city,
      state,
      zip_code,
    };
  } else {
    // Return null if the address does not match the expected pattern
    return null;
  }
}

export const states = [
  "alabama",
  "alaska",
  "arizona",
  "arkansas",
  "california",
  "colorado",
  "connecticut",
  "delaware",
  "florida",
  "georgia",
  "hawaii",
  "idaho",
  "illinois",
  "indiana",
  "iowa",
  "kansas",
  "kentucky",
  "louisiana",
  "maine",
  "maryland",
  "massachusetts",
  "michigan",
  "minnesota",
  "mississippi",
  "missouri",
  "montana",
  "nebraska",
  "nevada",
  "new-hampshire",
  "new-jersey",
  "new-mexico",
  "new-york",
  "north-carolina",
  "north-dakota",
  "ohio",
  "oklahoma",
  "oregon",
  "pennsylvania",
  "rhode-island",
  "south-carolina",
  "south-dakota",
  "tennessee",
  "texas",
  "utah",
  "vermont",
  "virginia",
  "washington",
  "west-virginia",
  "wisconsin",
  "wyoming",
];


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
  const cluster = await Cluster.launch({
    concurrency: Cluster.CONCURRENCY_CONTEXT,
    maxConcurrency: 10,
    monitor: true,
    puppeteerOptions: {
      headless: true,
    },
  });

  cluster.on("taskerror", (err, data) => {
    console.error(`Error crawling ${data}: ${err.message}`);
  });

  const collectedData = [];

  // need to go into each link
  await cluster.task(async ({ page, data: gym }) => {
    try {
      await page.goto(gym);
      await page.waitForNetworkIdle();
      const data = await page.evaluate(() => {
        const gym = document.querySelector(
          "#climbing-gyms > div.row.pt-main-content > div > h1",
        )?.innerText;
        const mainNumber = document.querySelector(
          "#climbing-gyms > div:nth-child(2) > div.col-md-8.col-lg-9 > div.gym-overview > div.gym-info > div:nth-child(3)",
        )?.innerText;
        const website = document.querySelector(
          "#climbing-gyms > div:nth-child(2) > div.col-md-8.col-lg-9 > div.gym-overview > div.gym-info > div:nth-child(2) > a",
        )?.innerText;
        const address = document.querySelector(
          "#climbing-gyms > div:nth-child(2) > div.col-md-8.col-lg-9 > div.gym-overview > div.gym-info > div:nth-child(4) > a",
        )?.innerText;
        const state = document.querySelector(
          "#climbing-gyms > div.row.pt-main-content > div > div > a:nth-child(2)",
        )?.innerText;

        return {
          gym: gym,
          state: state,
          phone_number: mainNumber,
          address: address,
          website: website,
        };
      });

      if (data.gym !== undefined) {
        collectedData.push(data);
      }

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

  return collectedData;
};

const processGymData = async () => {
  const data = await runScapeForStates();

  if (data) {
    const processData = data.map((gym) => {
      const addressParsed = parseAddress(gym.address);

      return {
        ...gym,
        street_address: addressParsed?.street_address,
        suite: addressParsed?.suite,
        city: addressParsed?.city,
        state: addressParsed?.state,
        zip_code: addressParsed?.zip_code,
      };
    });
   return processData
  } else {
    console.log("No data");
  }
};

// processGymData();

async function upsertGyms() {
  try {
    const gyms = await processGymData();
    const { data, error } = await supabaseclient
      .from("Gym")
      .upsert(gyms, { onConflict: "gym", ignoreDuplicates: true }); 

    if (error) {
      console.error("Error pushing data to Supabase:", error);
    } else {
      console.log("Data pushed to Supabase successfully:");
    }
  } catch (error) {
    console.log("error processing data", error);
  }
}

upsertGyms()
