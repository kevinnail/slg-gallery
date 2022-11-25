export function renderCategoryOption(astroSign) {
    const option = document.createElement('option');
    option.value = astroSign.name;
    option.textContent = astroSign.name;
    return option;
}

export function renderPost(post) {
    const li = document.createElement('li');

    const h3 = document.createElement('h3');
    h3.textContent = post.title;
    h3.classList.add('heading');

    // const h32 = document.createElement('h5');
    // h32.textContent = categoryEmoji(post.category);
    // h32.classList.add('category');

    const img = document.createElement('img');
    img.classList.add('image-size');
    img.src = post.image_url;

    const p = document.createElement('p');
    post.description = truncateString(post.description, 90);
    p.textContent = post.description;

    // li.append(h3, img, h32, p);
    li.append(h3, img, p);
    return li;
}

// function categoryEmoji(category) {
//     if (category === 'Beads') return 'Beads';
//     if (category === 'Blunt Tips') return 'Blunt Tips';
//     if (category === 'Collabs') return 'Collabs';
//     if (category === 'Cups') return 'Cups';
//     if (category === 'Dry Pieces') return 'Dry Pieces';
//     if (category === 'Goblets') return 'Goblets';
//     if (category === 'Iso Stations') return 'Iso Stations';
//     if (category === 'Marbles') return 'Marbles';
//     if (category === 'Pendants') return 'Pendants';
//     if (category === 'Bubblers') return 'Bubblers';
//     if (category === 'Recyclers') return 'Recyclers';
//     if (category === 'Rigs') return 'Rigs';
//     if (category === 'Slides') return 'Slides';
//     if (category === 'Spinner Caps') return 'Spinner Caps';
//     if (category === 'Misc') return 'Misc';
//     if (category === 'Terp Pearls') return 'Terp Pearls';
// }
function truncateString(str, n) {
    if (str.length > n) {
        return str.substring(0, n) + '...';
    } else {
        return str;
    }
}

export function renderPreviews(file) {
    const li = document.createElement('li');
    const img = document.createElement('img');
    img.classList.add('preview');
    img.src = URL.createObjectURL(file);
    li.append(img);
    return li;
}

export function renderItem(item, items, delItems) {
    const data = items.data;
    const li = document.createElement('li');
    li.id = item.id;

    const input = document.createElement('input');
    input.type = 'checkbox';
    input.classList.add('check-box');
    input.addEventListener('click', () => {
        console.log('li.id: ', li.id);

        for (let i = 0; i < items.data.length; i++) {
            // console.log('firing... item.id: ', item.id);
            // console.log('firing... items.data[i].id: ', data[i].id);
            // console.log('firing... i: ', i);
            console.log('hello another i in the for loop:', i);

            if (item.id === data[i].id) {
                // console.log('ids matched: ', item.id);
                // console.log('!delItems.includes(item.id', `${!delItems.includes(item.id)}`);

                if (delItems.includes(item.id)) {
                    // console.log('delItems does NOT include item.id', delItems.includes(item.id));
                    delItems.splice(delItems.indexOf(item.id), 1);
                    console.log('includes item.id...', item.id);
                    console.log('delItems after splice...', delItems);
                } else {
                    // console.log('data before splice', data);
                    console.log('ELSE... so delItems.push(item.id here)...', item.id);
                    delItems.push(item.id);
                    console.log('delItems after push', delItems);
                }
                // console.log('data after splice', data);
            }
        }
    });

    const img = document.createElement('img');
    img.src = item.image_url;
    img.classList.add('admin-preview');

    const p = document.createElement('p');
    p.textContent = item.title;
    p.classList.add('admin-p');

    // li.append(input, img, p);
    li.append(input, img, p);
    return li;
}
