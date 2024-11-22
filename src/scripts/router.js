import { fetchAndDisplayRestaurants } from './index';
import { fetchAndDisplayRestaurantDetail } from './detail';

function router() {
  const hash = window.location.hash;
  const mainContent = document.getElementById('mainContent');

  // Bersihkan konten lama
  mainContent.innerHTML = '';

  if (hash === '' || hash === '#/' || hash === '#/home') {
    fetchAndDisplayRestaurants();
  } else if (hash.startsWith('#/detail')) {
    const id = new URLSearchParams(hash.split('?')[1]).get('id'); // Ambil ID dari hash
    if (id) {
      fetchAndDisplayRestaurantDetail(id);
    } else {
      mainContent.innerHTML = '<p>Halaman detail tidak ditemukan.</p>';
    }
  } else {
    mainContent.innerHTML = '<p>Halaman tidak ditemukan.</p>';
  }
}

window.addEventListener('hashchange', router);
window.addEventListener('load', router);

export default router;
