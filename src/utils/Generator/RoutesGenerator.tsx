import { JSX, lazy, Suspense, ComponentType } from "react";
import { RouteObject } from "react-router-dom";

// Type for lazy-loaded component
export type LazyComponent = () => Promise<{ default: ComponentType<any> }>;

export type RouteItem = {
  path?: string;
  index?: boolean;
  element?: JSX.Element;
  component?: LazyComponent;
  children?: RouteGroup[];
  // Optional: Custom loading fallback
  fallback?: JSX.Element;
};

export type RouteGroup =
  | {
      group?: string;
      items?: RouteGroup[];
    }
  | RouteItem;

// Default loading fallback
const DefaultFallback = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
  </div>
);

// Helper to create lazy-loaded element with Suspense
const createLazyElement = (
  lazyComponent: LazyComponent,
  fallback?: JSX.Element
): JSX.Element => {
  const LazyComponent = lazy(lazyComponent);
  return (
    <Suspense fallback={fallback || <DefaultFallback />}>
      <LazyComponent />
    </Suspense>
  );
};

const normalizeRoutes = (routes: RouteGroup[]): RouteObject[] => {
  return routes.flatMap((route) => {
    // If it's a group, flatten its items
    if ("items" in route && route.items) {
      return normalizeRoutes(route.items);
    }
    
    // Otherwise, treat it as a RouteItem
    const routeItem = route as RouteItem;
    const element = routeItem.component
      ? createLazyElement(routeItem.component, routeItem.fallback)
      : routeItem.element;

    const normalized: RouteObject = {
      element,
      path: routeItem.path,
      index: routeItem.index ? true : undefined,
    };

    if (routeItem.children && routeItem.children.length > 0) {
      normalized.children = normalizeRoutes(routeItem.children);
    }

    return [normalized];
  });
};

export const routesGenerator = (input: RouteGroup[]): RouteObject[] => {
  return normalizeRoutes(input);
};
