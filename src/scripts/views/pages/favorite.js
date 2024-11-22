import UrlParser from '../../routes/url-parser'; // Sesuaikan dengan path yang benar
import FavoriteRestaurantIdb from '../../data/favorite-restaurant-idb'; // Import dari file favorite-restaurant-idb.js

const Favorite = {
  async render() {
    return `
    <a href="#mainContent" class="skip-link">Menuju ke konten</a>
      <section id="favorite-section">
        <h1>Favorite Restaurants</h1>
        <div id="favoriteContainer"></div>
      </section>
    `;
  },

  async afterRender() {
    const favoriteContainer = document.getElementById('favoriteContainer');
    const restaurants = await FavoriteRestaurantIdb.getAllRestaurants();

    if (restaurants.length === 0) {
      favoriteContainer.innerHTML = '<p>No favorite restaurants yet.</p>';
      return;
    }

    favoriteContainer.innerHTML = `
      <ul>
        ${restaurants
    .map(
      (restaurant) => `
          <li>
            <h3>${restaurant.name}</h3>
            <img src="https://restaurant-api.dicoding.dev/images/large/${restaurant.pictureId}" alt="Gambar dari ${restaurant.name}">
            <p><strong>City:</strong> ${restaurant.city}</p>
            <p><strong>Address:</strong> ${restaurant.address}</p>
            <p><strong>Rating:</strong> ${restaurant.rating}</p>
            <a id="details" href="#/detail/${restaurant.id}">Details</a>
            <button class="remove-favorite" data-id="${restaurant.id}">Remove from Favorite</button>
          </li>`
    )
    .join('')}
      </ul>
    `;

    // Menambahkan event listener untuk menghapus restoran dari favorit
    const removeButtons = document.querySelectorAll('.remove-favorite');
    removeButtons.forEach((button) => {
      button.addEventListener('click', async (event) => {
        const id = event.target.getAttribute('data-id');
        await FavoriteRestaurantIdb.deleteRestaurant(id);
        this.afterRender(); // Refresh daftar restoran favorit setelah penghapusan
      });
    });
  },
};

export default Favorite;
