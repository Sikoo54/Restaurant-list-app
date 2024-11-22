import UrlParser from './url-parser.js';
import Home from '../views/pages/home.js';
import Detail from '../views/pages/detail.js';
import Favorite from '../views/pages/favorite.js';

const routes = {
  '/': Home,
  '/detail/:id': Detail,
  '/favorite': Favorite,
};

const router = async () => {
  const url = UrlParser.parseActiveUrlWithCombiner(); // Gunakan UrlParser
  const page = routes[url] || Home;

  const mainContent = document.getElementById('mainContent');
  mainContent.innerHTML = await page.render();
  if (page.afterRender) await page.afterRender();
};

window.addEventListener('hashchange', router);
window.addEventListener('load', router);

export default router;
