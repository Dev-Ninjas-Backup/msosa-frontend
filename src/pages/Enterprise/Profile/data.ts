export const PROFILE_TABS = [
  { id: "profile", label: "My Profile" },
  { id: "account", label: "Account Settings" },
  { id: "security", label: "Security" },
  { id: "notifications", label: "Notification Preferences" },
  { id: "sessions", label: "Login Sessions" },
  { id: "activity", label: "Activity Log" },
] as const;

export type ProfileTabId = (typeof PROFILE_TABS)[number]["id"];

export const PROFILE_USER = {
  firstName: "Liza",
  lastName: "Fernandes",
  displayName: "Liza Fernandes",
  jobTitle: "Organization Administrator",
  org: "Encounters Corporation",
  email: "liza.fernandes@Encounters.com",
  phone: "+1 (555) 234-5678",
  department: "Administration",
  position: "Lead Administrator",
  timezone: "UTC-5 Eastern Time",
  language: "English (US)",
  country: "United States",
  bio: "Enterprise platform administrator responsible for user management, system configuration, and organizational compliance at Encounters Corporation.",
  memberSince: "Jan 2024",
  lastLogin: "2 hours ago",
  role: "Admin",
  accountId: "ADM-2024-0041",
  recoveryEmail: "l.fernandes.recovery@gmail.com",
  avatarLetter: "E",
};

export const PERMISSIONS = [
  { name: "Employee Mgmt", access: "Full Access", icon: "users" },
  { name: "Reflection Mgmt", access: "Full Access", icon: "book" },
  { name: "Reports & QCV™", access: "Full Access", icon: "chart" },
  { name: "Invitation Mgmt", access: "Full Access", icon: "mail" },
  { name: "Billing™", access: "Full Access", icon: "card" },
  { name: "System Config", access: "Full Access", icon: "settings" },
] as const;

export const THEME_COLORS = [
  { label: "Background Color", value: "#000000" },
  { label: "Text Color", value: "#FFFFFF" },
  { label: "Button Background Color", value: "#fbbf24" },
  { label: "Button Text Color", value: "#000000" },
] as const;

export const ACCOUNT_TOGGLES = [
  {
    key: "visibility",
    title: "Profile Visibility",
    desc: "Allow other admins to see your profile.",
    on: true,
  },
  {
    key: "online",
    title: "Show Online Status",
    desc: "Display your active status to others.",
    on: true,
  },
  {
    key: "compact",
    title: "Compact View",
    desc: "Use compact list views across the platform.",
    on: false,
  },
  {
    key: "beta",
    title: "Beta Features",
    desc: "Access early feature releases before public rollout.",
    on: false,
  },
] as const;

export const PASSWORD_REQS = [
  "Minimum 8 characters",
  "Uppercase letter",
  "Lowercase letter",
  "Number",
  "Special character",
] as const;

export const NOTIF_CATEGORIES = [
  {
    title: "Platform Activity",
    enableAll: true,
    items: [
      { name: "Employee Invitations", email: true, inApp: true },
      { name: "Assessment Completion", email: true, inApp: true },
      { name: "New Reports", email: true, inApp: true },
      { name: "Quarterly Comparison Reports", email: false, inApp: true },
    ],
  },
  {
    title: "Billing & Subscription",
    items: [
      { name: "Subscription Updates", email: true, inApp: true },
      { name: "Billing Notifications", email: true, inApp: false },
    ],
  },
  {
    title: "Security Alerts",
    recommended: true,
    items: [
      {
        name: "Security Alerts",
        email: true,
        inApp: true,
        locked: true,
      },
      { name: "Login Verification", email: true, inApp: true },
    ],
  },
  {
    title: "System & Platform",
    items: [
      { name: "Platform Announcements", email: false, inApp: true },
      { name: "System Maintenance", email: true, inApp: true },
    ],
  },
] as const;

export const LOGIN_SESSIONS = [
  {
    id: "1",
    device: "Chrome on macOS",
    location: "San Francisco, CA",
    ip: "192.168.1.42",
    lastActive: "Active now",
    current: true,
  },
  {
    id: "2",
    device: "Safari on iPhone",
    location: "San Francisco, CA",
    ip: "192.168.1.88",
    lastActive: "2 hours ago",
    current: false,
  },
  {
    id: "3",
    device: "Chrome on Windows",
    location: "New York, NY",
    ip: "10.0.4.21",
    lastActive: "Yesterday",
    current: false,
  },
];

export const ACTIVITY_LOG = [
  {
    id: "1",
    action: "Profile updated",
    detail: "Personal information saved",
    time: "Today at 10:42 AM",
  },
  {
    id: "2",
    action: "Password changed",
    detail: "Security credentials updated",
    time: "30 days ago",
  },
  {
    id: "3",
    action: "2FA enabled",
    detail: "Google Authenticator configured",
    time: "45 days ago",
  },
  {
    id: "4",
    action: "Login from new device",
    detail: "Chrome on macOS · San Francisco, CA",
    time: "Today at 8:15 AM",
  },
  {
    id: "5",
    action: "Invoice downloaded",
    detail: "INV-00126 PDF exported",
    time: "Yesterday at 4:20 PM",
  },
];
