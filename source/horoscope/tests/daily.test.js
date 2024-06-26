// E2E Test for daily page
const SIGNNAMES = ['Aquarius', 'Pisces', 'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo', 'Libra', 'Scorpio', 'Sagittarius', 'Capricorn'];
const BASEURL = 'http://127.0.0.1:5500/source/horoscope/pages/'
describe('Test Daily page', () => {
   beforeAll(async () => {
      try {
         await page.goto(BASEURL + 'daily.html');
         console.log('Daily page loaded successfully');
      } catch (error) {
         console.error('Daily page load failed: ', error);
      }
   }, 30000);

   SIGNNAMES.forEach( async (sign) => {
      it(`Testing ${sign} reading`, async () => {
         const failedLoad = 'Failed to load daily reading.'
            let text = await page.$eval(`#${sign}-reading`, el => el.innerHTML);
            expect(text).not.toBe(failedLoad);
         }, 10000)
   })

   it('Navigate Back to Landing', async () => {
      await Promise.all([
         page.waitForNavigation(),
         page.click('#back')
      ]);

      let curUrl = await page.url();
      expect(curUrl).toBe(BASEURL + 'landing.html')
   })
});