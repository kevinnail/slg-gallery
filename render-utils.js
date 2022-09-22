export function renderAstrosignOption(astroSign) {
    const option = document.createElement('option');
    option.value = astroSign.name;
    option.textContent = astroSign.name;
    return option;
}

export function renderBeanie(beanie) {
    const li = document.createElement('li');
    li.classList.add('beanie-baby');

    const ul = document.createElement('ul');

    const li2 = document.createElement('li');

    const h2 = document.createElement('h2');
    // h2.textContent = beanie.title;
    h2.textContent = 'title';
    li2.append(h2);

    const li3 = document.createElement('li');
    // li3.textContent = beanie.animal;
    li3.textContent = 'li3';

    const li4 = document.createElement('li');
    // li5.textContent = beanie.birthday;
    li4.textContent = 'li4';

    const li5 = document.createElement('li');
    // li5.textContent = beanie.releaseDate;
    li5.textContent = 'li5';

    const li6 = document.createElement('li');
    // li5.textContent = beanie.releaseDate;
    li6.textContent = 'li6';

    const img = document.createElement('img');
    img.src = './assets/wireframe.png';

    ul.append(li2, li3, li4, li5, li6);
    li.append(ul, img);
    return li;
}
