
import puppeteer from "puppeteer";
import 'dotenv/config'
import { createClient } from '@supabase/supabase-js'

const DATABASE_SUPABASE_URL='https://zaedmhdsfypksviqybsm.supabase.co' 
const DATABASE_SUPABASE_ANON_KEY ='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InphZWRtaGRzZnlwa3N2aXF5YnNtIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTQ0Nzg5MDEsImV4cCI6MjAxMDA1NDkwMX0.p_vcRgkhMjxR5F_00YW_MZ13PoCvTdJywAZ2nySAzTU'

export const supabaseclient = createClient(DATABASE_SUPABASE_URL, DATABASE_SUPABASE_ANON_KEY)


//WebScrapping for EventList, to be export into clusters.js to run mutiple clusters
export const scrapeEvents = async () => {
  // Launch the browser and open a new blank page
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();

  // Navigate the page to a URL
  await page.goto("https://usacresults.org");
  await page.waitForNetworkIdle();

  await page.screenshot({ path: "practice.png", fullPage: true });

  const eventListAll = await page.evaluate(() =>
    Array.from(document.querySelectorAll(".eventList li"), (e) => ({
      event: e.querySelector("a")?.innerText,
      resultsURL: e.querySelector("a")?.href,
    })),
  );

  await browser.close();
return eventListAll
}


// NEED to set up SUPABASE CLEINT AGAIN TO RUN UPSERT****** 

// async function upsertEvents() { 

//   const events = await scrapeEvents()

//   const { data, error } = await supabase.from('USAClimbingEvents').upsert(events, { onConflict: 'resultsURL', ignoreDuplicates: true})

//   if (error) {
//     console.error('Error pushing data to Supabase:', error, events);
//   } else {
//     console.log('Data pushed to Supabase successfully:');
//   }
// }

// upsertEvents()