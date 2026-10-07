import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import {
  PRODUCT_LIST,
  type ListedProduct,
  type ProductDraft,
} from "@/pages/Founder/CreateProduct/data";
import {
  cloneDashboard,
  emptyProductDashboard,
  STARTER_LAYOUT_TEMPLATES,
} from "@/pages/Founder/CreateProduct/productDashboard/defaults";
import type {
  DashboardLayoutTemplate,
  ProductDashboardConfig,
} from "@/pages/Founder/CreateProduct/productDashboard/types";

export type StoredProduct = ListedProduct & {
  dashboard: ProductDashboardConfig;
  /** Last saved wizard draft (optional; used when re-editing product) */
  draft?: ProductDraft;
};

type FounderProductsState = {
  products: StoredProduct[];
  layoutTemplates: DashboardLayoutTemplate[];
};

const seedProducts = (): StoredProduct[] =>
  PRODUCT_LIST.map((p, i) => ({
    ...p,
    dashboard: {
      ...emptyProductDashboard(
        STARTER_LAYOUT_TEMPLATES[i % STARTER_LAYOUT_TEMPLATES.length].id
      ),
      updatedAt: new Date().toISOString(),
    },
  }));

const initialState: FounderProductsState = {
  products: seedProducts(),
  layoutTemplates: STARTER_LAYOUT_TEMPLATES.map((t) => ({
    ...t,
    slots: t.slots.map((s) => ({ ...s })),
  })),
};

const founderProductsSlice = createSlice({
  name: "founderProducts",
  initialState,
  reducers: {
    upsertProduct: (state, action: PayloadAction<StoredProduct>) => {
      const idx = state.products.findIndex((p) => p.id === action.payload.id);
      if (idx >= 0) state.products[idx] = action.payload;
      else state.products.unshift(action.payload);
    },
    updateProductDashboard: (
      state,
      action: PayloadAction<{ productId: string; dashboard: ProductDashboardConfig }>
    ) => {
      const product = state.products.find((p) => p.id === action.payload.productId);
      if (!product) return;
      product.dashboard = cloneDashboard({
        ...action.payload.dashboard,
        updatedAt: new Date().toISOString(),
      });
      product.updated = new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    },
    saveLayoutTemplate: (
      state,
      action: PayloadAction<DashboardLayoutTemplate>
    ) => {
      const idx = state.layoutTemplates.findIndex(
        (t) => t.id === action.payload.id
      );
      const next = {
        ...action.payload,
        slots: action.payload.slots.map((s) => ({ ...s })),
      };
      if (idx >= 0) state.layoutTemplates[idx] = next;
      else state.layoutTemplates.push(next);
    },
    removeProduct: (state, action: PayloadAction<string>) => {
      state.products = state.products.filter((p) => p.id !== action.payload);
    },
  },
});

export const {
  upsertProduct,
  updateProductDashboard,
  saveLayoutTemplate,
  removeProduct,
} = founderProductsSlice.actions;
export default founderProductsSlice.reducer;
