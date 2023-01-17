const ontarioGlobalMenuItemsContentKeys = {
  en: '/system/menu/main/linkset',
  fr: '/system/menu/main-fr/linkset',
};

const renderGlobalMenuItems = function (responseJson, contentKey) {
  const container = document.getElementById('globalContent-ontarioGlobalMenu');
  container.innerHTML = '';
  const menuItems = responseJson.linkset[0].item;
  menuItems.forEach((menuItem) => {
    const linkUrl = menuItem.href;
    const linkText = menuItem.title;
    const navMenuItemTemplate = `
            <li class="ontario-header-navigation__menu-item">
                <a href="${linkUrl}">${linkText}</a>
            </li>
        `;
    container.innerHTML += navMenuItemTemplate;
  });
};

document.addEventListener('DOMContentLoaded', (event) => {
  const globalNavItems = new GlobalContent(
    ontarioGlobalMenuItemsContentKeys[eleventyGlobals.pageLang],
    buildContentRequestFromCMS,
    renderGlobalMenuItems
  );
  globalNavItems.activate();
});
