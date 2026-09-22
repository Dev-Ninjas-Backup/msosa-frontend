import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import AnimatedContainer from "@/common/AnimatedContainer";
import ReflectionRoom from "@/pages/Consumer/ReflectionRoom/ReflectionRoom";
import ProductList from "./ProductList";
import WizardShell from "./WizardShell";
import { ProcessingModal, SuccessModal } from "./Modals";
import {
  draftFromVoice,
  emptyDraft,
  type ProductDraft,
  type ProductStatus,
  type WizardStepId,
} from "./data";
import {
  StepAi,
  StepBasic,
  StepDashboard,
  StepPermissions,
  StepPricing,
  StepProtocol,
  StepPublish,
  StepReflection,
  StepReports,
  StepWorkflow,
} from "./steps";

type View = "list" | "reflect" | "processing" | "wizard" | "success";

const CreateProduct = () => {
  const [view, setView] = useState<View>("list");
  const [step, setStep] = useState<WizardStepId>(1);
  const [draft, setDraftState] = useState<ProductDraft>(emptyDraft);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"All" | ProductStatus>("All");
  const [progress, setProgress] = useState(0);
  const [reflectReturn, setReflectReturn] = useState<"list" | "wizard">("list");

  const setDraft = (patch: Partial<ProductDraft>) =>
    setDraftState((d) => ({ ...d, ...patch }));

  const startCreate = () => {
    setDraftState(emptyDraft());
    setReflectReturn("list");
    setView("reflect");
  };

  const openReflectFromWizard = () => {
    setReflectReturn("wizard");
    setView("reflect");
  };

  const onReflectComplete = () => {
    setDraftState((d) =>
      d.name ? d : draftFromVoice()
    );
    setProgress(0);
    setView("processing");
  };

  const onReflectExit = () => {
    setView(reflectReturn === "wizard" ? "wizard" : "list");
  };

  useEffect(() => {
    if (view !== "processing") return;
    setProgress(0);
    const id = window.setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          window.clearInterval(id);
          return 100;
        }
        return p + 8;
      });
    }, 180);
    return () => window.clearInterval(id);
  }, [view]);

  useEffect(() => {
    if (view === "processing" && progress >= 100) {
      const t = window.setTimeout(() => {
        setStep(1);
        setView("wizard");
      }, 500);
      return () => window.clearTimeout(t);
    }
  }, [view, progress]);

  const cancelWizard = () => {
    setView("list");
    setStep(1);
    setDraftState(emptyDraft());
  };

  const continueWizard = () => {
    if (step >= 10) {
      setView("success");
      return;
    }
    setStep((s) => (s + 1) as WizardStepId);
  };

  const backWizard = () => {
    if (step <= 1) {
      setView("list");
      return;
    }
    setStep((s) => (s - 1) as WizardStepId);
  };

  if (view === "reflect") {
    return createPortal(
      <div className="fixed inset-0 z-[90]">
        <ReflectionRoom
          variant="product-creation"
          onComplete={onReflectComplete}
          onExit={onReflectExit}
        />
      </div>,
      document.body
    );
  }

  return (
    <AnimatedContainer className="space-y-6 pb-8">
      {view === "list" && (
        <ProductList
          query={query}
          onQueryChange={setQuery}
          statusFilter={statusFilter}
          onStatusFilter={setStatusFilter}
          onCreate={startCreate}
          onOpenDraft={() => {
            setDraftState(draftFromVoice());
            setStep(1);
            setView("wizard");
          }}
        />
      )}

      {view === "wizard" && (
        <WizardShell
          step={step}
          onBack={backWizard}
          onCancel={cancelWizard}
          onContinue={continueWizard}
          continueLabel={step === 10 ? "Publish" : "Continue"}
          onMic={openReflectFromWizard}
        >
          {step === 1 && <StepBasic draft={draft} setDraft={setDraft} />}
          {step === 2 && (
            <StepReflection
              draft={draft}
              setDraft={setDraft}
              onOpenReflectRoom={openReflectFromWizard}
            />
          )}
          {step === 3 && <StepProtocol draft={draft} setDraft={setDraft} />}
          {step === 4 && <StepWorkflow draft={draft} setDraft={setDraft} />}
          {step === 5 && <StepAi draft={draft} setDraft={setDraft} />}
          {step === 6 && <StepReports draft={draft} setDraft={setDraft} />}
          {step === 7 && <StepDashboard draft={draft} setDraft={setDraft} />}
          {step === 8 && <StepPermissions draft={draft} setDraft={setDraft} />}
          {step === 9 && <StepPricing draft={draft} setDraft={setDraft} />}
          {step === 10 && <StepPublish draft={draft} />}
        </WizardShell>
      )}

      {view === "processing" && <ProcessingModal progress={progress} />}

      {view === "success" && (
        <SuccessModal
          onClose={() => setView("list")}
          onGoList={() => {
            setView("list");
            setStep(1);
            setDraftState(emptyDraft());
          }}
        />
      )}
    </AnimatedContainer>
  );
};

export default CreateProduct;
