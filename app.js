/* Imports */
import { getBeanies, getAstroSigns } from './fetch-utils.js';
import { renderAstrosignOption, renderBeanie } from './render-utils.js';

/* Get DOM Elements */
const searchForm = document.getElementById('search-form');
const notificationDisplay = document.getElementById('notification-display');
const astrosignSelect = document.getElementById('astro-sign-select');
const beanieList = document.getElementById('beanie-list');

/* State */
let error = null;
let beanies = [];
let astroSigns = [];
let count = 0;
/* Events */

window.addEventListener('load', async () => {
    findBeanies();

    const astroSignOption = await getAstroSigns();
    astroSigns = astroSignOption.data;
    if (!error) {
        displayAstrosignOptions();
    }
});

async function findBeanies(title, astroSign) {
    const response = await getBeanies(title, astroSign);

    error = response.error;
    beanies = response.data;
    count = response.count;
    displayNotifications();
    if (!error) {
        displayBeanies();
    }
}

searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(searchForm);
    const title = formData.get('name');
    const astroSign = formData.get('astroSign');
    findBeanies(title, astroSign);
});

/* Display Functions */

function displayBeanies() {
    beanieList.innerHTML = '';
    for (const beanie of beanies) {
        const beanieEl = renderBeanie(beanie);
        beanieList.append(beanieEl);
    }
}

function displayAstrosignOptions() {
    for (const astroSign of astroSigns) {
        const option = renderAstrosignOption(astroSign);
        astrosignSelect.append(option);
    }
}

function displayNotifications() {
    if (error) {
        notificationDisplay.classList.add('error');
        notificationDisplay.textContent = error.message;
    } else {
        notificationDisplay.classList.remove('error');
        notificationDisplay.textContent = `Showing ${beanies.length} of ${count} beanies.`;
    }
}

// (don't forget to call any display functions you want to run on page load!)
