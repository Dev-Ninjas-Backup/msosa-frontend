/* eslint-disable @typescript-eslint/no-explicit-any */
// utils/breadcrumbUtils.ts
export const flattenRoutes = (routes: any[], base = "") => {
  let map: Record<string, { name: string; icon?: React.ReactNode }> = {};

  const processChildren = (children: any[], parentPath: string) => {
    children.forEach((child) => {
      // If it's a group, process its items
      if (child.group && child.items) {
        processChildren(child.items, parentPath);
        return;
      }

      const pathSegment = child.path || "";
      const fullPath = pathSegment.startsWith("/")
        ? pathSegment
        : `${parentPath}/${pathSegment}`.replace(/\/+/g, "/");

      if (child.name) {
        map[fullPath] = { name: child.name, icon: child.icon };
      }

      if (child.children) {
        processChildren(child.children, fullPath);
      }
    });
  };

  processChildren(routes, base);
  return map;
};
