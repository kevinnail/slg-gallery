/* Imports */

import '../auth/user.js';
import { uploadImage, uploadImage2, createPost, getPosts } from '../fetch-utils.js';
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
    console.log('delItems on load', delItems);
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
        location.assign('/');
    }
});

deletePostBtn.addEventListener('click', async () => {
    // for (const item of posts) {
    // }
    // console.log('itemlist', itemList);

    console.log('delItems in delete event', delItems);
    // const x = removeDuplicates(delItems);
    // console.log('delItems after duplicate removal', x);
});

// function removeDuplicates(arr) {
//     var unique = [];
//     arr.forEach((element) => {
//         if (!unique.includes(element)) {
//             unique.push(element);
//         }
//     });
//     return unique;
// }
/* Display Functions */

function displayError() {
    if (error) {
        errorDisplay.textContent = error.message;
    } else {
        errorDisplay.textContent = '';
    }
}
