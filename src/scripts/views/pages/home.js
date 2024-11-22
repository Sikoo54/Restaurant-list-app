const Home = {
  async render() {
    // Template HTML untuk halaman utama
    return `
        <section id="hero">
          <img
            src="./images/heros/hero-image_2.jpg"
            width="450"
            alt="gambar-restoran"
          />
        </section>
        <section id="restaurant-section">
          <h1>Restaurant List</h1>
          <div id="listContainer"></div>
        </section>
      `;
  },

  async afterRender() {
    // Panggil API restoran
    try {
      const response = await fetch('https://restaurant-api.dicoding.dev/list');
      if (!response.ok) {
        throw new Error('Gagal mengambil data');
      }

      const data = await response.json();

      if (!data.error) {
        const container = document.getElementById('listContainer');
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
        container.innerHTML += htmlContent;
      } else {
        console.log('Gagal mengambil data restoran');
      }
    } catch (error) {
      console.log('Error:', error);
    }
  },
};

export default Home;
