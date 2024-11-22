export function toggleMenu() {
  const navMenu = document.getElementById('navMenu');
  navMenu.classList.toggle('active');
  const isExpanded = navMenu.classList.contains('active');
  hamburger.setAttribute('aria-expanded', isExpanded);
}
