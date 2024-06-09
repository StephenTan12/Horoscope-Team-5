import { Horoscope } from "./history.js";

const HYPERLINK = "https://stephentan12.github.io/Horoscope-Team-5/source/horoscope/pages/landing.html";

/**
 * Card displaying a past horoscope entry
 * 
 */
class pastEntryCard extends HTMLElement {
    constructor() {
        super();

        const shadow = this.attachShadow({ mode: "open" });

        const article = document.createElement('article');

        const style = document.createElement('link');
        style.setAttribute('rel', 'stylesheet');
        style.setAttribute('href', '../css/pastEntryCard.css');

        shadow.appendChild(style);
        shadow.appendChild(article); 
    }

    /**
     * Called when the .data property is set on this element
     * Reformats dates to be more readable and saves information to dataset
     * 
     * @param {Horoscope} data - The data to pass into <past-entry-card>, 
     *                          as a Horoscope object
     */
    set data(data) {
        //if nothing passed, return
        if (!data) return;

        const article = this.shadowRoot.querySelector('article');

        article.dataset.id = `${data.id}`;
        article.dataset.birthday = `${data.birthday}`;
        article.dataset.date = `${data.date}`;
        article.dataset.message = `${data.message}`;

        //reformat date from "YYYY-MM-DD" to dynamic date
        const date = new Date(data.date);
        const formattedDate = formatDynamicDate(date);

        //reformat birthday from "YYYY-MM-DD" to "MMM D, YYYY"
        let birthday = new Date(data.birthday);
        birthday = new Date(birthday.getTime() - birthday.getTimezoneOffset()*-60000);
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const birthdayDisplay = birthday.toLocaleDateString(undefined, options);

        const tweet = data.message + "  Get your fortune: " + HYPERLINK;

        /**
         * Display the image and name of the user's horoscope, 
         * as well as the birthday, date createdand category, and a delete button
         */
        article.innerHTML = `
        <img class="horo" src="../images/Horoscopes/${data.sign}.png"
            alt="${data.sign}">
        <span class="sign">${data.sign}</span>
        <span class="birthday">${birthdayDisplay}</span>
        <span class="date">${formattedDate}</span>
        <span class="category">${data.category}</span>
        <button class="delete" aria-label="Close alert" type="button">
            <span class="delete" aria-hidden="true">&#x2715;</span>         
        </button>
        <button class="copy" aria-label="Copy alert" type="button">
            <img class="copy" src="../images/copy.png" alt="copy"></img>
        </button>
        <a class="twitter-share-button"
        href="https://twitter.com/intent/tweet?text=${tweet}">
          <img class="twitter" src="../images/X_logo.png" alt="Tweet"></img>
        </a>
        <p class="message">
          ${data.message}
        </p>
        `;
    }

    /**
     * Called when the .data property is retrieved on this element
     */
    get data(){
        // Query the article so you can get the information from it
        const article = this.shadowRoot.querySelector('article');


        const sign = article.querySelector(".sign").textContent;
        const category = article.querySelector(".category").textContent;
        const message = article.dataset.message;
        const date = article.dataset.date;
        const birthday = article.dataset.birthday;
        
        let horoscope = new Horoscope(sign, birthday, date, message, category);
        return horoscope;
    }

    


}

/**
 * Formats a date in a dynamic format based on the elapsed time.
 * @param {Date} date - The input date to be formatted.
 * @returns {string} The formatted date string.
 */
function formatDynamicDate(date) {
    const now = new Date();
    const diff = now - date; // Difference in milliseconds
  
    // Time constants in milliseconds
    const oneMinute = 60 * 1000;
    const oneHour = 60 * oneMinute;
    const oneDay = 24 * oneHour;
    const oneWeek = 7 * oneDay;
  
    if (diff < oneMinute) {
      return 'Now';
    } else if (diff < oneHour) {
      const minutes = Math.floor(diff / oneMinute);
      return `${minutes} min ago`;
    } else if (diff < oneDay) {
      const hours = Math.floor(diff / oneHour);
      return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else if (diff < oneWeek) {
      const days = Math.floor(diff / oneDay);
      if (days === 1) {
        return 'Yesterday';
      } else {
        const options = { weekday: 'long' };
        return date.toLocaleDateString(undefined, options);
      }
    } else {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return date.toLocaleDateString(undefined, options);
    }
}


customElements.define('past-entry-card', pastEntryCard);
export { formatDynamicDate };