import { useEffect, useMemo, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Calendar,
  Eye,
  LayoutDashboard,
  Layers,
  Package,
  RotateCcw,
  Save,
  Shapes,
  Tag,
} from "lucide-react";
import { toast } from "sonner";
import AnimatedContainer from "@/common/AnimatedContainer";
import Button from "@/ui/Button";
import { cn } from "@/lib/utils";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { updateProductDashboard } from "@/store/features/FounderProducts/founderProductsSlice";
import { cloneDashboard } from "./productDashboard/defaults";
import ProductDashboardBuilder from "./productDashboard/ProductDashboardBuilder";
import type { ProductDashboardConfig } from "./productDashboard/types";

type Tab = "overview" | "dashboard";

const STATUS_TONE: Record<string, string> = {
  Published: "bg-[#10b7ba]/12 text-[#10b7ba] border-[#10b7ba]/30",
  Draft: "bg-[#fbbf24]/12 text-[#fbbf24] border-[#fbbf24]/30",
  Active: "bg-sky-400/12 text-sky-400 border-sky-400/30",
  Archived: "bg-white/10 text-white/50 border-white/15",
  Upcoming: "bg-violet-400/12 text-violet-300 border-violet-400/30",
};

const formatUpdated = (iso: string) => {
  try {
    return new Date(iso).toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  } catch {
    return iso;
  }
};

