/*  Imports */
import { getPost, getPosts, getUrls } from '../fetch-utils.js';

/* DOM */
const postTitle = document.getElementById('title');
const postDescription = document.getElementById('description');
const postCategory = document.getElementById('category');
const postPrice = document.getElementById('price');
const gallery = document.getElementById('gallery');

/*  State  */
let error = null;
let post = null;
let urls = null;

/* Events */
window.addEventListener('load', async () => {
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get('id');
    const response = await getPost(id);

    error = response.error;
    post = response.data;
    if (error) {
        location.replace('/');
    } else {
        urls = await getUrls(post.id);

        displayPost();
    }
});

postCategory.addEventListener('click', () => {
    location.replace(`/?category=${post.category}`);
    getPosts(null, post.category);
});

/* Display */
function displayPost() {
    postTitle.textContent = post.title;
    postCategory.textContent = post.category;
    postDescription.textContent = post.description;
    postPrice.innerHTML = `Price (shipping included): $${post.price}`;
    for (let i = 0; i < urls.data.length; i++) {
        const imgs = document.createElement('img');
        imgs.classList.add('post-gallery-pics');
        imgs.src = urls.data[i].image_url;
        imgs.addEventListener('click', () => {
            imgs.requestFullscreen();
        });
        gallery.append(imgs);
    }
}

// data functions
// email function
