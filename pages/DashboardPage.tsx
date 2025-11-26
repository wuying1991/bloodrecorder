import React, { useState, useEffect } from 'react';
import { Card, StatBadge } from '../components/UIComponents';
import * as Storage from '../services/storageService';
import { UserProfile, BloodRecord, NORMAL_RANGES } from '../types';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';

interface DashboardPageProps {
  refreshTrigger: number;
}

type MetricKey = 'wbc' | 'neu' | 'plt' | 'hgb';

const DashboardPage: React.FC<DashboardPageProps> = ({ refreshTrigger }) => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [records, setRecords] = useState<BloodRecord[]>([]);
  const [selectedMetric, setSelectedMetric] = useState<MetricKey>('wbc');

  useEffect(() => {
    setProfile(Storage.getProfile());
    // Get records and reverse for chart (oldest first)
    const data = Storage.getRecords();
    setRecords([...data].reverse());
  }, [refreshTrigger]);

  const latest = records.length > 0 ? records[records.length - 1] : null;

  const getStatus = (val: number, key: MetricKey) => {
    if (val < NORMAL_RANGES[key].min) return 'low';
    if (val > NORMAL_RANGES[key].max) return 'high';
    return 'normal';
  };

  const MetricSelector = ({ label, mKey }: { label: string, mKey: MetricKey }) => (
    <button 
        onClick={() => setSelectedMetric(mKey)}
        className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${selectedMetric === mKey ? 'bg-teal-600 text-white shadow-md' : 'bg-slate-200 text-slate-600'}`}
    >
        {label}
    </button>
  );

  return (
    <div className="p-6 space-y-6">
      <header>
        <h1 className="text-2xl font-bold text-slate-900">Hello, {profile?.name.split(' ')[0]}</h1>
        <p className="text-slate-500 text-sm">
          {profile?.diseaseType} • {profile?.chemoScheme}
        </p>
      </header>

      {latest && (
        <section>
            <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-3">Last Check: {latest.date}</h2>
            <div className="grid grid-cols-2 gap-3">
                <StatBadge label="WBC" value={latest.wbc} unit={NORMAL_RANGES.wbc.unit} status={getStatus(latest.wbc, 'wbc')} />
                <StatBadge label="NEU" value={latest.neu} unit={NORMAL_RANGES.neu.unit} status={getStatus(latest.neu, 'neu')} />
                <StatBadge label="PLT" value={latest.plt} unit={NORMAL_RANGES.plt.unit} status={getStatus(latest.plt, 'plt')} />
                <StatBadge label="HGB" value={latest.hgb} unit={NORMAL_RANGES.hgb.unit} status={getStatus(latest.hgb, 'hgb')} />
            </div>
        </section>
      )}

      <section>
        <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-bold text-slate-800">Trends</h2>
        </div>
        
        <Card className="p-2">
            <div className="flex gap-2 mb-4 overflow-x-auto pb-2 no-scrollbar">
                <MetricSelector label="WBC" mKey="wbc" />
                <MetricSelector label="NEU" mKey="neu" />
                <MetricSelector label="PLT" mKey="plt" />
                <MetricSelector label="HGB" mKey="hgb" />
            </div>

            <div className="h-64 w-full">
                {records.length > 0 ? (
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={records} margin={{ top: 5, right: 5, bottom: 5, left: -20 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                            <XAxis 
                                dataKey="date" 
                                tick={{fontSize: 10, fill: '#94a3b8'}} 
                                tickFormatter={(val) => val.slice(5)} 
                            />
                            <YAxis 
                                domain={['auto', 'auto']} 
                                tick={{fontSize: 10, fill: '#94a3b8'}}
                            />
                            <Tooltip 
                                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                            />
                            <ReferenceLine y={NORMAL_RANGES[selectedMetric].min} stroke="#ef4444" strokeDasharray="3 3" label={{ value: 'Min', position: 'insideBottomRight', fontSize: 10, fill: '#ef4444' }} />
                            <ReferenceLine y={NORMAL_RANGES[selectedMetric].max} stroke="#ef4444" strokeDasharray="3 3" />
                            <Line 
                                type="monotone" 
                                dataKey={selectedMetric} 
                                stroke="#0d9488" 
                                strokeWidth={3} 
                                dot={{ r: 4, fill: '#0d9488', strokeWidth: 2, stroke: '#fff' }}
                                activeDot={{ r: 6 }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                ) : (
                    <div className="h-full flex items-center justify-center text-slate-400 text-sm">
                        No data recorded yet.
                    </div>
                )}
            </div>
        </Card>
      </section>
    </div>
  );
};

export default DashboardPage;