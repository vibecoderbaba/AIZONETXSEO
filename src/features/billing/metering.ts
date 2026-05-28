// SaaS Metered credit calculations and Agency White-Label Branding Systems

export interface MeteredUsageLog {
  id: string;
  action: string;
  creditsConsumed: number;
  remainingCredits: number;
  timestamp: string;
}

export interface WhiteLabelConfig {
  isEnabled: boolean;
  companyName: string;
  agencyLogoUrl?: string;
  customDomain?: string;
  primaryColor?: string; // hex code
}

const defaultWhiteLabel: WhiteLabelConfig = {
  isEnabled: false,
  companyName: "AIZONET OS",
  primaryColor: "#7c3aed"
};

// Simple storage simulation
let currentConfig: WhiteLabelConfig = { ...defaultWhiteLabel };
const usageLogs: MeteredUsageLog[] = [
  {
    id: "use_1",
    action: "Autonomous Sitemap IndexNow Submission",
    creditsConsumed: 1,
    remainingCredits: 199,
    timestamp: new Date(Date.now() - 1200000).toISOString()
  },
  {
    id: "use_2",
    action: "Multi-Agent Co-Working Audit Execution",
    creditsConsumed: 5,
    remainingCredits: 194,
    timestamp: new Date(Date.now() - 600000).toISOString()
  }
];

export function getWhiteLabelConfig(): WhiteLabelConfig {
  return currentConfig;
}

export function updateWhiteLabelConfig(newConfig: Partial<WhiteLabelConfig>): WhiteLabelConfig {
  currentConfig = {
    ...currentConfig,
    ...newConfig
  };
  return currentConfig;
}

export function logUsage(action: string, consumed: number, currentCredits: number): MeteredUsageLog {
  const log: MeteredUsageLog = {
    id: `use_${Date.now()}`,
    action,
    creditsConsumed: consumed,
    remainingCredits: Math.max(0, currentCredits - consumed),
    timestamp: new Date().toISOString()
  };
  usageLogs.unshift(log);
  if (usageLogs.length > 50) {
    usageLogs.pop();
  }
  return log;
}

export function getUsageLogs(): MeteredUsageLog[] {
  return usageLogs;
}
