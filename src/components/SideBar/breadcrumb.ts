import { navLinks } from "./navLinks";

const breadcrumbTitle = (pathname: string) => {
  const activeMenu = [];
  for (let i = 0; i < navLinks.length; i++) {
    const sidebarItem = navLinks[i];

    if (
      sidebarItem?.childNav?.find(item => item.href === pathname) ??
      (!sidebarItem?.childNav &&
        sidebarItem.href !== "/" &&
        sidebarItem.href === pathname)
    ) {
      activeMenu.push({
        label: "Home",
        href: "/"
      });
      activeMenu.push(sidebarItem);

      if (sidebarItem?.childNav) {
        const activeSubmenu = sidebarItem.childNav.find(
          item => item.href === pathname
        );
        if (activeSubmenu) {
          activeMenu.push(activeSubmenu);
        }
      }
      navLinks.filter(sidebarItem => sidebarItem.href === pathname);
      return activeMenu;
    }
  }
  return [];
};
export default breadcrumbTitle;
