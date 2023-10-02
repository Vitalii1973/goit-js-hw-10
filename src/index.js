import { fetchBreeds, fetchCatByBreed } from './cat-api.js';

const breedSelect = document.getElementById('breedSelect');
const loader = document.querySelector('.loader');
const error = document.querySelector('.error');
const catInfo = document.querySelector('#catInfo');

error.style.display = 'block';
error.style.display = 'none';

fetchBreeds();

breedSelect.addEventListener('change', async () => {
  const selectedBreedId = breedSelect.value;

  error.style.display = 'none';
  loader.style.display = 'block';
  catInfo.style.display = 'none';

  try {
    // Перед новим запитом скидаємо відображення помилки
    error.style.display = 'none';
    await fetchCatByBreed(selectedBreedId);
  } catch (err) {
    error.style.display = 'block';
    loader.style.display = 'none';
    catInfo.style.display = 'none';
  } finally {
    loader.style.display = 'none';
  }

  catInfo.style.display = 'block';
});
