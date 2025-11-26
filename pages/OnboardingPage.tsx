import React, { useState } from 'react';
import { Input, Button, Card } from '../components/UIComponents';
import { UserProfile } from '../types';

interface OnboardingPageProps {
  onSave: (profile: UserProfile) => void;
}

const OnboardingPage: React.FC<OnboardingPageProps> = ({ onSave }) => {
  const [formData, setFormData] = useState<UserProfile>({
    name: '',
    age: '',
    gender: 'Male',
    weight: '',
    height: '',
    diseaseType: '',
    chemoScheme: '',
    startDate: new Date().toISOString().split('T')[0],
  });

  const handleChange = (field: keyof UserProfile, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Basic validation
    if (!formData.name || !formData.diseaseType) return;
    onSave(formData);
  };

  return (
    <div className="min-h-screen p-6 bg-slate-50 max-w-md mx-auto">
      <h1 className="text-2xl font-bold text-slate-900 mb-2">My Profile</h1>
      <p className="text-slate-500 mb-6">Please complete your treatment details.</p>

      <form onSubmit={handleSubmit} className="space-y-4 pb-10">
        <Card title="Personal Details">
          <Input 
            label="Full Name" 
            value={formData.name} 
            onChange={e => handleChange('name', e.target.value)} 
            placeholder="e.g. Jane Doe"
          />
          <div className="grid grid-cols-2 gap-4">
            <Input 
              label="Age" 
              type="number" 
              value={formData.age} 
              onChange={e => handleChange('age', e.target.value)} 
            />
            <div>
                <label className="text-sm font-medium text-slate-600 ml-1">Gender</label>
                <select 
                    className="w-full p-3 mt-1 rounded-xl border border-slate-200 bg-white outline-none"
                    value={formData.gender}
                    onChange={e => handleChange('gender', e.target.value as any)}
                >
                    <option>Male</option>
                    <option>Female</option>
                    <option>Other</option>
                </select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-4">
            <Input 
                label="Weight" 
                unit="kg"
                type="number"
                value={formData.weight} 
                onChange={e => handleChange('weight', e.target.value)} 
            />
            <Input 
                label="Height" 
                unit="cm"
                type="number"
                value={formData.height} 
                onChange={e => handleChange('height', e.target.value)} 
            />
          </div>
        </Card>

        <Card title="Treatment Information">
            <Input 
                label="Diagnosis / Disease Type" 
                placeholder="e.g. Breast Cancer"
                value={formData.diseaseType} 
                onChange={e => handleChange('diseaseType', e.target.value)} 
            />
             <Input 
                label="Chemotherapy Scheme" 
                placeholder="e.g. TC, AC-T"
                value={formData.chemoScheme} 
                onChange={e => handleChange('chemoScheme', e.target.value)} 
            />
            <Input 
                label="Start Date" 
                type="date"
                value={formData.startDate} 
                onChange={e => handleChange('startDate', e.target.value)} 
            />
        </Card>

        <Button type="submit" className="mt-4">Start Tracking</Button>
      </form>
    </div>
  );
};

export default OnboardingPage;