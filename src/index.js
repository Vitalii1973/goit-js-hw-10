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
breedSelect.style.display = 'block'; // Відображаємо список порід при завантаженні сторінки

function hideCatInfo() {
  catNameElement.style.display = 'none';
  catDescriptionElement.style.display = 'none';
  catTemperamentElement.style.display = 'none';
  catInfo.style.display = 'none';
}

window.addEventListener('load', async () => {
  try {
    const breeds = await fetchBreeds();
    breeds.forEach(breed => {
      const option = document.createElement('option');
      option.value = breed.id;
      option.textContent = breed.name;
      breedSelect.appendChild(option);
    });

    // Отримання інформації про першого кота та відображення її при завантаженні сторінки
    const firstBreedId = breeds[0].id;
    await displayCatInfo(firstBreedId);
  } catch (err) {
    console.error(err);
    error.style.display = 'block';
    hideCatInfo(); // Приховуємо інформацію про кота при помилці
    breedSelect.style.display = 'none'; // Приховуємо список порід у випадку помилки
  } finally {
    loader.style.display = 'none';
  }
});

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
      catImageElement.src = 'placeholder.jpg'; // Замініть на свій URL заповнювач
    }
  } catch (err) {
    console.error(err);
    error.style.display = 'block';
    hideCatInfo(); // Приховуємо інформацію про кота при помилці
    breedSelect.style.display = 'none'; // Приховуємо список порід у випадку помилки
  } finally {
    loader.style.display = 'none';
  }
}

breedSelect.addEventListener('change', async () => {
  const selectedBreedId = breedSelect.value;

  error.style.display = 'none';
  loader.style.display = 'block';
  hideCatInfo(); // Приховуємо інформацію про кота при зміні породи

  await displayCatInfo(selectedBreedId);
});
