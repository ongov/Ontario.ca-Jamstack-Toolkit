/* global GlobalContent:readonly */
/* global eleventyGlobals:readonly */

const ontarioGlobalMenuItemsContentKeys = {
  en: '/system/menu/main/linkset',
  fr: '/system/menu/main-fr/linkset',
};

function renderGlobalMenuItems(responseJson) {
  const container = document.getElementById('globalContent-ontarioGlobalMenu');
  container.innerHTML = '';
  const menuItems = responseJson.linkset[0].item;
  menuItems.forEach((menuItem) => {
    const linkUrl = menuItem.href;
    const linkText = menuItem.title;
    const navMenuItemTemplate = `
      <li class="ontario-header-navigation__menu-item">
        <a href="${linkUrl}">${linkText}</a>
      </li>`;
    container.innerHTML += navMenuItemTemplate;
  });
}

function buildContentRequestFromCMS(contentKey) {
  const globalContentUrl = `https://www.ontario.ca${contentKey}`;
  const globalContentRequest = new Request(globalContentUrl);
  return globalContentRequest;
}

document.addEventListener('DOMContentLoaded', () => {
  const globalNavItems = new GlobalContent(
    ontarioGlobalMenuItemsContentKeys[eleventyGlobals.pageLang],
    buildContentRequestFromCMS,
    renderGlobalMenuItems,
  );
  globalNavItems.activate();
});
