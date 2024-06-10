//E2E tests
const BASEURL = 'http://127.0.0.1:5500/source/horoscope/pages/'
describe('Basic user flow for Website', () => {
    beforeAll(async () => {
      try {
        await page.goto(BASEURL + 'landing.html');
        console.log('Page loaded successfully');
      } catch (error) {
        console.error('Error loading page:', error);
      }
    }, 30000); //increased time for connection


    // Fill out and submit the horoscope form
    it('Initial Page - Submit Information', async () => {
        console.log('Submitting information...');
        // Submit birthday
        await page.$eval('#birthday-input', el => el.value = '2003-08-05');
        // Select health fortune from radio buttons
        await page.$eval('#category-health', el => el.click());
        // Submit the form
        await Promise.all([
          page.waitForNavigation(),
          page.click('#submit') 
        ]);

        await Promise.all([
          page.waitForNavigation(),
          page.click('#save') 
        ]);

        // Make sure localStorage is updated with the correct horoscope
        const localHoroscopes = await page.evaluate(() => localStorage.getItem("horoscopes"));
        let obj = JSON.parse(localHoroscopes)[0];
        expect(obj["sign"]).toBe("Leo");

        // Check if Horoscope is in history
        let pastEntries = await page.$$('past-entry-card');
        expect(pastEntries.length).toBe(1);


  }, 10000);

  it('Clearing Horoscopes', async () => {
    console.log("Clearing information...");
    //Clear horoscopes
    //let button = page.$("#clear-horos");
    await page.$eval("#clear-horos", button =>
        button.click()
    );

    // Make sure localStorage is updated
    const localHoroscopes = await page.evaluate(() => window.localStorage.getItem("horoscopes"));
    expect(localHoroscopes).toBe(null);
  }, 10000)
});

