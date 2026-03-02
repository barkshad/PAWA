import React, { useState } from 'react';
import { api } from '../services/api';
import { motion } from 'motion/react';
import { Loader2, CheckCircle, Send } from 'lucide-react';

export default function SurveyForm() {
  const [step, setStep] = useState<'details' | 'question' | 'success'>('details');
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phoneNumber: '',
    consultationAnswer: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.consultationAnswer.trim()) return;

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

  const handleDetailsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.phoneNumber) {
      setStep('question');
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border-t-4 border-[#D62828]">
      <div className="bg-[#002855] p-6 text-white text-center">
        <div className="mb-4 flex justify-center">
           {/* Placeholder for the logo - User should replace src with actual logo path */}
           <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center border-4 border-[#D62828] shadow-lg">
             <span className="text-[#002855] font-black text-2xl tracking-tighter">PAWA</span>
           </div>
        </div>
        <h2 className="text-2xl font-bold uppercase tracking-wide">Progressive Action Welfare Alliance</h2>
        <p className="text-red-200 mt-2 font-medium italic text-sm">"Rejuvenating the Comrades Power"</p>
      </div>

      <div className="p-8">
        {step === 'details' && (
          <motion.form
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            onSubmit={handleDetailsSubmit}
            className="space-y-6"
          >
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
              <input
                type="text"
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#002855] focus:border-[#002855] outline-none transition-all"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={e => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
              <input
                type="tel"
                required
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#002855] focus:border-[#002855] outline-none transition-all"
                placeholder="Enter your phone number"
                value={formData.phoneNumber}
                onChange={e => setFormData({ ...formData, phoneNumber: e.target.value })}
              />
            </div>
            <button
              type="submit"
              className="w-full bg-[#D62828] hover:bg-red-700 text-white font-bold py-3 rounded-lg transition-colors flex items-center justify-center gap-2 shadow-md"
            >
              Next Step
            </button>
          </motion.form>
        )}

        {step === 'question' && (
          <motion.form
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            <div>
              <label className="block text-lg font-medium text-[#002855] mb-4">
                What is the single most important issue facing youth in your community today?
              </label>
              <textarea
                required
                rows={6}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#002855] focus:border-[#002855] outline-none transition-all resize-none"
                placeholder="Share your thoughts here..."
                value={formData.consultationAnswer}
                onChange={e => setFormData({ ...formData, consultationAnswer: e.target.value })}
              />
            </div>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setStep('details')}
                className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 rounded-lg transition-colors"
              >
                Back
              </button>
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-[#D62828] hover:bg-red-700 text-white font-bold py-3 rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-70 shadow-md"
              >
                {loading ? <Loader2 className="animate-spin w-5 h-5" /> : <><Send className="w-5 h-5" /> Submit</>}
              </button>
            </div>
          </motion.form>
        )}

        {step === 'success' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-8"
          >
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-[#002855] mb-2">Thank You!</h3>
            <p className="text-gray-600">Your submission has been recorded successfully.</p>
            <button
              onClick={() => {
                setStep('details');
                setFormData({ name: '', phoneNumber: '', consultationAnswer: '' });
              }}
              className="mt-8 text-[#D62828] hover:text-red-800 font-medium"
            >
              Submit another response
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
