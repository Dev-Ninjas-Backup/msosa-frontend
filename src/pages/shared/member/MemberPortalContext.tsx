import { createContext, useContext, type ReactNode } from "react";

export type MemberRole = "consumer" | "employee";

type MemberPortalValue = {
  basePath: `/${MemberRole}`;
  role: MemberRole;
  roleLabel: string;
  path: (segment?: string) => string;
};

const MemberPortalContext = createContext<MemberPortalValue | null>(null);

export const MemberPortalProvider = ({
  role,
  children,
}: {
  role: MemberRole;
  children: ReactNode;
}) => {
  const basePath = `/${role}` as const;
  const value: MemberPortalValue = {
    basePath,
    role,
    roleLabel: role === "employee" ? "Employee" : "Consumer",
    path: (segment = "") => {
      const clean = segment.replace(/^\//, "");
      return clean ? `${basePath}/${clean}` : basePath;
    },
  };

  return (
    <MemberPortalContext.Provider value={value}>
      {children}
    </MemberPortalContext.Provider>
  );
};

export const useMemberPortal = () => {
  const ctx = useContext(MemberPortalContext);
  if (!ctx) {
    throw new Error("useMemberPortal must be used within MemberPortalProvider");
  }
  return ctx;
};
