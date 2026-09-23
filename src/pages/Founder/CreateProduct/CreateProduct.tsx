import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import AnimatedContainer from "@/common/AnimatedContainer";
import ReflectionRoom from "@/pages/Consumer/ReflectionRoom/ReflectionRoom";
import ProductList from "./ProductList";
import WizardShell from "./WizardShell";
import { SuccessModal } from "./Modals";
import ProcessingScreen from "./ProcessingScreen";
import VoiceToTextModal from "./VoiceToTextModal";
import {
  CREATE_PRODUCT_SEARCH_EVENT,
  draftFromVoice,
  emptyDraft,
  OPEN_CREATE_PRODUCT_EVENT,
  type ProductDraft,
  type ProductStatus,
  type WizardStepId,
} from "./data";
import {
  StepBasic,
  StepDashboard,
  StepPermissions,
  StepPricing,
  StepPublish,
  StepReflection,
  StepReports,
} from "./steps";
import StepProtocol from "./StepProtocol";
import StepWorkflow from "./StepWorkflow";
import StepAi from "./StepAi";

type View = "list" | "reflect" | "processing" | "wizard" | "success";

const CreateProduct = () => {
  const [view, setView] = useState<View>("list");
  const [step, setStep] = useState<WizardStepId>(1);
  const [draft, setDraftState] = useState<ProductDraft>(emptyDraft);
  const [query, setQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<"All" | ProductStatus>("All");
  const [progress, setProgress] = useState(0);
  const [reflectReturn, setReflectReturn] = useState<"list" | "wizard">("list");
  const [voicePromptOpen, setVoicePromptOpen] = useState(false);
  const reflectMode = "voice" as const;

  const setDraft = (patch: Partial<ProductDraft>) =>
    setDraftState((d) => ({ ...d, ...patch }));

  const lockChrome = () => document.body.classList.add("far-immersive");
  const unlockChrome = () => document.body.classList.remove("far-immersive");

  const startCreate = () => {
    lockChrome();
    setDraftState(emptyDraft());
    setReflectReturn("list");
    setView("reflect");
  };

  useEffect(() => {
    const onOpen = () => startCreate();
    const onSearch = (e: Event) => {
      const detail = (e as CustomEvent<string>).detail;
      setQuery(typeof detail === "string" ? detail : "");
    };
    window.addEventListener(OPEN_CREATE_PRODUCT_EVENT, onOpen);
    window.addEventListener(CREATE_PRODUCT_SEARCH_EVENT, onSearch);
    return () => {
      window.removeEventListener(OPEN_CREATE_PRODUCT_EVENT, onOpen);
      window.removeEventListener(CREATE_PRODUCT_SEARCH_EVENT, onSearch);
    };
  }, []);

  const immersive = view === "reflect" || view === "processing";

  const openVoicePrompt = () => setVoicePromptOpen(true);

  const applyVoiceText = (text: string) => {
    setVoicePromptOpen(false);
    if (step === 1) setDraft({ description: text });
    else if (step === 2) setDraft({ reflectionDescription: text });
    else if (step === 5) setDraft({ aiPrompt: text });
  };

  const voiceSeed =
    step === 1
      ? draft.description
      : step === 2
        ? draft.reflectionDescription
        : step === 5
          ? draft.aiPrompt
          : "";

  const goToWizard = () => {
    unlockChrome();
    setStep(1);
    setView("wizard");
  };

  const onReflectComplete = () => {
    lockChrome();
    setDraftState((d) => (d.name ? d : draftFromVoice()));
    setProgress(0);
    setView("processing");
  };

  const onReflectExit = () => {
    unlockChrome();
    setView(reflectReturn === "wizard" ? "wizard" : "list");
  };

  useEffect(() => {
    if (immersive) lockChrome();
    else unlockChrome();
    return () => unlockChrome();
  }, [immersive]);

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
      const t = window.setTimeout(goToWizard, 700);
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

  return (
    <>
      {immersive &&
        createPortal(
          <div className="fixed inset-0 z-[90] bg-black">
            {view === "reflect" && (
              <ReflectionRoom
                variant="product-creation"
                initialMode={reflectMode}
                onComplete={onReflectComplete}
                onExit={onReflectExit}
              />
            )}
            {view === "processing" && (
              <ProcessingScreen progress={progress} onSkip={goToWizard} />
            )}
          </div>,
          document.body
        )}

      <AnimatedContainer className="space-y-6 pb-8">
      {view === "list" && (
        <ProductList
          query={query}
          statusFilter={statusFilter}
          onStatusFilter={setStatusFilter}
          onEdit={() => {
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
          onMic={step === 3 ? undefined : openVoicePrompt}
          chrome={step === 3 ? "none" : "default"}
        >
          {step === 1 && <StepBasic draft={draft} setDraft={setDraft} />}
          {step === 2 && <StepReflection draft={draft} setDraft={setDraft} />}
          {step === 3 && (
            <StepProtocol
              draft={draft}
              setDraft={setDraft}
              onBack={backWizard}
              onCancel={cancelWizard}
              onContinue={continueWizard}
            />
          )}
          {step === 4 && <StepWorkflow draft={draft} setDraft={setDraft} />}
          {step === 5 && <StepAi draft={draft} setDraft={setDraft} />}
          {step === 6 && <StepReports draft={draft} setDraft={setDraft} />}
          {step === 7 && <StepDashboard draft={draft} setDraft={setDraft} />}
          {step === 8 && <StepPermissions draft={draft} setDraft={setDraft} />}
          {step === 9 && <StepPricing draft={draft} setDraft={setDraft} />}
          {step === 10 && <StepPublish draft={draft} />}
        </WizardShell>
      )}

      {view === "wizard" && step !== 3 && (
        <VoiceToTextModal
          open={voicePromptOpen}
          initialValue={voiceSeed}
          onSend={applyVoiceText}
          onType={() => setVoicePromptOpen(false)}
          onClose={() => setVoicePromptOpen(false)}
        />
      )}

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
    </>
  );
};

export default CreateProduct;
