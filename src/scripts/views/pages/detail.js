import UrlParser from '../../routes/url-parser';
import FavoriteRestaurantIdb from '../../data/favorite-restaurant-idb';

const Detail = {
  async render() {
    return `
      <section id="detail-section">
      <a href="#mainContentDetail" class="skip-link">Menuju ke konten</a>
        <h1>Restaurant Details</h1>
        <div id="detailContainer"></div>
        <button id="favoriteButton">Add to Favorite</button>
      </section>
    `;
  },

  async afterRender() {
    const { id } = UrlParser.parseActiveUrlWithoutCombiner();

    try {
      const response = await fetch(
        `https://restaurant-api.dicoding.dev/detail/${id}`
      );
      if (!response.ok) {
        throw new Error('Gagal mengambil data detail');
      }

      const data = await response.json();

      if (!data.error) {
        const container = document.getElementById('detailContainer');
        const restaurant = data.restaurant;

        container.innerHTML = `
        <a href="#mainContentDetail" class="skip-link">Menuju ke konten</a>
          <h2 id="mainContentDetail">${restaurant.name}</h2>
          <img src="https://restaurant-api.dicoding.dev/images/large/${
  restaurant.pictureId
}" alt="Gambar dari ${restaurant.name}">
          <p><strong>City:</strong> ${restaurant.city}</p>
          <p><strong>Address:</strong> ${restaurant.address}</p>
          <p><strong>Rating:</strong> ${restaurant.rating}</p>
          <p><strong>Description:</strong> ${restaurant.description}</p>

          <h3>Menu Makanan</h3>
          <ul>
            ${restaurant.menus.foods
    .map((food) => `<li>${food.name}</li>`)
    .join('')}
          </ul>

          <h3>Menu Minuman</h3>
          <ul>
            ${restaurant.menus.drinks
    .map((drink) => `<li>${drink.name}</li>`)
    .join('')}
          </ul>

          <h3 >Customer Reviews</h3>
          <ul>
            ${restaurant.customerReviews
    .map(
      (review) => `
                <li>
                  <strong>${review.name}</strong>: ${review.review} (Tanggal: ${review.date})
                </li>`
    )
    .join('')}
          </ul>
        `;

        const favoriteButton = document.getElementById('favoriteButton');

        const updateFavoriteButton = async () => {
          const isFavorited = await FavoriteRestaurantIdb.getRestaurant(
            restaurant.id
          );
          if (isFavorited) {
            favoriteButton.textContent = 'Remove from Favorite';
            favoriteButton.classList.add('remove-favorite');
          } else {
            favoriteButton.textContent = 'Add to Favorite';
            favoriteButton.classList.remove('remove-favorite');
          }
        };

        await updateFavoriteButton();

        favoriteButton.addEventListener('click', async () => {
          const isFavorited = await FavoriteRestaurantIdb.getRestaurant(
            restaurant.id
          );
          if (isFavorited) {
            await FavoriteRestaurantIdb.deleteRestaurant(restaurant.id);
          } else {
            await FavoriteRestaurantIdb.putRestaurant(restaurant);
          }

          await updateFavoriteButton();
        });
      } else {
        console.log('Gagal mengambil data restoran');
      }
    } catch (error) {
      console.log('Error:', error);
    }
  },
};

export default Detail;
