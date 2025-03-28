import 'regenerator-runtime';
import '../styles/main.css';
import '../styles/header.css';
import '../styles/restaurant.css';
import { toggleMenu } from './utils/menu';
import router from './routes/routes';
import '../styles/detail.css';
import '../styles/favorite.css';
import swRegister from './utils/sw-register';
import 'lazysizes';
import 'lazysizes/plugins/parent-fit/ls.parent-fit';

const hamburger = document.getElementById('hamburger');
hamburger.addEventListener('click', toggleMenu);

document.addEventListener('DOMContentLoaded', () => {
  swRegister();
});