const ProductDetails = () => {
  const { productId = "" } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const product = useAppSelector((s) =>
    s.founderProducts.products.find((p) => p.id === productId)
  );
  const templates = useAppSelector((s) => s.founderProducts.layoutTemplates);
  const library = useAppSelector((s) => s.founderWidgets.widgets);
  const [tab, setTab] = useState<Tab>(
    location.pathname.endsWith("/dashboard") ? "dashboard" : "overview"
  );
  const [draftDash, setDraftDash] = useState<ProductDashboardConfig | null>(
    null
  );

  useEffect(() => {
    setTab(
      location.pathname.endsWith("/dashboard") ? "dashboard" : "overview"
    );
  }, [location.pathname]);

  useEffect(() => {
    setDraftDash(null);
  }, [productId]);

  const config = useMemo(() => {
    if (!product) return null;
    return draftDash ?? cloneDashboard(product.dashboard);
  }, [product, draftDash]);

  const dirty = Boolean(
    draftDash &&
      product &&
      JSON.stringify(draftDash) !== JSON.stringify(product.dashboard)
  );

  const template = templates.find((t) => t.id === config?.templateId);
  const enabledCount =
    config?.widgets.filter((w) => w.enabled).length ?? 0;
  const totalWidgets = config?.widgets.length ?? 0;
  const styledCount =
    config?.widgets.filter((w) => Boolean(w.style.backgroundImage)).length ??
    0;

  if (!product || !config) {
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

  const saveDashboard = () => {
    dispatch(
      updateProductDashboard({
        productId: product.id,
        dashboard: config,
      })
    );
    setDraftDash(null);
    toast.success("Product Dashboard saved");
  };

  const discardChanges = () => {
    setDraftDash(null);
    toast.message("Unsaved dashboard changes discarded");
  };

  const goTab = (id: Tab) => {
    setTab(id);
    navigate(
      id === "dashboard"
        ? `/founder/create-product/${product.id}/dashboard`
        : `/founder/create-product/${product.id}`,
      { replace: true }
    );
  };

  return (
    <AnimatedContainer className="space-y-6 pb-8">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div className="space-y-3 min-w-0 flex-1">
          <Link
            to="/founder/create-product"
            className="inline-flex items-center gap-1.5 text-xs text-white/45 hover:text-white no-underline"
          >
            <ArrowLeft className="size-3.5" />
            Products
          </Link>
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="font-playfair text-2xl sm:text-3xl text-white">
              {product.name}
            </h1>
            <span
              className={cn(
                "rounded-full border px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-[0.4px]",
                STATUS_TONE[product.status] ?? STATUS_TONE.Draft
              )}
            >
              {product.status}
            </span>
            {dirty && (
              <span className="rounded-full border border-[#fbbf24]/40 bg-[#fbbf24]/10 px-2.5 py-0.5 text-[11px] font-semibold text-[#fbbf24]">
                Unsaved changes
              </span>
            )}
          </div>
          <p className="text-sm text-white/50 max-w-2xl">
            {tab === "dashboard"
              ? "Configure this product’s dashboard layout, Widget Library™ assignments, and widget styling. Changes apply to users who open this product."
              : "Product identity and the Product Dashboard assigned to this product. Open Dashboard to edit without recreating the product."}
          </p>
          <div className="flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-white/40">
            <span className="inline-flex items-center gap-1.5">
              <Tag className="size-3.5" />
              {product.id}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Layers className="size-3.5" />
              {product.division}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Shapes className="size-3.5" />
              {product.type} · {product.version}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Calendar className="size-3.5" />
              Updated {product.updated}
            </span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="h-10! gap-1.5!"
            onClick={() =>
              navigate(
                `/founder/create-product/${product.id}/dashboard/preview`,
                {
                  state: {
                    dashboard: config,
                    unsaved: dirty,
                  },
                }
              )
            }
          >
            <Eye className="size-3.5" />
            Preview as user
          </Button>
          {tab === "dashboard" && dirty && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="h-10! gap-1.5!"
              onClick={discardChanges}
            >
              <RotateCcw className="size-3.5" />
              Discard
            </Button>
          )}
          {tab === "dashboard" && (
            <Button
              type="button"
              variant="primary"
              size="sm"
              className="h-10! gap-1.5!"
              onClick={saveDashboard}
              disabled={!dirty}
            >
              <Save className="size-3.5" />
              Save Dashboard
            </Button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {[
          {
            label: "Layout template",
            value: template?.name ?? config.templateId,
            hint: template?.isStarter ? "Starter template" : "Custom layout",
          },
          {
            label: "Widgets assigned",
            value: `${enabledCount} / ${totalWidgets}`,
            hint: "Enabled / total",
          },
          {
            label: "Layout slots",
            value: String(template?.slots.length ?? "—"),
            hint: "Slots in selected template",
          },
          {
            label: "Dashboard updated",
            value: formatUpdated(config.updatedAt),
            hint: styledCount
              ? `${styledCount} with image background`
              : "No image backgrounds",
          },
        ].map((card) => (
          <div
            key={card.label}
            className="rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3.5"
          >
            <p className="text-[10px] font-bold uppercase tracking-[1px] text-white/40">
              {card.label}
            </p>
            <p className="mt-1.5 text-sm font-medium text-white truncate">
              {card.value}
            </p>
            <p className="mt-0.5 text-[11px] text-white/35">{card.hint}</p>
          </div>
        ))}
      </div>

      <div className="flex gap-2 border-b border-white/10 pb-px">
        {(
          [
            ["overview", "Overview", Package],
            ["dashboard", "Dashboard", LayoutDashboard],
          ] as const
        ).map(([id, label, Icon]) => (
          <button
            key={id}
            type="button"
            onClick={() => goTab(id)}
            className={cn(
              "inline-flex items-center gap-2 px-4 py-2.5 text-sm border-0 border-b-2 -mb-px cursor-pointer bg-transparent",
              tab === id
                ? "border-[#fbbf24] text-white font-medium"
                : "border-transparent text-white/45 hover:text-white/70"
            )}
          >
            <Icon className="size-4" />
            {label}
          </button>
        ))}
      </div>

      {tab === "overview" && (
        <div className="space-y-5">
          <div className="rounded-xl border border-white/10 bg-white/[0.04] p-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {(
              [
                ["Product ID", product.id],
                ["Product name", product.name],
                ["Division", product.division],
                ["Type", product.type],
                ["Version", product.version],
                ["Status", product.status],
                ["Price", product.price],
                ["Created", product.created],
                ["Updated", product.updated],
                ["Published by", product.publishedBy],
                ["Dashboard layout", template?.name ?? config.templateId],
                ["Widgets on dashboard", `${totalWidgets} assigned`],
              ] as const
            ).map(([k, v]) => (
              <div key={k}>
                <p className="text-[10px] uppercase tracking-[1px] text-white/40">
                  {k}
                </p>
                <p className="mt-1 text-sm text-white">{v}</p>
              </div>
            ))}
          </div>

          <section className="rounded-xl border border-white/10 bg-white/[0.04] p-5 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-sm font-bold text-white">
                  Assigned Product Dashboard
                </p>
                <p className="mt-1 text-xs text-white/45">
                  Users who open this product see this configuration. Edit anytime from the Dashboard tab.
                </p>
              </div>
              <Button
                type="button"
                variant="primary"
                size="sm"
                className="h-9!"
                onClick={() => goTab("dashboard")}
              >
                Edit Dashboard
              </Button>
            </div>

            <div className="overflow-x-auto rounded-lg border border-white/10">
              <table className="w-full min-w-[640px] text-left">
                <thead>
                  <tr className="border-b border-white/10 text-[11px] uppercase tracking-wide text-white/40">
                    <th className="px-3 py-2.5 font-medium">Widget</th>
                    <th className="px-3 py-2.5 font-medium">Library ID</th>
                    <th className="px-3 py-2.5 font-medium">Visibility</th>
                    <th className="px-3 py-2.5 font-medium">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {config.widgets.map((w) => {
                    const lib = library.find((x) => x.id === w.widgetLibraryId);
                    return (
                      <tr
                        key={w.id}
                        className="border-b border-white/5 text-sm"
                      >
                        <td className="px-3 py-2.5 text-white">
                          {w.title || lib?.name || "Widget"}
                        </td>
                        <td className="px-3 py-2.5 text-white/50 font-mono text-xs">
                          {w.widgetLibraryId}
                        </td>
                        <td className="px-3 py-2.5 text-white/55">
                          {w.visibility ?? lib?.visibility ?? "—"}
                        </td>
                        <td className="px-3 py-2.5">
                          <span
                            className={cn(
                              "text-xs font-medium",
                              w.enabled ? "text-emerald-400" : "text-white/35"
                            )}
                          >
                            {w.enabled ? "Enabled" : "Disabled"}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                  {config.widgets.length === 0 && (
                    <tr>
                      <td
                        colSpan={4}
                        className="px-3 py-8 text-center text-sm text-white/40"
                      >
                        No widgets assigned yet. Open Dashboard to add from the Widget Library™.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      )}

      {tab === "dashboard" && (
        <div className="space-y-4">
          <div className="rounded-xl border border-[#fbbf24]/20 bg-[#fbbf24]/[0.06] px-4 py-3 flex flex-wrap items-center justify-between gap-3">
            <p className="text-xs text-white/70 max-w-2xl">
              <span className="font-semibold text-[#fbbf24]">
                Product Dashboard Builder
              </span>{" "}
              — choose a layout template, assign widgets from the Widget Library™,
              style each widget, then save. This does not change the Founder control-center dashboard.
            </p>
            {dirty ? (
              <span className="text-[11px] text-[#fbbf24]">
                Remember to save before leaving
              </span>
            ) : (
              <span className="text-[11px] text-white/40">All changes saved</span>
            )}
          </div>
          <ProductDashboardBuilder
            value={config}
            onChange={(next) => setDraftDash(next)}
            productName={product.name}
          />
        </div>
      )}

    </AnimatedContainer>
  );
};

export default ProductDetails;
