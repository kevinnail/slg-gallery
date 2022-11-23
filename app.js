/* Imports */
import { getPosts, getUser } from './fetch-utils.js';
// import { renderCategoryOption, renderPost } from './render-utils.js';
import { renderPost } from './render-utils.js';

/* Get DOM Elements */
const searchForm = document.getElementById('search-form');
// const notificationDisplay = document.getElementById('notification-display');
// const categorySelect = document.getElementById('astro-sign-select');
const postList = document.getElementById('post-list');
const categorySelect = document.getElementById('category-select');
const postEditorLink = document.getElementById('post-editor-link');

/* State */
let error = null;
let posts = [];
let user = getUser();
// let category = [];
// let count = 0;
/* Events */

window.addEventListener('load', async () => {
    const searchParams = new URLSearchParams(location.search);
    const category = searchParams.get('category');
    if (!user) {
        // postEditorLink.classList.add('hide');
        postEditorLink.textContent = '';
    }
    if (category) {
        findPosts(null, category);
        await displayPosts();
        categorySelect.value = category;
        return;
    }
    findPosts();

    // const categoryOption = await getCategory();
    // category = categoryOption.data;
    // if (!error) {
    //     displayCategoryOptions();
    // }
});

async function findPosts(title, category) {
    const response = await getPosts(title, category);

    error = response.error;
    posts = response.data;
    // count = response.count;
    // displayNotifications();
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
    postList.innerHTML = '';
    for (const post of posts) {
        const postEl = renderPost(post);
        postEl.addEventListener('click', () => {
            location.assign(`/post/?id=${post.id}`);
        });
        postList.append(postEl);
    }
}

// function displayCategoryOptions() {
//     for (const categor of category) {
//         const option = renderCategoryOption(categor);
//         categorySelect.append(option);
//     }
// }

// function displayNotifications() {
//     if (error) {
//         notificationDisplay.classList.add('error');
//         notificationDisplay.textContent = error.message;
//     } else {
//         notificationDisplay.classList.remove('error');
//         notificationDisplay.textContent = `Showing ${posts.length} of ${count} Posts.`;
//     }
// }

// (don't forget to call any display functions you want to run on page load!)
