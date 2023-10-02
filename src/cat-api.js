import axios from 'axios';

axios.defaults.headers.common['x-api-key'] =
  'live_eqler4EWYhATUvmkyfWWvZAYI5F22zRTOaSRTN2UCSGgCnHXjdMB3hKouA6Rb5VJ';

export async function fetchBreeds() {
  try {
    const response = await axios.get('https://api.thecatapi.com/v1/breeds');
    const breeds = response.data;

    const breedSelect = document.getElementById('breedSelect');

    breeds.forEach(breed => {
      const option = document.createElement('option');
      option.value = breed.id;
      option.textContent = breed.name;
      breedSelect.appendChild(option);
    });
  } catch (err) {
    console.error('Failed to fetch breeds:', err);
  }
}

export async function fetchCatByBreed(breedId) {
  try {
    const response = await axios.get(
      `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`
    );
    const catData = response.data[0];

    const catNameElement = document.querySelector('.cat-name');
    const catDescriptionElement = document.querySelector('.cat-description');
    const catTemperamentElement = document.querySelector('.cat-temperament');
    const catImageElement = document.querySelector('.cat-image');
    const loader = document.querySelector('.loader');
    const catInfo = document.querySelector('#catInfo');
    const error = document.querySelector('.error');

    error.style.display = 'none';
    loader.style.display = 'block';
    catInfo.style.display = 'none';

    catNameElement.textContent = '';
    catDescriptionElement.textContent = '';
    catTemperamentElement.textContent = '';

    if (catData && catData.url) {
      catImageElement.src = catData.url;
    } else {
      error.style.display = 'block';
      loader.style.display = 'none';
      catInfo.style.display = 'none';
    }

    catNameElement.textContent = catData.breeds[0].name;
    catDescriptionElement.textContent = catData.breeds[0].description;
    catTemperamentElement.textContent = catData.breeds[0].temperament;

    loader.style.display = 'none';
    catInfo.style.display = 'block';
  } catch (err) {
    console.error('Failed to fetch cat by breed:', err);

    error.style.display = 'block';
    loader.style.display = 'none';
    catInfo.style.display = 'none';
  }
}
