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

const cancelBtn = document.getElementById('cancel-button');

const checkBox = document.getElementById('check-box');
/* State */

let error = null;
let files = [];
let data = [];
let items = [];
let delItems = [];
let postUpdate = null;

/* Events */

window.addEventListener('load', async () => {
    const li = displayHeader();
    itemList.append(li);
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
        location.assign('/admin');
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
            location.assign('/admin');
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

cancelBtn.addEventListener('click', () => {
    location.assign('/admin');
});

// checkBox.addEventListener('change', async () => {
//     console.log('checkBox.checked from original event listener', checkBox.checked);

//     if (checkBox.checked) {
//         itemList.innerHTML = '';
//         const li = displayHeader();
//         itemList.append(li);
//         items = await getPosts();
//         data = items.data;

//         for (const item of data) {
//             const postEl = renderItem(item, items, delItems, true);
//             itemList.append(postEl);
//         }
//         // console.log('checkbox checked');
//     } else {
//         // console.log('checkbox not checked');
//     }
// });

//  Display functions

function displayError() {
    if (error) {
        errorDisplay.textContent = error.message;
    } else {
        errorDisplay.textContent = '';
    }
}

let checkedB = true;

function displayHeader() {
    const li = document.createElement('li');
    const input = document.createElement('input');

    input.checked = false;

    input.id = 'check-box';
    input.type = 'checkbox';
    if (checkedB) {
        input.value = false;
        checkedB = false;
    } else {
        input.checked = true;
        checkedB = true;
    }
    input.classList.add('check-box');

    input.addEventListener('click', async () => {
        // input.checked = false;
        itemList.innerHTML = '';
        const li = displayHeader();
        itemList.append(li);
        items = await getPosts();
        data = items.data;

        for (const item of data) {
            const postEl = renderItem(item, items, delItems, checkedB);
            itemList.append(postEl);
        }
        // displayHeader();
    });

    const p = document.createElement('p');
    p.classList.add('admin-titles2');
    p.classList.add('bold');
    p.textContent = 'Image';
    const p2 = document.createElement('p');
    p2.classList.add('admin-titles2');
    p2.classList.add('bold');

    p2.textContent = 'Title';
    const p3 = document.createElement('p');
    p3.classList.add('admin-titles2');
    p3.classList.add('bold');

    p3.textContent = 'Price';

    li.append(input, p, p2, p3);
    return li;
}
