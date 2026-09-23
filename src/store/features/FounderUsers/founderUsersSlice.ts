import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import {
  INITIAL_USERS,
  createId,
  type AuditEntry,
  type AuditKind,
  type ManagedUser,
  type UserProfile,
} from "@/pages/Founder/UserManagement/data";

type FounderUsersState = {
  users: ManagedUser[];
};

type AuditNote = { action: string; kind?: AuditKind; result?: AuditEntry["result"] };

const initialState: FounderUsersState = { users: INITIAL_USERS };

const adminEntry = ({ action, kind = "admin", result = "Success" }: AuditNote): AuditEntry => ({
  id: createId("au"),
  at: new Date().toISOString(),
  action,
  kind,
  device: "Founder Console",
  location: "FAR HQ",
  ip: "10.0.0.1",
  result,
});

const findUser = (state: FounderUsersState, id: string) =>
  state.users.find((u) => u.id === id);

const founderUsersSlice = createSlice({
  name: "founderUsers",
  initialState,
  reducers: {
    addUser: (state, action: PayloadAction<ManagedUser>) => {
      state.users.unshift(action.payload);
    },
    updateUser: (
      state,
      action: PayloadAction<{
        id: string;
        patch: Partial<Omit<ManagedUser, "profile" | "id">>;
        profilePatch?: Partial<UserProfile>;
        audit?: AuditNote;
      }>
    ) => {
      const { id, patch, profilePatch, audit } = action.payload;
      const user = findUser(state, id);
      if (!user) return;
      Object.assign(user, patch);
      if (profilePatch) Object.assign(user.profile, profilePatch);
      if (audit) user.profile.audit.unshift(adminEntry(audit));
    },
    logUserActivity: (state, action: PayloadAction<{ id: string } & AuditNote>) => {
      const { id, ...note } = action.payload;
      findUser(state, id)?.profile.audit.unshift(adminEntry(note));
    },
  },
});

export const { addUser, updateUser, logUserActivity } = founderUsersSlice.actions;
export default founderUsersSlice.reducer;
