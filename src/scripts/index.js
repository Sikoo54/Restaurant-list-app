import 'regenerator-runtime';
import '../styles/main.css';
import '../styles/header.css';
import '../styles/restaurant.css';
import { toggleMenu } from './utils/menu';
import router from './routes/routes';
import '../styles/detail.css';
import '../styles/favorite.css';
import swRegister from './utils/sw-register';

const hamburger = document.getElementById('hamburger');
hamburger.addEventListener('click', toggleMenu);

// window.addEventListener('load', router);
// if ('serviceWorker' in navigator) {
//   window.addEventListener('load', () => {
//     swRegister();
//   });
// }

// async function fetchData() {
//   try {
//     const response = await fetch("https://restaurant-api.dicoding.dev/list");
//     const data = await response.json();

//     // Simpan data di cache
//     if ("caches" in window) {
//       const cache = await caches.open("RestaurantCatalogue-V1");
//       cache.put(
//         "https://restaurant-api.dicoding.dev/list",
//         new Response(JSON.stringify(data))
//       );
//     }

//     return data;
//   } catch (error) {
//     console.log("Error fetching data: ", error);
//   }
// }

// async function getData() {
//   const cachedData = await caches.match(
//     "https://restaurant-api.dicoding.dev/list"
//   );
//   if (cachedData) {
//     const data = await cachedData.json();
//     renderData(data); // Tampilkan data dari cache
//   } else {
//     const data = await fetchData(); // Ambil data dari API jika online
//     renderData(data); // Tampilkan data
//   }
// }

// function renderData(data) {
//   // Implementasi untuk menampilkan data di halaman
//   console.log(data);
// }

// getData();
