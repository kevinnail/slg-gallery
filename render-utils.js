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

    const img = document.createElement('img');
    img.classList.add('image-size');
    img.src = post.image_url;

    const p = document.createElement('p');
    post.description = truncateString(post.description, 90);
    p.textContent = post.description;

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
        for (let i = 0; i < items.data.length; i++) {
            if (item.id === data[i].id) {
                if (delItems.includes(item.id)) {
                    delItems.splice(delItems.indexOf(item.id), 1);
                } else {
                    delItems.push(item.id);
                }
            }
        }
    });

    const img = document.createElement('img');
    img.src = item.image_url;
    img.classList.add('admin-preview');

    const a = document.createElement('a');
    a.href = `/post/?id=${item.id}`;
    a.classList.add('item-link');

    const p = document.createElement('p');
    p.textContent = item.title;
    p.classList.add('admin-p');
    a.append(p);

    const p2 = document.createElement('p');
    p2.textContent = `$${item.price}`;
    p2.classList.add('admin-p2');

    li.append(input, img, a, p2);
    return li;
}
