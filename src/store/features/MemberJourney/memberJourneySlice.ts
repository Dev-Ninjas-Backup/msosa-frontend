import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type JourneyStage = "reflection" | "processing" | "report";

type MemberJourneyState = {
  stages: Record<string, JourneyStage>;
  vibe: "Calm" | "Focus" | "Night";
  branding: {
    title: string;
    subtitle: string;
    accent: string;
  };
};

const initialState: MemberJourneyState = {
  stages: {
    relationship: "reflection",
    leadership: "reflection",
    "PRD-001": "reflection",
  },
  vibe: "Calm",
  branding: {
    title: "Reflection Room™",
    subtitle: "A private space for clarity, insight, and personal growth.",
    accent: "#FBBF24",
  },
};

const memberJourneySlice = createSlice({
  name: "memberJourney",
  initialState,
  reducers: {
    setStage: (
      state,
      action: PayloadAction<{ id: string; stage: JourneyStage }>
    ) => {
      state.stages[action.payload.id] = action.payload.stage;
    },
    setVibe: (state, action: PayloadAction<MemberJourneyState["vibe"]>) => {
      state.vibe = action.payload;
    },
    setBranding: (
      state,
      action: PayloadAction<Partial<MemberJourneyState["branding"]>>
    ) => {
      state.branding = { ...state.branding, ...action.payload };
    },
  },
});

export const { setStage, setVibe, setBranding } = memberJourneySlice.actions;

export const continuePath = (
  basePath: string,
  id: string,
  stage: JourneyStage | undefined
) => {
  if (stage === "report") return `${basePath}/report/relationship-v2`;
  if (stage === "processing") return `${basePath}/customer-products/${id}`;
  return `${basePath}/reflection-room?blueprint=${encodeURIComponent(id)}`;
};

export default memberJourneySlice.reducer;
