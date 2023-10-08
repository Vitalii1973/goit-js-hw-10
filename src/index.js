import axios from 'axios';
import { fetchBreeds, fetchCatByBreed } from './cat-api.js';

const breedSelect = document.getElementById('breedSelect');
const loader = document.querySelector('.loader');
const error = document.querySelector('.error');
const catInfo = document.querySelector('#catInfo');
const catImageElement = document.querySelector('.cat-image');

// Додані додаткові елементи для інформації про кота
const catNameElement = document.querySelector('.cat-name');
const catDescriptionElement = document.querySelector('.cat-description');
const catTemperamentElement = document.querySelector('.cat-temperament');

error.style.display = 'none';
catInfo.style.display = 'none'; // Приховуємо вікно з інформацією про кота
breedSelect.style.display = 'none'; // Приховуємо вибір породи

async function displayCatInfo(breedId) {
  try {
    const catData = await fetchCatByBreed(breedId);

    if (catData && catData.url) {
      catImageElement.src = catData.url;
      // Встановлення інформації про кота в додаткові елементи
      catNameElement.textContent = `Name: ${catData.breeds[0].name}`;
      catDescriptionElement.textContent = `Description: ${catData.breeds[0].description}`;
      catTemperamentElement.innerHTML = `<b>Temperament:</b> ${catData.breeds[0].temperament}`;
      catNameElement.style.display = 'block';
      catDescriptionElement.style.display = 'block';
      catTemperamentElement.style.display = 'block';
      catInfo.style.display = 'block'; // Відображаємо інформацію про кота
    } else {
      catImageElement.src = 'placeholder.jpg';
      // Відображаємо повідомлення про помилку, якщо дані для породи не знайдено
      error.textContent = 'Oops! Something went wrong! Try reloading the page!';
      error.style.display = 'block';
      catInfo.style.display = 'none'; // Приховуємо вікно з інформацією про кота при помилці
    }
  } catch (err) {
    console.error(err);
    error.style.display = 'block';
    catInfo.style.display = 'none'; // Приховуємо вікно з інформацією про кота при помилці
  } finally {
    loader.style.display = 'none'; // Приховуємо лоадер після завершення завантаження
  }
}

// Показуємо лоадер при зміні породи
breedSelect.addEventListener('change', async () => {
  const selectedBreedId = breedSelect.value;

  error.style.display = 'none';
  loader.style.display = 'block'; // Показуємо лоадер при зміні породи
  // Прибираємо інформацію про попередню породу
  catNameElement.style.display = 'none';
  catDescriptionElement.style.display = 'none';
  catTemperamentElement.style.display = 'none';
  catInfo.style.display = 'none';

  await displayCatInfo(selectedBreedId);
});

// Показуємо лоадер при першому завантаженні сторінки
window.addEventListener('load', async () => {
  loader.style.display = 'block';
  try {
    const breeds = await fetchBreeds();
    breeds.forEach(breed => {
      const option = document.createElement('option');
      option.value = breed.id;
      option.textContent = breed.name;
      breedSelect.appendChild(option);
    });

    // Покажемо вибір породи після завершення завантаження порід
    breedSelect.style.display = 'block';
    loader.style.display = 'none'; // Приховуємо лоадер після завершення завантаження порід
  } catch (err) {
    console.error(err);
    error.style.display = 'block';
    loader.style.display = 'none'; // Приховуємо лоадер після завершення завантаження порід у випадку помилки
  }
});
