## CSE 112 SP23 Team 5 Onboard Horoscope Project

This `onboard.md` serves as the detailed discussion of building or onboarding our application product for our horoscope project.

## To navigate our application [HOROSCOPE APP](https://stephentan12.github.io/Horoscope-Team-5/source/horoscope/pages/landing.html)
Note: You can also generate documentation of the code automatically using `npm run docgen`. This will create a folder `docs` in your project directory that contains all documented/commented code.

### How to Use our Website/APP:
- Overall web page flow with a dropdown menu placed at the top right corner on main landing page {4 sections: Horoscope / Love Compatibility / Daily Horoscope / History}:
  > Horoscope (main landing page itself) where it allows you to input your birthday and select between 3 main categories (love/health/career):
    - After clicking "START" button, it would directly you to reading production page based on the birthday/category inputted (the readings will be displayed at the bottom of the web page);
    - Then, the users have two choices:
      - If the green "REDO" button on top being selected, then direct back to previous Horoscope page if they do not want to save the reading
        - Redo the Horoscope reading or access other web pages listed under dropdown menu   
      - If the yellow "SAVE" button on top being selected, then direct further to next History page if they like and want to save the reading
        - Go to History page to have more controls over the horoscope reading database
          - Direct back to main Horoscope page by clicking "Back to Main Page" button on top left  
  > Love Compatibility:
    - The overall flow will be exactly similar to what single horoscope reading does. The only difference is that you are able to input two valid birthdays in the beginning to compare and the reading produced would be the high compatibility between the two horoscopes (ex. "Taurus + Scorpio")
  > Daily Horoscope:
    - This web page will display the daily horoscope readings for 12 horoscopes for you to read them over on one page
      - Direct back to main Horoscope page by clicking "Back to Main Page" button on top left
  > History:
    - This web page serves as a database for all horoscope readings saved by the users
      - Delete all readings by clicking "Clear All" on top right
      - For each single reading card, you can delete single reading by clicking small cross mark on the top, share one specific reading to Twitter, or even copy it to clipboard
      - Direct back to main Horoscope page by clicking "Back to Main Page" button on top left

- Additional Functionality with options to users:
  - Background audio button is positioned at the left bottom corner on the main landing page in the beginning;
  - If the users select to turn the background music on, the audio will continue with a fluent sound (ex. continue from at where it is stopped from previous page when switching between different web pages);
  - For user protections (avoid too large sounds), the background audio will be turned off automatically when opening/refreshing a new landing web page; it would only be turned on if the users choose to click the sound on

### How to Navigate the Repository：
1. To navigate our [codes](https://github.com/StephenTan12/Horoscope-Team-5/tree/main/source);
   - Under "StephenTan12/Horoscope-Team-5/source/horoscope", it directs you to our code sections:
     - All HTML files for building up each web page "[pages](https://github.com/StephenTan12/Horoscope-Team-5/tree/main/source/horoscope/pages)" (including landing.html, horopscope.html, history.html, daily.html, compatibility.html, and compatibility-results.html);
     - All CSS files for designing and styling each web page "[css](https://github.com/StephenTan12/Horoscope-Team-5/tree/main/source/horoscope/css)" (including imported "fonts" folder, landing.css, horoscope.css, history.css, daily.css, compatibility.css, pastEntryCard.css, and debug.css);
     - All JavaScript files for adding functionalities and actions on each web page "[js](https://github.com/StephenTan12/Horoscope-Team-5/tree/main/source/horoscope/js)" (including landing.js, horoscope.js, history.js, daily.js, compatibility.js, compatibility-results.js, pastEntryCard.js, and audioControl.js);
     - All JSON files "[json](https://github.com/StephenTan12/Horoscope-Team-5/tree/main/source/horoscope/json)" (including compatibilityResponses.json and horoResponses.json);
     - All Image elements "[images](https://github.com/StephenTan12/Horoscope-Team-5/tree/main/source/horoscope/images)" (including a folder for all 12 horoscope symbols, and other background/button images);
     - All Audio elements "[audios](https://github.com/StephenTan12/Horoscope-Team-5/tree/main/source/horoscope/audios)" (including bgm_cornfield_chase_.mp3)
2. To navigate our [tests](https://github.com/StephenTan12/Horoscope-Team-5/tree/main/source/horoscope/tests) (including landing.test.js, history.test.js, daily.test.js, compatibility.test.js, pastEntryCard.test.js, navbar.test.js, and unit.test.js);
3. To navigate our [documentations](https://github.com/StephenTan12/Horoscope-Team-5/tree/main/admin) and other important artifacts;
4. To navigate our [ci/cd pipelines](https://github.com/StephenTan12/Horoscope-Team-5/tree/main/admin/cipipeline);
5. To navigate our initial web page designs/drawings for mobile and web settings [designs/drawings](https://github.com/StephenTan12/Horoscope-Team-5/tree/main/admin/CSE112);
6. To navigate our weekly work plans for 6 weeks: [workplan-06052024.md](https://github.com/StephenTan12/Horoscope-Team-5/blob/main/workplan-06052024.md), [workplan-13052024.md](https://github.com/StephenTan12/Horoscope-Team-5/blob/main/workplan-13052024.md), [workplan-20052024.md](https://github.com/StephenTan12/Horoscope-Team-5/blob/main/workplan-20052024.md), [workplan-27052024.md](https://github.com/StephenTan12/Horoscope-Team-5/blob/main/workplan-27052024.md), [workplan-03062024.md](https://github.com/StephenTan12/Horoscope-Team-5/blob/main/workplan-03062024.md), and [workplan-09062024.md](https://github.com/StephenTan12/Horoscope-Team-5/blob/main/workplan-09062024.md);
7. To navigate our [readme.md file](https://github.com/StephenTan12/Horoscope-Team-5/blob/main/README.md).



### CSE110 Old Version APP Problems:
- Put both reading database and selecting category into one single page, making the UI looks a little bit messy
- Horoscope with unreasonable/invalid birthday input (ex. YYYY could be traced back to "1000")
- No "start" button to direct the web page, when selecting a category (ex. love) inside dropdown button, it would automatically output the reading even though the users might have not decided their right categories yet
- The history page only shows the information of horoscope and reading paragraph

### CSE110 Old Version with Good Features Remained in Our APP:
- Good design for video visual effects showing when outputting a reading
- Good design of the reading panel

### CSE112 Updated Version with New Innovative Features/Functionalities:
- Added designs for both mobile and web settings
- Added dropdown menu button on the main landing page in order to direct back and forth between multiple web pages, making the page flow more fluent
- Horoscope with more reasonable/valid birthday input (ex. YYYY could only be traced back to "1900")
- Added daily horoscope readings web page for all horoscopes
- Added love compatibility horoscope with allowance of entering two birthday inputs
- Able to save/delete single reading or clear all readings
- Added functionalities and controls over the pastry card reading database, such as sharing on Twitter("X") or copying to clipboard with more information being added (ex. time added, birthday input, category selected,...)
- Integrated background audio element from the movie "Interstellar" [cornfield_chase]
- More JS error robustness handlings (ex. shows error input if either the users do not input a birthday or not selecting a category)
- Improved UI/UX web page and pastry card reading database styling/fonts designs (highlight as hovering category buttons) and more fluent flows of utilizing the web pages (ex. added "start", "redo", "save", and "back to main page" buttons...)

### Future Work Prospected:
- Create a more robust database to pull readings from
- Create an account system for users to save/share between their friends
