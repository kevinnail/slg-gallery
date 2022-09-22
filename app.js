/* Imports */
// import { getBeanies, getAstrosigns } from './fetch-utils.js';
import { renderAstrosignOption, renderBeanie } from './render-utils.js';

/* Get DOM Elements */
const searchForm = document.getElementById('search-form');
const notificationDisplay = document.getElementById('notification-display');
const astrosignSelect = document.getElementById('astro-sign-select');
const beanieList = document.getElementById('beanie-list');

/* State */

/* Events */

/* Display Functions */

// (don't forget to call any display functions you want to run on page load!)
const x = renderBeanie('sdf');
beanieList.append(x);
