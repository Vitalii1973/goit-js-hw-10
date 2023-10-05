import axios from 'axios';

axios.defaults.headers.common['x-api-key'] =
  'live_eqler4EWYhATUvmkyfWWvZAYI5F22zRTOaSRTN2UCSGgCnHXjdMB3hKouA6Rb5VJ';

export async function fetchBreeds() {
  try {
    const response = await axios.get('https://api.thecatapi.com/v1/breeds');
    const breeds = response.data;

    return breeds;
  } catch (err) {
    throw new Error('Failed to fetch breeds');
  }
}

export async function fetchCatByBreed(breedId) {
  try {
    const response = await axios.get(
      `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`
    );
    const catData = response.data[0];

    return catData;
  } catch (err) {
    throw new Error('Failed to fetch cat by breed');
  }
}
