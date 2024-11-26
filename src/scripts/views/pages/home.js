const Home = {
  async render() {
    return `
      <section id="hero">
      <a href="#mainContent" class="skip-link">Menuju ke konten</a>
        <img
          src="./images/heros/hero-image_2.jpg"
          width="450"
          alt="gambar-restoran"
        />
      </section>
      <section id="restaurant-section">
        <h1>Restaurant List</h1>
        <div id="listContainer"></div>
        <!-- Loading indicator -->
        <div id="loading-indicator" class="loading-indicator">
          <p>Loading...</p>
        </div>
        <!-- Error message -->
        <div id="error-message" class="error-message">
          <p>Failed to load data. Please try again later.</p>
        </div>
      </section>
    `;
  },

  async afterRender() {
    const loadingIndicator = document.getElementById('loading-indicator');
    const errorMessage = document.getElementById('error-message');
    const listContainer = document.getElementById('listContainer');

    loadingIndicator.style.display = 'block';
    errorMessage.style.display = 'none';

    try {
      const response = await fetch('https://restaurant-api.dicoding.dev/list');
      if (!response.ok) {
        throw new Error('Gagal mengambil data');
      }

      const data = await response.json();

      if (!data.error) {
        let htmlContent = '';
        data.restaurants.forEach((restaurant) => {
          htmlContent += `
            <div id="restaurantContainer">
              <h2>${restaurant.name}</h2>
              <img src="https://restaurant-api.dicoding.dev/images/large/${restaurant.pictureId}" alt="Gambar dari ${restaurant.name}">
              <p>City : ${restaurant.city}</p>
              <p>Rating : ${restaurant.rating}</p>
              <a id="details" href="#/detail/${restaurant.id}">Details</a>
            </div>
          `;
        });
        listContainer.innerHTML = htmlContent;
      } else {
        console.log('Gagal mengambil data restoran');
      }
    } catch (error) {
      console.log('Error:', error);
      errorMessage.style.display = 'block';
    } finally {
      loadingIndicator.style.display = 'none';
    }
  },
};

export default Home;
