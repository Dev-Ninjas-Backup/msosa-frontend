import { Link, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import AnimatedContainer from "@/common/AnimatedContainer";
import { useAppSelector } from "@/hooks/useRedux";
import { useMemberPortal } from "@/pages/shared/member/MemberPortalContext";
import ProductDashboardCanvas from "@/pages/Founder/CreateProduct/productDashboard/ProductDashboardCanvas";
import type { ProductAudience } from "@/pages/Founder/CreateProduct/productDashboard/types";

type Props = {
  /** Override audience for role-based widget visibility */
  audience?: ProductAudience;
};

const ProductDashboardView = ({ audience }: Props) => {
  const { productId = "" } = useParams();
  const { path, role } = useMemberPortal();
  const product = useAppSelector((s) =>
    s.founderProducts.products.find((p) => p.id === productId)
  );
  const library = useAppSelector((s) => s.founderWidgets.widgets);
  const templates = useAppSelector((s) => s.founderProducts.layoutTemplates);

  const resolvedAudience: ProductAudience =
    audience ??
    (role === "employee" ? "Employee User" : "Consumer User");

  if (!product) {
    return (
      <AnimatedContainer className="space-y-4 pb-8">
        <p className="text-white/60">This product is not available.</p>
        <Link
          to={path("customer-products")}
          className="text-sm text-[#fbbf24] no-underline"
        >
          Back to products
        </Link>
      </AnimatedContainer>
    );
  }

  const template = templates.find((t) => t.id === product.dashboard.templateId);

  return (
    <AnimatedContainer className="space-y-6 pb-8">
      <div className="space-y-2">
        <Link
          to={path("customer-products")}
          className="inline-flex items-center gap-1.5 text-xs text-white/45 hover:text-white no-underline"
        >
          <ArrowLeft className="size-3.5" />
          Products
        </Link>
        <h1 className="font-playfair text-2xl text-white">{product.name}</h1>
        <p className="text-sm text-white/45 max-w-2xl">
          Your Product Dashboard — configured for {product.name}.
        </p>
      </div>

      <ProductDashboardCanvas
        config={product.dashboard}
        template={template}
        library={library}
        audience={resolvedAudience}
      />
    </AnimatedContainer>
  );
};

export default ProductDashboardView;
