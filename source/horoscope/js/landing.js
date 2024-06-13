import { dateToHoroscope } from './horoscope.js';

const birthdayElement = document.getElementById('birthday-input');
const HOROSCOPE_PAGE = 'horoscope.html';
const HISTORY_PAGE = 'history.html'
const DAILY_PAGE = 'daily.html'
const LANDING_PAGE = 'landing.html';
// UNCOMMENT WHEN LOVE COMPATIBILITY PAGE IS READY
const LOVE_PAGE = 'compatibility.html';

window.addEventListener('DOMContentLoaded', init);
async function init() {
    console.log(LANDING_PAGE);

    const submit = document.getElementById('submit-horo');
    if (submit) {
        submit.addEventListener('click', button);
    }

    loadMenuListeners();
    // Load in the Birthday if stored
    let birthday = localStorage.getItem('birthday');
    if (birthday && birthdayElement) {
        birthdayElement.value = birthday 
    }

    // fr-ca to get date in YYYY-MM-DD set max day to Today
    if (birthdayElement) {
        birthdayElement.max = new Date().toLocaleDateString('fr-ca');
    }
}

/**
 * Adds all the event listeners for the menu
 */
function loadMenuListeners() {
        // Menu button
        const menu = document.getElementById('menu');
        menu.addEventListener('click', toggleDropdown);
        menu.addEventListener('keydown', function(event) {
            console.log(event.key);
            if (event.key === 'Enter' || event.key === ' ') {
                toggleDropdown();
            }
        });
    
        const landing = document.getElementById('landing-horoscope');
        landing.addEventListener('click', () => {
            clickDropdownPage(LANDING_PAGE);
        })
        landing.addEventListener('keydown', function(event) {
            if (event.key === 'Enter' || event.key === ' ') {
                clickDropdownPage(LANDING_PAGE);
            }
        });
    
        const daily = document.getElementById('daily-horoscope');
        daily.addEventListener('click', () => {
            clickDropdownPage(DAILY_PAGE);
        })
        daily.addEventListener('keydown', function(event) {
            if (event.key === 'Enter' || event.key === ' ') {
                clickDropdownPage(DAILY_PAGE);
            }
        });
    
        const love = document.getElementById('love-compatibility');
        love.addEventListener('click', () => {
            clickDropdownPage(LOVE_PAGE);
        })
        love.addEventListener('keydown', function(event) {
            if (event.key === 'Enter' || event.key === ' ') {
                clickDropdownPage(LOVE_PAGE);
            }
        });
    
        const history = document.getElementById('history');
        history.addEventListener('click', () => {
            window.location.href = HISTORY_PAGE;
        })
        history.addEventListener('keydown', function(event) {
            if (event.key === 'Enter' || event.key === ' ') {
                window.location.href = HISTORY_PAGE;
            }
        });
}

/**
 * runs on GO button click
 * adds proper values to local storage and redirects to horoscope page
 * @returns {void}
 */
function button() {
    let birthday = birthdayElement.value;

    //check if birthday is valid Alerts Given in function
    if (!checkValidBirthday(birthday)) {
        return;
    }

    let sign = dateToHoroscope(birthday);
    if (!checkValidSign(sign)) {
        return;
    }

    let categoryElement = document.querySelector('input[name="category"]:checked');
    if (!checkValidCategory(categoryElement)){
        return;
    };

    //save horoscope to local storage for sidebar
    localStorage.setItem('birthday', birthday);
    localStorage.setItem('sign', sign);
    localStorage.setItem('category', categoryElement.value);

    //redirect to horoscope page
    window.location.href = HOROSCOPE_PAGE;
}

/**
 * Checks if the birthday is valid
 * @param {string} birthday 
 * @returns {boolean} true if valid, false otherwise
 */
function checkValidBirthday(birthday) {
    if (birthday.length != 10 || birthday[4] != '-' || birthday[7] != '-') {
        alert('Please enter a valid date in the format MM/DD/YYYY');
    }
    else if (isNaN(Date.parse(birthday))) {
        alert('Please enter a valid date in the format MM/DD/YYYY');
    }
    else if (new Date(birthday) > new Date()) {
        alert('Please enter a valid date in the past');
    }
    else if (new Date(birthday) < new Date('1900-01-01')) {
        alert('Please enter a valid date after 1900');
    } else {
        return true;
    }
    return false;
}

/**
 * Checks if the sign is valid
 * @param {string} sign
 * @returns {boolean} true if valid, false otherwise
 */
function checkValidSign(sign) {
    if (sign === 'NO SIGN FOUND') {
        alert('Please enter a valid date');
        return false;
    }
    return true;
}

/**
 * Checks if the category is valid
 * @param {string} category
 * @returns {boolean} true if valid, false otherwise
 */
function checkValidCategory(category) {
    if (!category) {
        alert('Please select a category');
        return false;
    }
    return true;
}

/**
 * Toggles the navigation menu
 * @returns {void}
 */
function toggleDropdown() {
    const nav = document.querySelector('.dropdown');
    nav.style.display = (nav.style.display === 'block') ? 'none' : 'block';
}

/**
 * Redirects to the selected page
 * @param {string} page
 * @returns {void}
 */
function clickDropdownPage(page) {
    window.location.href = page;
}

export {checkValidSign, checkValidBirthday, loadMenuListeners}