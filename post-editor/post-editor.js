/* Imports */

import '../auth/user.js';
import { uploadImage, uploadImage2, createPost, getUser } from '../fetch-utils.js';
// import { getDateStamp } from '../calc-utils.js';

/* DOM */

const postForm = document.getElementById('post-form');
const errorDisplay = document.getElementById('error-display');
const imageInput = document.getElementById('image-input');
const preview = document.getElementById('preview');
const addButton = document.getElementById('add-button');
// const profileName = document.getElementById('profile-name');
// const userAvatar = document.getElementById('user-avatar');

/* State */

let error = null;
let user = null;
// let profile = {};

/* Events */

window.addEventListener('load', async () => {
    user = getUser();

    // profile = await getProfile(user.id);

    // profileName.textContent = '  ' + profile.data.username;
    // userAvatar.src = profile.data.url;
});

imageInput.addEventListener('change', () => {
    const file = imageInput.files[0];
    if (file) {
        preview.src = URL.createObjectURL(file);
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
    // works vvvvvvvvvvvvvvvvvvvvvvvvv

    // for (let i = 0; i < imageFile.length; i++) {
    //     // console.log('imageFile', imageFile[i]);

    //     console.log('imageFile[i].name', imageFile[i].name);
    // }

    // let url = null;
    // const randomFolder = Math.floor(Date.now() * Math.random());
    // const imagePath = `reddit-clone/${randomFolder}/${imageFile[0].name}`;
    // url = await uploadImage('project-images', imagePath, imageFile);
    // const time = getDateStamp();

    // works ^^^^^^^^^^^^^^^^^^^^^^^^
    //
    // fucking with vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv
    //
    let url = null;
    let urls = [];
    let imagePath = [];
    for (let i = 0; i < imageFile.length; i++) {
        // comment
        const randomFolder = Math.floor(Date.now() * Math.random());
        // const imagePath = `reddit-clone/${randomFolder}/${imageFile[0].name}`;
        imagePath.push('current/' + randomFolder + '/' + imageFile[i].name);

        url = await uploadImage('stress-less-glass', imagePath[i], imageFile[i]);

        urls.push(url);
        // console.log('urls: ', urls);
    }

    // const time = getDateStamp();

    const post = {
        category: formData.get('category'),
        title: formData.get('title'),
        description: formData.get('description'),
        image_url: url,
        // contact: formData.get('contact'),
        // image_url: urls[0],
        // time: time,
        // author: profile.data.id,
    };

    //fucking with ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
    //
    // works vvvvvvvvvvvvvvvvvvvvvvvvv
    //
    // const post = {
    //     category: formData.get('category'),
    //     title: formData.get('title'),
    //     description: formData.get('description'),
    //     contact: formData.get('contact'),
    //     image_url: url,
    //     time: time,
    //     author: profile.data.id,
    // };
    const response = await createPost(post);

    // console.log('response.data from createPost', response.data);
    // console.log('urls: ', urls);
    // console.log('urls: ' + urls + ' ' + 'response.data.id: ' + response.data.id);

    await uploadImage2(urls, response.data.id);
    // need another function to input data into the post-id-image table => post_id/ post(id)
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
