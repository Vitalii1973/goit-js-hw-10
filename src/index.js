import { fetchBreeds, fetchCatByBreed } from './cat-api.js';

const breedSelect = document.getElementById('breedSelect');
const loader = document.querySelector('.loader');
const error = document.querySelector('.error');
const catInfo = document.querySelector('#catInfo');

// Сховати повідомлення про помилку при завантаженні сторінки
error.style.display = 'none';

fetchBreeds();

breedSelect.addEventListener('change', async () => {
  const selectedBreedId = breedSelect.value;

  // Сховати повідомлення про помилку і показати лоадер
  // error.style.display = 'none';
  loader.style.display = 'block';
  catInfo.style.display = 'none';

  try {
    await fetchCatByBreed(selectedBreedId);
  } catch (err) {
    // Показати повідомлення про помилку
    error.style.display = 'block';
    loader.style.display = 'none';
    catInfo.style.display = 'none';
  } finally {
    loader.style.display = 'none';
  }

  catInfo.style.display = 'block';
});
