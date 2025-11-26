export interface UserProfile {
  name: string;
  age: string;
  gender: 'Male' | 'Female' | 'Other';
  weight: string;
  height: string;
  diseaseType: string; // e.g., Breast Cancer
  chemoScheme: string; // e.g., TC, AC-T
  startDate: string;
}

export interface BloodRecord {
  id: string;
  date: string;
  wbc: number; // White Blood Cells (10^9/L)
  neu: number; // Neutrophils (10^9/L)
  plt: number; // Platelets (10^9/L)
  hgb: number; // Hemoglobin (g/L)
  notes?: string;
}

export interface ChartDataPoint {
  date: string;
  value: number;
}

export enum TabView {
  DASHBOARD = 'dashboard',
  HISTORY = 'history',
  PROFILE = 'profile',
  AI_INSIGHTS = 'ai_insights'
}

export const NORMAL_RANGES = {
  wbc: { min: 3.5, max: 9.5, unit: '×10⁹/L', label: 'White Blood Cells' },
  neu: { min: 1.8, max: 6.3, unit: '×10⁹/L', label: 'Neutrophils' },
  plt: { min: 125, max: 350, unit: '×10⁹/L', label: 'Platelets' },
  hgb: { min: 115, max: 150, unit: 'g/L', label: 'Hemoglobin' },
};