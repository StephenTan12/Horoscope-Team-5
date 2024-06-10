//E2E tests
const BASEURL = 'http://127.0.0.1:5500/source/horoscope/pages/';
describe('Test history page', () => {
   beforeAll(async () => {
      try {
         await page.goto(BASEURL + 'landing.html');
         console.log('Page loaded successfully');
      } catch (error) {
         console.error('Error loading page:', error);
      }

      }, 30000); //increased time for connection
      
   it('Horoscopes are Displayed on History Page', async () => {
         console.log('Generate fortune 3 times');
         for (let i=0; i < 3; i++) {
            // Submit birthday
            await page.$eval('#birthday-input', el => el.value = '2003-08-05');
            // Select health fortune from radio buttons
            await page.$eval('#category-health', el => el.click());
            // Submit the form 
            await Promise.all([
               page.waitForNavigation(),
               page.click('#submit-horo'),
            ]);
            await Promise.all([
               page.waitForNavigation(),
               page.click('#save-horo')
            ]);
            let storedHoro = await page.evaluate(() => localStorage.getItem('horoscopes'));
            let obj = JSON.parse(storedHoro);
            expect(obj.length).toBe(i + 1);

            let numElements = await page.$eval('#saved-list', el => el.childNodes.length);
            expect(numElements).toBe(i + 1);

            await Promise.all([
               page.waitForNavigation(),
               page.click('#back'),
            ]);
         }
   }, 10000);

   it('Test X.com Navigation', async () => {
      await Promise.all([
         page.waitForNavigation(),
         page.click('#menu'),
         page.click('#history')
      ]);

      let orgUrl = await page.url();

      await Promise.all([
         page.waitForNavigation(),
         page.$eval('past-entry-card', el => el.shadowRoot.querySelector('a').click())
      ])

      expect(await page.url()).not.toBe(orgUrl);

      await page.goto(BASEURL + 'history.html');
   },20000);

   it('Delete Single History Card', async ()=> {
      let numElementsBefore = await page.$eval('#saved-list', el => el.childNodes.length);
      console.log(numElementsBefore);

      console.log('Deleting the Card')
      await page.$eval('past-entry-card', el => el.shadowRoot.querySelector('.delete').click());
      
      let storedHoro = await page.evaluate(() => localStorage.getItem('horoscopes'));
      let obj = JSON.parse(storedHoro);
      expect(obj.length).toBe(numElementsBefore - 1);

      await page.reload()
      let numElements = await page.$eval('#saved-list', el => el.childNodes.length);
      expect(numElements).toBe(numElementsBefore - 1);
   }, 10000);

   
   it('Clearing All Horoscopes', async () => {
   console.log("Clear All...");

   await page.$eval("#clear-horos", button =>
      button.click()
   );

   // Make sure localStorage is updated
   const localHoroscopes = await page.evaluate(() => window.localStorage.getItem("horoscopes"));
   expect(localHoroscopes).toBe(null);

   await page.reload()
   let numElements = await page.$eval('#saved-list', el => el.childNodes.length);
   expect(numElements).toBe(0);
   }, 10000)


});