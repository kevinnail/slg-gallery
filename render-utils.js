export function renderCategoryOption(astroSign) {
    const option = document.createElement('option');
    option.value = astroSign.name;
    option.textContent = astroSign.name;
    return option;
}

// export function renderPost(post) {
//     const li = document.createElement('li');
//     li.classList.add('posts'); // not created yet

//     const ul = document.createElement('ul');

//     const li2 = document.createElement('li');

//     const h2 = document.createElement('h2');
//     h2.textContent = post.title;
//     // h2.textContent = 'title';
//     li2.append(h2);

//     const li3 = document.createElement('li');
//     li3.textContent = post.description;
//     // li3.textContent = 'li3';

//     const li4 = document.createElement('li');
//     li4.textContent = post.category;
//     // li4.textContent = 'li4';

//     const li5 = document.createElement('li');
//     li5.textContent = post.birthday;
//     // li5.textContent = 'li5';

//     const li6 = document.createElement('li');
//     li6.textContent = post.releaseDate;
//     // li6.textContent = 'li6';

//     const img = document.createElement('img');
//     img.src = post.image;

//     ul.append(li2, li3, li4, li5, li6);
//     li.append(ul, img);
//     return li;
// }
export function renderPost(post) {
    const li = document.createElement('li');
    console.log('post', post);

    // const a = document.createElement('a');
    // a.href = `/post/?id=${post.id}`;

    const h3 = document.createElement('h3');
    h3.textContent = post.title;
    h3.classList.add('heading');

    const h32 = document.createElement('h3');
    h32.textContent = categoryEmoji(post.category);
    h32.classList.add('category');

    const img = document.createElement('img');

    img.classList.add('image-size');
    img.src = post.image_url;

    const p = document.createElement('p');
    post.description = truncateString(post.description, 100);
    // post.description = 'hi';
    p.textContent = post.description;

    // const p2 = document.createElement('p');
    // p2.textContent = 'Contact: ' + post.contact;
    // p2.classList.add('contact-info');

    // const p3 = document.createElement('p');
    // p3.textContent = `posted by ${profile} ${post.time}`;
    // p3.classList.add('posted-by');
    // add "time" column to posts table, access/ display here

    // a.append(h3, h32, img, p, p2);
    // li.append(a);
    // li.append(h3, h32, img, p, p2);
    li.append(h3, h32, img, p);
    return li;
}

function categoryEmoji(category) {
    if (category === 'Beads') return 'Beads';
    if (category === 'Blunt-tips') return 'Blunt Tips';
    if (category === 'Collabs') return 'Collabs';
    if (category === 'Cups') return 'Cups';
    if (category === 'Dry-pieces') return 'Dry Pieces';
    if (category === 'Goblets') return 'Goblets';
    if (category === 'Iso-stations') return 'Iso Stations';
    if (category === 'Marbles') return 'Marbles';
    if (category === 'Pendants') return 'Pendants';
    if (category === 'Bubblers') return 'Bubblers';
    if (category === 'Recyclers') return 'Recyclers';
    if (category === 'Rigs') return 'Rigs';
    if (category === 'Slides') return 'Slides';
    if (category === 'Spinner-caps') return 'Spinner Caps';
    if (category === 'Misc') return 'Misc';
    if (category === 'Terp-pearls') return 'Terp Pearls';
}
function truncateString(str, n) {
    if (str.length > n) {
        return str.substring(0, n) + '...';
    } else {
        return str;
    }
}
