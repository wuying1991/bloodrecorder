import React, { useState, useEffect } from 'react';
import { BloodRecord } from '../types';
import * as Storage from '../services/storageService';
import { Search, Edit2, Trash2, FileText } from 'lucide-react';

interface HistoryPageProps {
  refreshTrigger: number;
  onEdit: (record: BloodRecord) => void;
}

const HistoryPage: React.FC<HistoryPageProps> = ({ refreshTrigger, onEdit }) => {
  const [records, setRecords] = useState<BloodRecord[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchRecords = () => {
      const data = Storage.getRecords();
      setRecords(data);
  };

  useEffect(() => {
    fetchRecords();
  }, [refreshTrigger]);

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this record?")) {
        Storage.deleteRecord(id);
        fetchRecords();
    }
  };

  const filteredRecords = records.filter(r => r.date.includes(searchTerm));

  return (
    <div className="p-6 min-h-screen bg-slate-50">
      <div className="flex justify-between items-end mb-6">
        <h1 className="text-2xl font-bold text-slate-900">History</h1>
        <button 
            onClick={() => {
                const csv = Storage.exportDataToCSV();
                const blob = new Blob([csv], { type: 'text/csv' });
                const url = window.URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'blood_records.csv';
                a.click();
            }}
            className="text-teal-600 text-sm font-medium flex items-center gap-1"
        >
            <FileText size={16} /> Export
        </button>
      </div>

      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
        <input 
            type="text" 
            placeholder="Search by date (YYYY-MM-DD)"
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-teal-500 outline-none"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="space-y-4">
        {filteredRecords.length === 0 ? (
            <div className="text-center text-slate-400 py-10">No records found.</div>
        ) : (
            filteredRecords.map((record) => (
                <div key={record.id} className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex justify-between items-start">
                    <div>
                        <div className="font-bold text-slate-800 text-lg mb-2">{record.date}</div>
                        <div className="grid grid-cols-2 gap-x-6 gap-y-1 text-sm text-slate-600">
                            <span>WBC: <span className="font-semibold text-slate-900">{record.wbc}</span></span>
                            <span>NEU: <span className="font-semibold text-slate-900">{record.neu}</span></span>
                            <span>PLT: <span className="font-semibold text-slate-900">{record.plt}</span></span>
                            <span>HGB: <span className="font-semibold text-slate-900">{record.hgb}</span></span>
                        </div>
                        {record.notes && (
                            <div className="mt-2 text-xs text-slate-400 italic">"{record.notes}"</div>
                        )}
                    </div>
                    <div className="flex gap-2">
                        <button onClick={() => onEdit(record)} className="p-2 text-slate-400 hover:text-teal-600 hover:bg-teal-50 rounded-lg transition-colors">
                            <Edit2 size={18} />
                        </button>
                        <button onClick={() => handleDelete(record.id)} className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                            <Trash2 size={18} />
                        </button>
                    </div>
                </div>
            ))
        )}
      </div>
    </div>
  );
};

export default HistoryPage;