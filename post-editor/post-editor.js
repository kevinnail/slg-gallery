/* Imports */

import '../auth/user.js';
import { uploadImage, uploadImage2, createPost, getPosts, deletePostById } from '../fetch-utils.js';
import { renderPreviews, renderItem } from '../render-utils.js';

/* DOM */

const postForm = document.getElementById('post-form');
const errorDisplay = document.getElementById('error-display');
const imageInput = document.getElementById('image-input');
const preview = document.getElementById('preview');
const addButton = document.getElementById('add-button');
const previewList = document.getElementById('preview-list');
const itemList = document.getElementById('item-list');
const deletePostBtn = document.getElementById('delete-post-button');

const input = document.createElement('input');

/* State */

let error = null;
let files = [];
let data = [];
let posts = [];
let items = [];
let delItems = [];
/* Events */

window.addEventListener('load', async () => {
    // const items = await getPosts();
    items = await getPosts();
    data = items.data;
    for (const item of data) {
        // input.type = 'checkbox';
        // input.classList.add('check-box');
        // input.addEventListener('click', () => {
        //     posts.push(item);
        //     console.log('item.id', item);
        //     itemList.append(input);
        // });
        const postEl = renderItem(item, items, delItems);
        itemList.append(postEl);
    }
});

imageInput.addEventListener('change', () => {
    files = imageInput.files;

    if (files) {
        for (const file of files) {
            const prevEl = renderPreviews(file);

            previewList.append(prevEl);
        }
    } else {
        preview.src = '../assets/pet-photo-placeholder.png';
    }
});

postForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    addButton.disabled = true;

    const formData = new FormData(postForm);
    let imageFile = [];
    imageFile = formData.getAll('image');
    imageFile.reverse();

    let url = null;
    let urls = [];
    let imagePath = [];
    for (let i = 0; i < imageFile.length; i++) {
        const randomFolder = Math.floor(Date.now() * Math.random());
        imagePath.push('current/' + randomFolder + '/' + imageFile[i].name);
        url = await uploadImage('stress-less-glass', imagePath[i], imageFile[i]);
        urls.push(url);
    }

    const post = {
        category: formData.get('category'),
        title: formData.get('title'),
        description: formData.get('description'),
        image_url: url,
        price: formData.get('price'),
    };

    const response = await createPost(post);

    await uploadImage2(urls, response.data.id);
    error = response.error;
    addButton.disabled = false;
    if (error) {
        displayError();
    } else {
        location.assign('/post-editor');
    }
});

deletePostBtn.addEventListener('click', async () => {
    itemList.innerHTML = '';
    await deletePostById(delItems);
    items = await getPosts();
    data = items.data;
    for (const item of data) {
        // input.type = 'checkbox';
        // input.classList.add('check-box');
        // input.addEventListener('click', () => {
        //     posts.push(item);
        //     console.log('item.id', item);
        //     itemList.append(input);
        // });
        const postEl = renderItem(item, items, delItems);
        itemList.append(postEl);
    }
});

function displayError() {
    if (error) {
        errorDisplay.textContent = error.message;
    } else {
        errorDisplay.textContent = '';
    }
}
