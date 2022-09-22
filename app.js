/* Imports */
import { getBeanies } from './fetch-utils.js';
import { renderAstrosignOption, renderBeanie } from './render-utils.js';

/* Get DOM Elements */
const searchForm = document.getElementById('search-form');
const notificationDisplay = document.getElementById('notification-display');
const astrosignSelect = document.getElementById('astro-sign-select');
const beanieList = document.getElementById('beanie-list');

/* State */
let error = null;
let beanies = [];
/* Events */

window.addEventListener('load', async () => {
    findBeanies();
});

async function findBeanies(name, astroSign) {
    const response = await getBeanies();

    error = response.error;
    beanies = response.data;

    if (!error) {
        displayBeanies();
    }
}

/* Display Functions */

function displayBeanies() {
    beanieList.innerHTML = '';
    for (const beanie of beanies) {
        const beanieEl = renderBeanie(beanie);
        beanieList.append(beanieEl);
    }
}

// (don't forget to call any display functions you want to run on page load!)
