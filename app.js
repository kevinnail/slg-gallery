/* Imports */
import { getPosts, getCategory } from './fetch-utils.js';
import { renderCategoryOption, renderPost } from './render-utils.js';

/* Get DOM Elements */
const searchForm = document.getElementById('search-form');
const notificationDisplay = document.getElementById('notification-display');
const categorySelect = document.getElementById('astro-sign-select');
const beanieList = document.getElementById('beanie-list');

/* State */
let error = null;
let posts = [];
let category = [];
let count = 0;
/* Events */

window.addEventListener('load', async () => {
    findPosts();

    const categoryOption = await getCategory();
    category = categoryOption.data;
    if (!error) {
        displayCategoryOptions();
    }
});

async function findPosts(title, category) {
    const response = await getPosts(title, category);

    error = response.error;
    posts = response.data;
    count = response.count;
    displayNotifications();
    if (!error) {
        displayPosts();
    }
}

searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(searchForm);
    const title = formData.get('name');
    const category = formData.get('category');
    findPosts(title, category);
});

/* Display Functions */

function displayPosts() {
    beanieList.innerHTML = '';
    for (const post of posts) {
        const beanieEl = renderPost(post);
        beanieList.append(beanieEl);
    }
}

function displayCategoryOptions() {
    for (const categor of category) {
        const option = renderCategoryOption(categor);
        categorySelect.append(option);
    }
}

function displayNotifications() {
    if (error) {
        notificationDisplay.classList.add('error');
        notificationDisplay.textContent = error.message;
    } else {
        notificationDisplay.classList.remove('error');
        notificationDisplay.textContent = `Showing ${posts.length} of ${count} Posts.`;
    }
}

// (don't forget to call any display functions you want to run on page load!)
