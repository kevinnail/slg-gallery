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

    const h32 = document.createElement('h3');
    h32.textContent = categoryEmoji(post.category);
    h32.classList.add('category');

    const img = document.createElement('img');

    img.classList.add('image-size');
    img.src = post.image_url;

    const p = document.createElement('p');
    post.description = truncateString(post.description, 90);
    p.textContent = post.description;

    li.append(h3, h32, img, p);
    return li;
}

function categoryEmoji(category) {
    if (category === 'Beads') return 'Beads';
    if (category === 'Blunt Tips') return 'Blunt Tips';
    if (category === 'Collabs') return 'Collabs';
    if (category === 'Cups') return 'Cups';
    if (category === 'Dry Pieces') return 'Dry Pieces';
    if (category === 'Goblets') return 'Goblets';
    if (category === 'Iso Stations') return 'Iso Stations';
    if (category === 'Marbles') return 'Marbles';
    if (category === 'Pendants') return 'Pendants';
    if (category === 'Bubblers') return 'Bubblers';
    if (category === 'Recyclers') return 'Recyclers';
    if (category === 'Rigs') return 'Rigs';
    if (category === 'Slides') return 'Slides';
    if (category === 'Spinner Caps') return 'Spinner Caps';
    if (category === 'Misc') return 'Misc';
    if (category === 'Terp Pearls') return 'Terp Pearls';
}
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
