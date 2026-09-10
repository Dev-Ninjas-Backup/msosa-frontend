import { JSX } from "react";

export type MenuItem = {
  group?: string;
  label: string;
  path?: string;
  icon?: JSX.Element;
  children?: MenuItem[];
};

export type RouteItem = {
  path?: string;
  element?: JSX.Element;
  children?: RouteGroup[];
  icon?: JSX.Element;
  name?: string;
  label?: string;
  index?: boolean;
};

export type RouteGroup =
  | {
      group?: string;
      items?: RouteGroup[];
    }
  | RouteItem;

export const menuGenerator = (
  routes: RouteGroup[],
  parentPath = ""
): MenuItem[] => {
  return routes.flatMap((route) => {
    // Group with items
    if ("items" in route && Array.isArray(route.items)) {
      return route.items
        .map((item) => menuGenerator([item], parentPath))
        .flat()
        .map((child) => ({
          group: route.group,
          ...child,
        }));
    }

    // RouteItem
    const routeItem = route as RouteItem;

    const routePath = routeItem.path
      ? routeItem.path.startsWith("/")
        ? routeItem.path
        : `${parentPath}/${routeItem.path}`.replace(/\/+/g, "/")
      : parentPath;

    const children = routeItem.children
      ? menuGenerator(routeItem.children, routePath)
      : undefined;

    // Skip if no name or label (route exists but won't show in sidebar)
    // However, if it has children (like a layout wrapper), we should return those children directly!
    if (!routeItem.name && !routeItem.label) {
      return children || [];
    }

    // Skip if no element and no children
    if (!routeItem.element && (!children || children.length === 0)) {
      return [];
    }

    const label = routeItem.label ?? routeItem.name ?? routeItem.path ?? "Home";

    const item: MenuItem = {
      label,
      path: routePath,
      icon: routeItem.icon,
      children: children?.length ? children : undefined,
    };

    return [item];
  });
};
