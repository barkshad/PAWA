import React, { useState } from 'react';
import { api } from '../services/api';
import { Lock, AlertCircle } from 'lucide-react';
import { Layout } from './Layout';
import { Card } from './ui/Card';
import { Input } from './ui/Input';
import { Button } from './ui/Button';

interface AdminLoginProps {
  onLogin: () => void;
  onCancel: () => void;
}

export default function AdminLogin({ onLogin, onCancel }: AdminLoginProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await api.loginAdmin(email, password);
      onLogin();
    } catch (err: any) {
      console.error(err);
      setError('Invalid credentials. Please check your email and password.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout maxWidth="sm">
      <Card noPadding className="overflow-hidden border-t-4 border-pawa-blue shadow-lg">
        <div className="bg-pawa-blue p-6 text-white flex items-center gap-3">
          <div className="p-2 bg-white/10 rounded-lg">
            <Lock className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-bold">Admin Portal</h2>
            <p className="text-xs text-blue-200">Secure Access Required</p>
          </div>
        </div>
        
        <form onSubmit={handleLogin} className="p-8 space-y-6">
          {error && (
            <div className="flex items-center gap-2 p-3 bg-red-50 text-red-700 text-sm rounded-md border border-red-100">
              <AlertCircle className="w-4 h-4 shrink-0" />
              {error}
            </div>
          )}
          
          <div className="space-y-4">
            <Input
              label="Email Address"
              type="email"
              placeholder="admin@example.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              autoFocus
            />
            
            <Input
              label="Password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="flex gap-3 pt-2">
            <Button
              type="button"
              variant="ghost"
              onClick={onCancel}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="secondary"
              isLoading={loading}
              className="flex-1"
            >
              Login
            </Button>
          </div>
        </form>
      </Card>
    </Layout>
  );
}
