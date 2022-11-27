/* Imports */

import '../auth/user.js';
import {
    uploadImage,
    uploadImage2,
    createPost,
    getPosts,
    deletePostById,
    getPost,
    updatePost,
} from '../fetch-utils.js';
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
const editPostBtn = document.getElementById('edit-post-button');
const createPostBtn = document.getElementById('create-post-button');

const postDetails = document.getElementById('post-details');
const createUpdatePost = document.getElementById('create-update-post');

const editCat = document.getElementById('edit-cat');
const editTitle = document.getElementById('edit-title');
const editPrice = document.getElementById('edit-price');
const editDescription = document.getElementById('edit-description');
const formReset = document.getElementById('form-reset');

/* State */

let error = null;
let files = [];
let data = [];
let items = [];
let delItems = [];
let postUpdate = null;

/* Events */

window.addEventListener('load', async () => {
    items = await getPosts();
    data = items.data;
    for (const item of data) {
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

    if (postUpdate) {
        const post = {
            id: postUpdate,
            category: formData.get('category'),
            title: formData.get('title'),
            description: formData.get('description'),
            image_url: url,
            price: formData.get('price'),
        };
        await updatePost(post);
        location.assign('/post-editor');
    } else {
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
    }
});

editPostBtn.addEventListener('click', async () => {
    items = await getPosts();
    data = items.data;
    for (const item of data) {
        renderItem(item, items, delItems);
    }

    if (!delItems[1]) {
        postUpdate = delItems[0];
    } else {
        postUpdate = delItems[1];
    }

    const tempPost = await getPost(postUpdate);

    editCat.value = tempPost.data.category;
    editTitle.value = tempPost.data.title;
    editPrice.value = tempPost.data.price;
    editDescription.value = tempPost.data.description;

    postDetails.classList.add('hide');
    createUpdatePost.classList.remove('hide');
});

deletePostBtn.addEventListener('click', async () => {
    const confirmX = confirm('Are you SURE you want to delete the selected posts?');
    if (confirmX) {
        await deleteForReal();
        return true;
    } else {
        return false;
    }
});

async function deleteForReal() {
    itemList.innerHTML = '';
    await deletePostById(delItems);
    items = await getPosts();
    data = items.data;
    for (const item of data) {
        const postEl = renderItem(item, items, delItems);
        itemList.append(postEl);
    }
    editCat.value = null;
    editTitle.value = '';
    editPrice.value = '';
    editDescription.value = '';
}

formReset.addEventListener('click', () => {
    editCat.value = null;
    editTitle.value = '';
    editPrice.value = '';
    editDescription.value = '';
});

createPostBtn.addEventListener('click', () => {
    //     const postDetails = document.getElementById('post-details');
    // const createUpdatePost = document.getElementById('create-update-post');
    postDetails.classList.add('hide');
    createUpdatePost.classList.remove('hide');
});

//  Display functions

function displayError() {
    if (error) {
        errorDisplay.textContent = error.message;
    } else {
        errorDisplay.textContent = '';
    }
}
