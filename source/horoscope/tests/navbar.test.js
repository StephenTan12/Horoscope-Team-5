const BASEURL = 'http://127.0.0.1:5500/source/horoscope/pages/'
const SIGNNAMES = ['Aquarius', 'Pisces', 'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn'];

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
    it('Initial Page - Submit Information', async () => {
      await Promise.all([
        page.waitForNavigation(),
        page.click("#menu"),
        page.click('#compatibility') 
      ]);
  
      // Check location
      curUrl = await page.url();
      expect(curUrl).toBe(BASEURL + 'compatibility.html');
  
      console.log('Submitting information...');
      // Submit birthday
      await page.$eval('#birthday-input1', el => el.value = '2003-02-20');
      await page.$eval('#birthday-input2', el => el.value = '2003-09-10');
  
      // Submit the form
      await Promise.all([
        page.waitForNavigation(),
        page.click('#submit-compatibility') 
      ]);
  
      await Promise.all([
        page.waitForNavigation(),
        page.click('#save-compatibility') 
      ]);
    }, 10000);
  
  
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
    }, 10000);
  });