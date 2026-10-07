import ProductDashboardBuilder from "./productDashboard/ProductDashboardBuilder";
import { emptyProductDashboard } from "./productDashboard/defaults";
import type { ProductDraft } from "./data";

type StepProps = {
  draft: ProductDraft;
  setDraft: (patch: Partial<ProductDraft>) => void;
};

export const StepDashboard = ({ draft, setDraft }: StepProps) => {
  const config = draft.productDashboard ?? emptyProductDashboard();

  return (
    <ProductDashboardBuilder
      value={config}
      onChange={(productDashboard) => setDraft({ productDashboard })}
    />
  );
};

export default StepDashboard;
