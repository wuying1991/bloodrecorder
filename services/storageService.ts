import { BloodRecord, UserProfile } from '../types';

const PROFILE_KEY = 'chemo_care_profile';
const RECORDS_KEY = 'chemo_care_records';
const AUTH_KEY = 'chemo_care_auth';

// Mimic Auth
export const isAuthenticated = (): boolean => {
  return !!localStorage.getItem(AUTH_KEY);
};

export const loginUser = (credentials: any): boolean => {
  // Simulation of login
  localStorage.setItem(AUTH_KEY, 'true');
  return true;
};

export const logoutUser = () => {
  localStorage.removeItem(AUTH_KEY);
};

export const saveProfile = (profile: UserProfile) => {
  localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
};

export const getProfile = (): UserProfile | null => {
  const data = localStorage.getItem(PROFILE_KEY);
  return data ? JSON.parse(data) : null;
};

export const saveRecord = (record: BloodRecord) => {
  const records = getRecords();
  const existingIndex = records.findIndex((r) => r.date === record.date);
  
  if (existingIndex >= 0) {
    // Update existing for that date (requirement: one record per day)
    records[existingIndex] = { ...record, id: records[existingIndex].id };
  } else {
    // Add new
    records.push(record);
  }
  
  // Sort by date descending
  records.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  localStorage.setItem(RECORDS_KEY, JSON.stringify(records));
};

export const deleteRecord = (id: string) => {
  let records = getRecords();
  records = records.filter(r => r.id !== id);
  localStorage.setItem(RECORDS_KEY, JSON.stringify(records));
};

export const getRecords = (): BloodRecord[] => {
  const data = localStorage.getItem(RECORDS_KEY);
  return data ? JSON.parse(data) : [];
};

export const getRecordByDate = (date: string): BloodRecord | undefined => {
  const records = getRecords();
  return records.find(r => r.date === date);
};

// Export functionality
export const exportDataToCSV = () => {
  const records = getRecords();
  const headers = ['Date', 'WBC', 'NEU', 'PLT', 'HGB', 'Notes'];
  const rows = records.map(r => [r.date, r.wbc, r.neu, r.plt, r.hgb, r.notes || ''].join(','));
  return [headers.join(','), ...rows].join('\n');
};