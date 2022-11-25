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

const editCat = document.getElementById('edit-cat');
const editTitle = document.getElementById('edit-title');
const editPrice = document.getElementById('edit-price');
const editDescription = document.getElementById('edit-description');

const input = document.createElement('input');

/* State */

let error = null;
let files = [];
let data = [];
let posts = [];
let items = [];
let delItems = [];
let post = null;
let postUpdate = null;
/* Events */

window.addEventListener('load', async () => {
    const searchParams = new URLSearchParams(location.search);
    const id = searchParams.get('id');
    const response = await getPost(id);

    error = response.error;
    post = response.data;
    if (error) {
        // location.replace('/');
        // console.log('error', error);
    } else {
        // urls = await getUrls(post.id);
        // displayPostEdit();
    }
    console.log('post in window load', post);

    items = await getPosts();
    data = items.data;
    for (const item of data) {
        const postEl = renderItem(item, items, delItems);
        itemList.append(postEl);
    }
});

// function displayPostEdit() {
//     location.replace(`/`)
// }

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
        id: postUpdate,
        category: formData.get('category'),
        title: formData.get('title'),
        description: formData.get('description'),
        image_url: url,
        price: formData.get('price'),
    };
    if (postUpdate) {
        await updatePost(post);
    } else {
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
        // const postEl = renderItem(item, items, delItems);
        renderItem(item, items, delItems);
    }

    postUpdate = delItems[0];
    console.log('post in edit button', postUpdate);

    const tempPost = await getPost(delItems[0]);

    // console.log('tempPost.data.id', tempPost.data.id);
    // console.log('post', post);

    editCat.value = tempPost.data.category;
    editTitle.value = tempPost.data.title;
    editPrice.value = tempPost.data.price;
    editDescription.value = tempPost.data.description;
    // location.replace(`/post-editor/?id=${post.id}`);
});

deletePostBtn.addEventListener('click', async () => {
    itemList.innerHTML = '';
    await deletePostById(delItems);
    items = await getPosts();
    data = items.data;
    for (const item of data) {
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
