/* Imports */

import '../auth/user.js';
import { uploadImage, uploadImage2, createPost } from '../fetch-utils.js';
import { renderPreviews } from '../render-utils.js';

/* DOM */

const postForm = document.getElementById('post-form');
const errorDisplay = document.getElementById('error-display');
const imageInput = document.getElementById('image-input');
const preview = document.getElementById('preview');
const addButton = document.getElementById('add-button');
const previewList = document.getElementById('preview-list');

/* State */

let error = null;
let files = [];

/* Events */

window.addEventListener('load', async () => {});

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
        location.assign('/');
    }
});

/* Display Functions */

function displayError() {
    if (error) {
        errorDisplay.textContent = error.message;
    } else {
        errorDisplay.textContent = '';
    }
}
