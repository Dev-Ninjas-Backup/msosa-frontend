import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import {
  INITIAL_WIDGETS,
  historyId,
  withChannel,
  type Widget,
  type WidgetStatus,
} from "@/pages/Founder/WidgetLibrary/data";

type FounderWidgetsState = {
  widgets: Widget[];
};

const initialState: FounderWidgetsState = {
  widgets: INITIAL_WIDGETS,
};

const record = (widget: Widget, note: string) => {
  widget.updatedAt = new Date().toISOString();
  widget.history.unshift({ id: historyId(), at: widget.updatedAt, version: widget.version, note });
};

const founderWidgetsSlice = createSlice({
  name: "founderWidgets",
  initialState,
  reducers: {
    addWidget: (state, action: PayloadAction<Widget>) => {
      state.widgets.unshift(action.payload);
    },
    updateWidget: (
      state,
      action: PayloadAction<{ id: string; patch: Partial<Omit<Widget, "id">>; note?: string }>
    ) => {
      const widget = state.widgets.find((w) => w.id === action.payload.id);
      if (!widget) return;
      Object.assign(widget, action.payload.patch);
      if (action.payload.note) record(widget, action.payload.note);
    },
    setWidgetStatus: (state, action: PayloadAction<{ ids: string[]; status: WidgetStatus }>) => {
      const { ids, status } = action.payload;
      state.widgets.forEach((w) => {
        if (!ids.includes(w.id) || w.status === status) return;
        w.status = status;
        w.version = withChannel(w.version, status);
        if (status === "Published") w.deployedVersion = w.version;
        record(w, status === "Published" ? "Deployed to production" : `Moved to ${status}`);
      });
    },
    removeWidgets: (state, action: PayloadAction<string[]>) => {
      state.widgets = state.widgets.filter((w) => !action.payload.includes(w.id));
    },
  },
});

export const { addWidget, updateWidget, setWidgetStatus, removeWidgets } =
  founderWidgetsSlice.actions;
export default founderWidgetsSlice.reducer;
