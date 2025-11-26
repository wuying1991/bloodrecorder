import React from 'react';
import * as Storage from '../services/storageService';
import { Button, Card } from '../components/UIComponents';
import { LogOut, User } from 'lucide-react';

const ProfilePage: React.FC<{ onLogout: () => void }> = ({ onLogout }) => {
  const profile = Storage.getProfile();

  if (!profile) return null;

  return (
    <div className="p-6 min-h-screen">
      <h1 className="text-2xl font-bold text-slate-900 mb-6">Profile</h1>

      <div className="flex items-center gap-4 mb-8">
        <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center text-teal-600">
            <User size={32} />
        </div>
        <div>
            <h2 className="text-xl font-bold text-slate-800">{profile.name}</h2>
            <p className="text-slate-500">{profile.age} years old • {profile.gender}</p>
        </div>
      </div>

      <div className="space-y-4 mb-8">
        <Card title="Physical Stats">
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <div className="text-xs text-slate-400 uppercase">Weight</div>
                    <div className="font-medium">{profile.weight} kg</div>
                </div>
                <div>
                    <div className="text-xs text-slate-400 uppercase">Height</div>
                    <div className="font-medium">{profile.height} cm</div>
                </div>
            </div>
        </Card>

        <Card title="Medical Details">
             <div className="space-y-3">
                <div>
                    <div className="text-xs text-slate-400 uppercase">Diagnosis</div>
                    <div className="font-medium">{profile.diseaseType}</div>
                </div>
                <div>
                    <div className="text-xs text-slate-400 uppercase">Chemo Scheme</div>
                    <div className="font-medium">{profile.chemoScheme}</div>
                </div>
                <div>
                    <div className="text-xs text-slate-400 uppercase">Treatment Start</div>
                    <div className="font-medium">{profile.startDate}</div>
                </div>
             </div>
        </Card>
      </div>

      <Button variant="danger" onClick={onLogout} className="flex items-center justify-center gap-2">
        <LogOut size={18} /> Log Out
      </Button>
    </div>
  );
};

export default ProfilePage;