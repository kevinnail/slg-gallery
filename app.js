/* Imports */
import { getPosts, getUser } from './fetch-utils.js';
import { renderPost } from './render-utils.js';

/* Get DOM Elements */
const searchForm = document.getElementById('search-form');
const postList = document.getElementById('post-list');
const categorySelect = document.getElementById('category-select');
const postEditorLink = document.getElementById('post-editor-link');

/* State */
let error = null;
let posts = [];
let user = getUser();
/* Events */

window.addEventListener('load', async () => {
    const searchParams = new URLSearchParams(location.search);
    const category = searchParams.get('category');
    if (!user) {
        postEditorLink.textContent = '';
    }
    if (category) {
        findPosts(null, category);
        await displayPosts();
        categorySelect.value = category;
        return;
    }
    findPosts();
});

async function findPosts(title, category) {
    const response = await getPosts(title, category);

    error = response.error;
    posts = response.data;

    if (!error) {
        displayPosts();
    }
}

searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(searchForm);
    const title = formData.get('title');
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
