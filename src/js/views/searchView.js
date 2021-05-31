import { elements } from "./base";

export const getInput = () => elements.searchInput.value;
export const clearInput = () => {
    elements.searchInput.value = '';
};

export const clearResults = () => {
    elements.searchResList.innerHTML = '';
    elements.searchResPages.innerHTML = '';
};

export const highlightSelected = id => {
    const resultsArr = Array.from(document.querySelectorAll('.results__link'));
    resultsArr.forEach(el => {
        el.classList.remove('results__link--active');
    });
    document.querySelector(`.results__link[href*="${id}"]`).classList.add('results__link--active');
};

const getRecipeTitle = (recipeTitle, lim = 17) => {
    if (recipeTitle.length <= lim) return recipeTitle;
    const newTitle = [];
    recipeTitle.split(' ').reduce((acc, cur) => {
        if (acc + cur.length <= lim) newTitle.push(cur);
        return acc + cur.length;
    }, 0);
    return `${newTitle.join(' ')} ...`
}

const renderRecipe = recipe => {
    const markup = `
        <li>
            <a class="results__link results__link--active" href="#${recipe.recipe_id}">
                <figure class="results__fig">
                    <img src="${recipe.image_url}" alt="${recipe.title}">
                </figure>
                <div class="results__data">
                    <h4 class="results__name">${getRecipeTitle(recipe.title)}</h4>
                    <p class="results__author">${recipe.publisher}</p>
                </div>
            </a>
        </li>
    `;
    elements.searchResList.insertAdjacentHTML('beforeend', markup);
};


const createButton = (page, type) => `
            <button class="btn-inline results__btn--${type}" data-goto=${page}>
                    <svg class="search__icon">
                        <use href="img/icons.svg#icon-triangle-${type === 'prev' ? 'left' : 'right'}"></use>
                    </svg>
                    <span>Page ${page}</span>
            </button>`;

const renderButtons = (page, numResults, resPerPage=10) => {
    let button;
    const pages = Math.ceil(numResults / resPerPage);
    if (page == 1)
        button = createButton(page + 1, 'next');
    else if (page == pages) button = createButton(page - 1, 'prev');
    else
        button = createButton(page - 1, 'prev') +createButton(page + 1, 'next');
    elements.searchResPages.insertAdjacentHTML('afterbegin', button);
};


export const renderResults = (recipes, resPerPage = 10, page = 1) => {
    const start = (page - 1) * resPerPage;
    const end = page * resPerPage;
    recipes.slice(start, end).forEach(renderRecipe);
    renderButtons(page, recipes.length, resPerPage);
};