import React, { useState, useEffect } from 'react';
import { Input, Button } from './UIComponents';
import { BloodRecord } from '../types';
import { X } from 'lucide-react';

interface RecordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (record: BloodRecord) => void;
  initialData?: BloodRecord;
}

const RecordModal: React.FC<RecordModalProps> = ({ isOpen, onClose, onSave, initialData }) => {
  const [formData, setFormData] = useState<Omit<BloodRecord, 'id'>>({
    date: new Date().toISOString().split('T')[0],
    wbc: 0,
    neu: 0,
    plt: 0,
    hgb: 0,
    notes: ''
  });

  useEffect(() => {
    if (initialData) {
        setFormData({ ...initialData });
    } else {
        setFormData({
            date: new Date().toISOString().split('T')[0],
            wbc: 0,
            neu: 0,
            plt: 0,
            hgb: 0,
            notes: ''
        });
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleChange = (field: keyof typeof formData, value: string) => {
    setFormData(prev => ({ 
        ...prev, 
        [field]: field === 'notes' || field === 'date' ? value : Number(value) 
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Validate non-negative
    if (formData.wbc < 0 || formData.neu < 0 || formData.plt < 0 || formData.hgb < 0) {
        alert("Values cannot be negative");
        return;
    }
    onSave({ 
        id: initialData?.id || Date.now().toString(), 
        ...formData 
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-sm p-0 sm:p-4">
      <div className="bg-white w-full max-w-md rounded-t-3xl sm:rounded-3xl p-6 animate-in slide-in-from-bottom-10 duration-300 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-slate-800">{initialData ? 'Edit Record' : 'New Blood Test'}</h2>
            <button onClick={onClose} className="p-2 bg-slate-100 rounded-full"><X size={20} /></button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-2">
            <Input 
                label="Date" 
                type="date" 
                value={formData.date}
                onChange={e => handleChange('date', e.target.value)}
                required
            />
            
            <div className="grid grid-cols-2 gap-4">
                <Input 
                    label="WBC (White Cells)" 
                    type="number" 
                    step="0.01"
                    unit="×10⁹"
                    value={formData.wbc || ''}
                    onChange={e => handleChange('wbc', e.target.value)}
                    required
                />
                <Input 
                    label="NEU (Neutrophils)" 
                    type="number" 
                    step="0.01"
                    unit="×10⁹"
                    value={formData.neu || ''}
                    onChange={e => handleChange('neu', e.target.value)}
                    required
                />
            </div>
            <div className="grid grid-cols-2 gap-4">
                <Input 
                    label="PLT (Platelets)" 
                    type="number" 
                    unit="×10⁹"
                    value={formData.plt || ''}
                    onChange={e => handleChange('plt', e.target.value)}
                    required
                />
                <Input 
                    label="HGB (Hemoglobin)" 
                    type="number" 
                    unit="g/L"
                    value={formData.hgb || ''}
                    onChange={e => handleChange('hgb', e.target.value)}
                    required
                />
            </div>

            <Input 
                label="Notes (Optional)" 
                placeholder="How did you feel?"
                value={formData.notes}
                onChange={e => handleChange('notes', e.target.value)}
            />

            <div className="pt-4">
                <Button type="submit">Save Record</Button>
            </div>
        </form>
      </div>
    </div>
  );
};

export default RecordModal;