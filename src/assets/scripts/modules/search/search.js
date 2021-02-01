import { DatoCmsSearch } from "@wildpow/datocms-search";

const $searchContainer = document.querySelector('[data-search]');
const $searchForm = document.querySelector('[data-search-form]');
const $searchInput = document.querySelector('[data-search-input]');
const $searchResults = document.querySelector('[data-search-results]');
const $searchCount = document.querySelector('[data-search-count]');
const HAS_RESULT_CLASS = 'search--has-results';
const IS_LOADING_CLASS = 'search--is-loading';

function initSearch(locale) {
  if(!locale || !$searchContainer || !$searchForm || !$searchInput || !$searchResults || !$searchCount) {
    return
  }

  const client = new DatoCmsSearch('9dc2b0f0de8e37316b093e0e56cb8e', 'production');


  $searchForm.addEventListener('submit', handleSubmit)
  $searchInput.addEventListener('input', handleInput);

  function handleSubmit(event) {
    event.preventDefault();

    if($searchInput.value) {
      performSearch($searchInput.value)
    } else {
      $searchContainer.classList.remove(HAS_RESULT_CLASS);
    }
  }

  function handleInput(event) {
    if(event.target.value) {
      performSearch(event.target.value)
    } else {
      $searchCount.innerHTML = '';
      $searchResults.innerHTML = '';
    }
  }

  function performSearch(searchString) {
    $searchContainer.classList.add(IS_LOADING_CLASS);

    client.search(searchString, { locale })
    .then(response => {

      $searchContainer.classList.add(HAS_RESULT_CLASS);
      $searchCount.innerHTML = `${response.total}`

      if(response.results) {
        $searchResults.innerHTML = renderResults(response.results)
      }
    })
    .then( () => { $searchContainer.classList.remove(IS_LOADING_CLASS); })
    .catch(function(error) {
      console.error(error);
    });
  }

  function renderResults(results) {
    return results
      .map(result => `
        <li class="search__result">
          <a class="search__result-link" href="${result.url}">
            <h2 class="h2">${result.title}</h2>
            <div class="search__result-body">${result.body}</div>
          </a>
        </li>
      `).join('')
  }
}

window.initSearch = window.initSearch || initSearch;
