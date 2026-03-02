import React, { useState } from 'react';
import { api } from '../services/api';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle, ArrowRight, ArrowLeft } from 'lucide-react';
import { Card } from './ui/Card';
import { Input } from './ui/Input';
import { Button } from './ui/Button';
import { Layout } from './Layout';

const CONSULTATION_OPTIONS = [
  "Questionnaires & Youth Forums",
  "Religious/Church Forums",
  "Community Engagement",
  "Online Platforms",
  "Integrated Approach (All Methods)"
];

export default function SurveyForm({ onAdminAccess }: { onAdminAccess: () => void }) {
  const [step, setStep] = useState<'details' | 'question' | 'success'>('details');
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    idNumber: '',
    phoneNumber: '',
    consultationAnswer: ''
  });

  const handleDetailsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.idNumber && formData.phoneNumber) {
      setStep('question');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.consultationAnswer) return;

    setLoading(true);
    try {
      await api.submitSurvey(formData);
      setStep('success');
    } catch (error) {
      console.error(error);
      alert('Failed to submit survey. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setStep('details');
    setFormData({ name: '', idNumber: '', phoneNumber: '', consultationAnswer: '' });
  };

  return (
    <Layout 
      maxWidth="md"
      footerAction={
        <button 
          onClick={onAdminAccess}
          className="opacity-20 hover:opacity-100 transition-opacity"
        >
          Admin Access
        </button>
      }
    >
      <Card noPadding className="overflow-hidden border-t-4 border-pawa-red shadow-lg">
        {/* Header Section */}
        <div className="bg-pawa-blue p-8 text-center text-white">
          <div className="mb-6 flex justify-center">
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-white shadow-md ring-4 ring-pawa-red/20">
              <span className="text-2xl font-black tracking-tighter text-pawa-blue">PAWA</span>
            </div>
          </div>
          <h1 className="text-2xl font-bold uppercase tracking-wide">
            Progressive Action Welfare Alliance
          </h1>
          <p className="mt-2 text-sm font-medium italic text-red-200">
            "Rejuvenating the Comrades Power"
          </p>
        </div>

        {/* Form Content */}
        <div className="p-8 md:p-10">
          <AnimatePresence mode="wait">
            {step === 'details' && (
              <motion.div
                key="details"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <form onSubmit={handleDetailsSubmit} className="space-y-6">
                  <div className="space-y-4">
                    <Input
                      label="Full Name"
                      placeholder="Enter your full name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      autoFocus
                    />
                    <Input
                      label="ID Number"
                      placeholder="Enter your National ID"
                      value={formData.idNumber}
                      onChange={(e) => setFormData({ ...formData, idNumber: e.target.value })}
                      required
                    />
                    <Input
                      label="Phone Number"
                      type="tel"
                      placeholder="Enter your phone number"
                      value={formData.phoneNumber}
                      onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                      required
                    />
                  </div>
                  <Button type="submit" fullWidth className="mt-2">
                    Next Step <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </form>
              </motion.div>
            )}

            {step === 'question' && (
              <motion.div
                key="question"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-4">
                    <label className="block text-lg font-semibold text-pawa-blue">
                      What is the best method to conduct a nationwide youth consultation?
                    </label>
                    <div className="space-y-3">
                      {CONSULTATION_OPTIONS.map((option) => (
                        <label 
                          key={option}
                          className={`
                            flex items-center p-4 rounded-lg border cursor-pointer transition-all
                            ${formData.consultationAnswer === option 
                              ? 'border-pawa-blue bg-blue-50 ring-1 ring-pawa-blue' 
                              : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                            }
                          `}
                        >
                          <input
                            type="radio"
                            name="consultationOption"
                            value={option}
                            checked={formData.consultationAnswer === option}
                            onChange={(e) => setFormData({ ...formData, consultationAnswer: e.target.value })}
                            className="h-4 w-4 text-pawa-blue border-slate-300 focus:ring-pawa-blue"
                          />
                          <span className="ml-3 text-sm font-medium text-slate-700">
                            {option}
                          </span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-3 pt-2">
                    <Button
                      type="button"
                      variant="ghost"
                      onClick={() => setStep('details')}
                      className="flex-1"
                    >
                      <ArrowLeft className="mr-2 h-4 w-4" /> Back
                    </Button>
                    <Button
                      type="submit"
                      isLoading={loading}
                      className="flex-[2]"
                      disabled={!formData.consultationAnswer}
                    >
                      Submit Response
                    </Button>
                  </div>
                </form>
              </motion.div>
            )}

            {step === 'success' && (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="text-center py-8"
              >
                <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-50">
                  <CheckCircle className="h-10 w-10 text-green-600" />
                </div>
                <h3 className="mb-2 text-2xl font-bold text-pawa-blue">Thank You!</h3>
                <p className="text-slate-600">
                  Your submission has been recorded successfully.
                </p>
                <Button
                  variant="ghost"
                  onClick={resetForm}
                  className="mt-8 text-pawa-red hover:text-pawa-red-hover hover:bg-red-50"
                >
                  Submit another response
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Card>
    </Layout>
  );
}
