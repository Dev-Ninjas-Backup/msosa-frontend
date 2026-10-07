import { useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Eye } from "lucide-react";
import AnimatedContainer from "@/common/AnimatedContainer";
import Button from "@/ui/Button";
import { cn } from "@/lib/utils";
import { useAppSelector } from "@/hooks/useRedux";
import ProductDashboardCanvas from "./productDashboard/ProductDashboardCanvas";
import type {
  ProductAudience,
  ProductDashboardConfig,
} from "./productDashboard/types";

const AUDIENCES: ProductAudience[] = [
  "Consumer User",
  "Employee User",
  "Enterprise Admin",
];

type PreviewLocationState = {
  dashboard?: ProductDashboardConfig;
  unsaved?: boolean;
};

const ProductDashboardUserPreview = () => {
  const { productId = "" } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const locationState = (location.state ?? {}) as PreviewLocationState;
  const product = useAppSelector((s) =>
    s.founderProducts.products.find((p) => p.id === productId)
  );
  const templates = useAppSelector((s) => s.founderProducts.layoutTemplates);
  const library = useAppSelector((s) => s.founderWidgets.widgets);
  const [audience, setAudience] = useState<ProductAudience>("Consumer User");

  if (!product) {
    return (
      <AnimatedContainer className="space-y-4 pb-8">
        <p className="text-white/60">
          Product <span className="text-white font-mono">{productId}</span> was
          not found.
        </p>
        <Button
          type="button"
          variant="outline"
          onClick={() => navigate("/founder/create-product")}
        >
          Back to Products
        </Button>
      </AnimatedContainer>
    );
  }

  const config = locationState.dashboard ?? product.dashboard;
  const showingUnsaved = Boolean(
    locationState.unsaved && locationState.dashboard
  );
  const template = templates.find((t) => t.id === config.templateId);
  const dashboardPath = `/founder/create-product/${product.id}/dashboard`;

  return (
    <AnimatedContainer className="space-y-6 pb-8">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="space-y-3 min-w-0">
          <Link
            to={dashboardPath}
            className="inline-flex items-center gap-1.5 text-xs text-white/45 hover:text-white no-underline"
          >
            <ArrowLeft className="size-3.5" />
            Back to Dashboard Builder
          </Link>
          <div className="flex flex-wrap items-center gap-3">
            <span className="flex size-10 items-center justify-center rounded-xl border border-[#fbbf24]/30 bg-[#fbbf24]/10 text-[#fbbf24]">
              <Eye className="size-4" />
            </span>
            <div className="min-w-0">
              <p className="text-[11px] font-bold uppercase tracking-[2px] text-[#fbbf24]">
                User preview
              </p>
              <h1 className="font-playfair text-2xl text-white truncate">
                {product.name}
              </h1>
            </div>
            {showingUnsaved && (
              <span className="rounded-full border border-[#fbbf24]/40 bg-[#fbbf24]/10 px-2.5 py-0.5 text-[11px] font-semibold text-[#fbbf24]">
                Unsaved draft
              </span>
            )}
          </div>
          <p className="text-sm text-white/50 max-w-2xl">
            Read-only preview of this Product Dashboard as end users would see
            it. You remain in the Founder area — no role switch or consumer login.
          </p>
        </div>
        <Button
          type="button"
          variant="primary"
          size="sm"
          className="h-10!"
          onClick={() => navigate(dashboardPath)}
        >
          Edit Dashboard
        </Button>
      </div>

      <div className="flex flex-wrap items-center gap-2 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3">
        <span className="text-xs text-white/40 uppercase tracking-[0.5px]">
          View as
        </span>
        {AUDIENCES.map((a) => (
          <button
            key={a}
            type="button"
            onClick={() => setAudience(a)}
            className={cn(
              "rounded-full px-3 py-1 text-xs border cursor-pointer",
              audience === a
                ? "border-[#10b7ba] bg-[#10b7ba]/15 text-[#10b7ba]"
                : "border-white/10 bg-white/5 text-white/50"
            )}
          >
            {a.replace(" User", "").replace(" Admin", "")}
          </button>
        ))}
        <span className="text-[11px] text-white/35 ml-auto">
          Layout: {template?.name ?? config.templateId}
          {" · "}
          {config.widgets.filter((w) => w.enabled).length} enabled widgets
        </span>
      </div>

      <section className="rounded-xl border border-white/10 bg-white/[0.03] p-5 sm:p-6">
        <ProductDashboardCanvas
          config={config}
          template={template}
          library={library}
          audience={audience}
        />
      </section>
    </AnimatedContainer>
  );
};

export default ProductDashboardUserPreview;
