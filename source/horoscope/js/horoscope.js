import { Horoscope, saveHoroscope } from "./history.js";

const LANDING_PAGE = 'landing.html';
const HISTORY_PAGE = 'history.html';
const HOROSCOPE_PAGE = 'horoscope.html';

window.addEventListener('DOMContentLoaded', init);

async function init() {
    // initialization of elements relevant to fortunePage.html
    let save = document.getElementById('save-horo');
    let redo = document.getElementById('redo-horo');
    let fortuneElement = document.getElementById('horoscope-fortune');
    let backgroundVideo=document.getElementById("bgvideo-horo");
    let fortuneElementTitle = document.getElementById('horoscope-title');

    // begin horoscope animation upon opening site
    let date = localStorage.getItem('birthday');

    // if (window.location.href !== HOROSCOPE_PAGE) {
    //     return;
    // }

    if (backgroundVideo) {
        // backgroundVideo.setAttribute("src","https://github.com/ZhouYuantian/CSE110-Storge/raw/main/"+dateToHoroscope(date)+".mp4");
    }

    if (document.getElementById("output")) {
        startMove(document.getElementById("output"));
    }

    // get and load in the fortune as well as the sign
    if (fortuneElement) {
        fortuneElement.innerText = await getPrompt();
        fortuneElementTitle.innerText = dateToHoroscope(date);
    }

    // Add event listener for the save button
    if (save) {
        save.addEventListener('click', async () => {
            let bday = localStorage.getItem('birthday');
            let sign = dateToHoroscope(bday);
            let category = localStorage.getItem('category');
            let message = fortuneElement.innerText;
            let today = new Date();
            
            //save horoscope to local storage for sidebar
            let horoscopeElement = new Horoscope(sign, bday, today, message, category);
            saveHoroscope(horoscopeElement);
            window.location.href = HISTORY_PAGE;
        })
    }

    // Add event listener for the redo button
    if (redo) {
        redo.addEventListener('click', async () => {
            window.location.href = LANDING_PAGE;
        }) 
    }

    // function that parses the birthday and retreives the fortune from the json file
    async function getPrompt() {
        let promptDB;

        return new Promise(async (resolve, reject) => {
            await fetch('../json/horoResponses.json')
            .then(response => response.json())
            .then(data => {
                //parse json
                promptDB = JSON.parse(JSON.stringify(data));
                let date = localStorage.getItem('birthday');
                let sign = dateToHoroscope(date);
                let horoscopeprompt = promptDB[sign][localStorage.getItem('category')];
                let selectedPrompt = horoscopeprompt[Math.floor((Math.random() * horoscopeprompt.length)%horoscopeprompt.length)];
                resolve(selectedPrompt);
            })
            .catch(error => {
                console.error('Error:', error);
                reject(error);
            });  
        });
    }
}

/**
 * Called when you want to clear the horoscope on the main page
 */
function clearHoroscope() {

    let fortuneElement = document.getElementById('horoscope-fortune')
    fortuneElement.textContent = "Enter your birthday above and choose a category to see your daily horoscope!";
    
    let fortuneElementTitle = document.getElementById('horoscope-title');
    fortuneElementTitle.textContent = "Your Horoscope";
}

/**
 * Animates the opacity of a given element to fade in.
 * @param {HTMLElement} oDiv The element to animate
 */
function startMove(oDiv) {
    let alpha = 0;
    var timer = null;
    clearInterval(timer);
    timer = setInterval(function(){
        var speed = 1;               
        if(alpha == 100) {
            return;
        } else {
            alpha += speed;       
            oDiv.style.opacity = alpha/100; 
        }
    }, 30);
}

/**
     * Determines horoscope sign based on birthday
     * @param {string} dateString string representation of the date in form YYYY-MM-DD
     * @returns name of the zodiac sign
     */
function dateToHoroscope(dateString) {
    // Array of signs. Capricorn is repeated since it crosses the new year
    
    const zodiacSigns = [
        { name: "Capricorn", start: "01-01", end: "01-19" },
        { name: "Aquarius", start: "01-20", end: "02-18" },
        { name: "Pisces", start: "02-19", end: "03-20" },
        { name: "Aries", start: "03-21", end: "04-19" },
        { name: "Taurus", start: "04-20", end: "05-20" },
        { name: "Gemini", start: "05-21", end: "06-20" },
        { name: "Cancer", start: "06-21", end: "07-22" },
        { name: "Leo", start: "07-23", end: "08-22" },
        { name: "Virgo", start: "08-23", end: "09-22" },
        { name: "Libra", start: "09-23", end: "10-22" },
        { name: "Scorpio", start: "10-23", end: "11-21" },
        { name: "Sagittarius", start: "11-22", end: "12-21" },
        { name: "Capricorn", start: "12-22", end: "12-31" },
    ];

    // Find the correct sign object.
    // Date is 1 day off when printing to console because of time zone conversions.
    const date = new Date(dateString); 
    const year = dateString.substring(0,4);

    const matchingSign = zodiacSigns.find(sign => {
        const start = new Date(`${year}-${sign.start}`).getTime();
        const end = new Date(`${year}-${sign.end}`).getTime();
        const birthdayTime = date.getTime();
        return (birthdayTime >= start && birthdayTime <= end);
    });
    
    // Check if a sign is found
    return matchingSign ? matchingSign.name : "NO SIGN FOUND";
} 

export {dateToHoroscope, clearHoroscope}