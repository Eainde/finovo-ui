import React, { useState } from 'react';
import FinovoLogo from '../assets/finovo_logo_black.png';
import { Button } from './ui/button';
import {
  User, Mail, Lock, Calendar, Briefcase, DollarSign, Compass
} from 'lucide-react';

const QUESTIONS = [
  { key: 'name',    label: 'Full Name',          type: 'text',     placeholder: 'Jane Doe',      icon: <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" /> },
  { key: 'email',   label: 'Email Address',      type: 'email',    placeholder: 'you@example.com',icon: <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" /> },
  { key: 'password',label: 'Password',           type: 'password', placeholder: '••••••••',     icon: <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" /> },
  { key: 'age',     label: 'Age',                type: 'number',   placeholder: 'e.g. 29',       icon: <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" /> },
  { key: 'job',     label: 'Primary Role',       type: 'select',   options: [
      { label: 'Gig Worker', value: 'gig' },
      { label: 'Student',    value: 'student' },
      { label: 'Retired/Elder', value: 'elder' },
      { label: 'Other',      value: 'other' },
    ], icon: <Briefcase className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" /> },
  { key: 'income',  label: 'Monthly Income (£)', type: 'number',   placeholder: 'e.g. 2000',    icon: <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" /> },
  { key: 'persona', label: 'Main Goal',          type: 'select',   options: [
      { label: 'Maximize gig earnings', value: 'gig' },
      { label: 'Manage student life',   value: 'student' },
      { label: 'Safe, simple spending', value: 'elder' },
      { label: 'Just exploring',        value: 'other' },
    ], icon: <Compass className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" /> },
];

export default function OnboardingPage({ onRegister }) {
  const [answers, setAnswers] = useState({});
  const [errors, setErrors] = useState({});

  const handleChange = (key) => (e) => {
    setAnswers({ ...answers, [key]: e.target.value });
    setErrors({ ...errors, [key]: '' });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    let hasError = false;
    QUESTIONS.forEach(({ key }) => {
      if (!answers[key]) {
        newErrors[key] = 'Required';
        hasError = true;
      }
    });
    setErrors(newErrors);
    if (!hasError) onRegister(answers);
  };

  return (
    <div className="min-h-screen bg-white text-gray-800">
        
      {/* Hero Section */}
      <section className="bg-indigo-600 text-white py-16 px-8">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-8">
            <img
            src={FinovoLogo}
            alt="Finovo"
            className="h-24 w-auto object-contain mb-6 md:mb-0 md:mr-8 drop-shadow-lg"
            />
        <div>
            <h1 className="text-5xl font-extrabold mb-4">Welcome to Finovo</h1>
            <p className="text-xl">
                Your AI-powered financial copilot — forecast income, automate savings, and get proactive alerts.
            </p>
        </div>
        </div>
    </section>

      {/* Information Grid */}
      <section className="py-12 px-8">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-center p-6 bg-gray-100 rounded-lg">
            <Calendar className="w-10 h-10 text-indigo-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Income Forecasts</h3>
            <p className="text-center">Predict your next 7–14 days of earnings instantly.</p>
          </div>
          <div className="flex flex-col items-center p-6 bg-gray-100 rounded-lg">
            <DollarSign className="w-10 h-10 text-indigo-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Automated Jars</h3>
            <p className="text-center">Auto-allocate funds for taxes, time-off, repairs, and retirement.</p>
          </div>
          <div className="flex flex-col items-center p-6 bg-gray-100 rounded-lg">
            <Lock className="w-10 h-10 text-indigo-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2">Secure & Easy</h3>
            <p className="text-center">Bank-grade security with a user-friendly experience.</p>
          </div>
        </div>
      </section>

      {/* Onboarding Form Section */}
      <section className="py-12 px-8 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">Quick Setup</h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {QUESTIONS.map((q) => (
              <div key={q.key} className="relative">
                {q.icon}
                {q.type === 'select' ? (
                  <select
                    value={answers[q.key] || ''}
                    onChange={handleChange(q.key)}
                    className="w-full pl-12 pr-4 py-3 bg-white border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  >
                    <option value="">Select {q.label}</option>
                    {q.options.map((opt) => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                ) : (
                  <input
                    type={q.type}
                    placeholder={q.placeholder}
                    value={answers[q.key] || ''}
                    onChange={handleChange(q.key)}
                    className="w-full pl-12 pr-4 py-3 bg-white border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
                  />
                )}
                {errors[q.key] && <p className="text-red-500 text-sm mt-1">{errors[q.key]}</p>}
              </div>
            ))}
            <div className="md:col-span-2 flex justify-center mt-4">
              <Button
                type="submit"
                className="bg-indigo-600 hover:bg-indigo-700 text-white py-4 px-12 rounded-full font-semibold text-lg transition"
              >
                Finish Onboarding
              </Button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}
