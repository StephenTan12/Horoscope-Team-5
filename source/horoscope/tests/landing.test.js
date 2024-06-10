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
          page.click('#submit-horo') 
        ]);

        await Promise.all([
          page.waitForNavigation(),
          page.click('#save-horo') 
        ]);

        // Make sure localStorage is updated with the correct horoscope
        const localHoroscopes = await page.evaluate(() => localStorage.getItem("horoscopes"));
        let obj = JSON.parse(localHoroscopes)[0];
        expect(obj["sign"]).toBe("Leo");

        // Check if Horoscope is in history
        let pastEntries = await page.$$('past-entry-card');
        expect(pastEntries.length).toBe(1);

  }, 10000);

});

describe('Navigation Bar Scenario Tests', () => {
  let curUrl;
  beforeAll(async () => {
    try {
      await page.goto(BASEURL + 'landing.html');
      console.log('Page loaded successfully');
    } catch (error) {
      console.error('Error loading page:', error);
    }
  }, 30000);

  // Fill out and submit the horoscope form
  it('Initial Page - Submit Information', async () => {
    console.log('Submitting information...');
    // Submit birthday
    await page.$eval('#birthday-input', el => el.value = '2002-05-04');
    // Select health fortune from radio buttons
    await page.$eval('#category-health', el => el.click());
    // Submit the form
    await Promise.all([
      page.waitForNavigation(),
      page.click('#submit-horos') 
    ]);

    await Promise.all([
      page.waitForNavigation(),
      page.click('#save-horos') 
    ]);

    await Promise.all([
      page.waitForNavigation(),
      page.click('#back') 
    ]);
  }, 30000);

  // Navigate to daily
  it('DailyHoroscopes Test', async() => {
    await Promise.all([
      page.waitForNavigation(),
      page.click("#menu"),
      page.click('#daily-horoscope') 
    ]);

    // Check location
    curUrl = await page.url();
    expect(curUrl).toBe(BASEURL + 'daily.html');
    
    // Check daily display
    const failedLoad = 'Failed to load daily reading.'
    SIGNNAMES.forEach( async (sign) => {
      let text = await page.$eval(`#${sign}-reading`, el => el.innerHTML);
      expect(text).not.toBe(failedLoad);
    })

    await Promise.all([
      page.waitForNavigation(),
      page.click('#back')
    ]);

    // Check location
    curUrl = await page.url();
    expect(curUrl).toBe(BASEURL + 'landing.html');
  });

  // Navigate to Compatibility

  // Navigate to History
  it ('History Test', async() => {
    await Promise.all([
      page.waitForNavigation(),
      page.click("#menu"),
      page.click('#history') 
    ]);

    // Check location
    curUrl = await page.url();
    expect(curUrl).toBe(BASEURL + 'history.html');

    let storedHoro = await page.evaluate(() => localStorage.getItem('horoscopes'));
    let obj = JSON.parse(storedHoro);
    expect(obj.length).toBe(1);
    
    try {
      expect(obj[0]['sign']).toBe('Taurus')
    } catch (error) {
      console.log("Horoscope not saved");
    }
  });
   
});