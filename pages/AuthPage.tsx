import React, { useState } from 'react';
import { Input, Button, Card } from '../components/UIComponents';
import { HeartPulse } from 'lucide-react';
import * as Storage from '../services/storageService';

interface AuthPageProps {
  onLogin: () => void;
}

const AuthPage: React.FC<AuthPageProps> = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) {
      Storage.loginUser({ email, password });
      onLogin();
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-teal-50 max-w-md mx-auto">
      <div className="mb-8 flex flex-col items-center">
        <div className="bg-teal-600 p-4 rounded-full shadow-xl shadow-teal-200 mb-4">
            <HeartPulse size={40} color="white" />
        </div>
        <h1 className="text-2xl font-bold text-teal-900">ChemoCare Tracker</h1>
        <p className="text-teal-600 mt-1">Your companion for treatment</p>
      </div>

      <Card className="w-full animate-in fade-in zoom-in duration-300">
        <h2 className="text-xl font-bold mb-6 text-center">{isLogin ? 'Welcome Back' : 'Create Account'}</h2>
        <form onSubmit={handleSubmit}>
          <Input 
            label={isLogin ? "Email or Phone" : "Phone Number"} 
            type="text" 
            placeholder="Enter your contact info"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {!isLogin && (
             <Input label="Verification Code" type="text" placeholder="123456" />
          )}
          <Input 
            label="Password" 
            type="password" 
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          
          <div className="mt-6 flex flex-col gap-3">
            <Button type="submit">
              {isLogin ? 'Sign In' : 'Register'}
            </Button>
            <Button type="button" variant="secondary" onClick={() => setIsLogin(!isLogin)}>
              {isLogin ? 'Need an account? Register' : 'Have an account? Login'}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default AuthPage;