import React, { useState } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { Mic, MessageCircle, DollarSign, TrendingUp, FileText, Bell, ShoppingCart, X as CloseIcon } from 'lucide-react';

const incomeData = [
  { name: 'Jan', income: 1200 },
  { name: 'Feb', income: 2100 },
  { name: 'Mar', income: 800 },
  { name: 'Apr', income: 1600 },
  { name: 'May', income: 900 },
  { name: 'Jun', income: 1700 },
];

/** 
const jarData = [
  { name: 'Tax Jar', value: 200 },
  { name: 'Time-off Jar', value: 150 },
  { name: 'Car Repair Jar', value: 100 },
  { name: 'Retirement Jar', value: 75 },
];
*/
// Jar data with transactions
const jarData = [
  {
    name: 'Tax Jar', value: 200,
    transactions: [
      { date: '2025-07-01', amount: 50, desc: 'Uber payout' },
      { date: '2025-07-03', amount: 30, desc: 'Lyft payout' },
    ],
  },
  {
    name: 'Time-off Jar', value: 150,
    transactions: [
      { date: '2025-07-02', amount: 20, desc: 'DoorDash payout' },
    ],
  },
  {
    name: 'Car Repair Jar', value: 100,
    transactions: [],
  },
  {
    name: 'Retirement Jar', value: 75,
    transactions: [
      { date: '2025-06-30', amount: 5, desc: 'ETF micro-investment' },
    ],
  },
];

const alerts = [
  { id: 1, message: 'Earnings trending 20% lower this week. Savings goals adjusted.' },
  { id: 2, message: 'Oil change due in 3 weeks. £50 saved in Car Repair Jar.' },
  { id: 3, message: 'Time-off goal achieved. You can afford to take Friday off.' },
];

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042'];

export default function FinancialCopilotUI() {
  const [showAdviceChat, setShowAdviceChat] = useState(false);
  const [showTaxModal, setShowTaxModal] = useState(false);
  const [showAIRecordModal, setShowAIRecordModal] = useState(false);
  const [recording, setRecording] = useState(false);
  const [selectedJar, setSelectedJar] = useState(null);

  const [adviceMessages, setAdviceMessages] = useState([
    { from: 'ai', text: 'Hi! Need some financial advice?' }
  ]);
  const [adviceInput, setAdviceInput] = useState('');

  const handleSendAdvice = () => {
    if (!adviceInput.trim()) return;
    setAdviceMessages(prev => [...prev, { from: 'user', text: adviceInput }]);
    setTimeout(() => {
      setAdviceMessages(prev => [...prev, { from: 'ai', text: "Here's a tip: Keep saving at least 15% into your jars!" }]);
    }, 500);
    setAdviceInput('');
  };

  const toggleRecording = () => {
    setRecording(r => !r);
    // TODO: integrate real voice recording
  };

  return (
    <div className="min-h-screen bg-gray-200 p-6">

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="shadow-lg">
          <CardContent>
            <h2 className="text-xl font-semibold flex items-center gap-2 mb-4">
              <TrendingUp /> Income Prediction
            </h2>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={incomeData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="income" stroke="#4F46E5" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

          {/* Automated Jars Pie Chart */}
      <Card className="shadow-lg mb-4">
        <CardContent>
          <h2 className="text-xl font-semibold flex items-center gap-2 mb-4">
            <ShoppingCart /> Automated Auto Jars
          </h2>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={jarData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={60}
                label
                onClick={(_, idx) => setSelectedJar(jarData[idx])}
              >
                {jarData.map((entry, idx) => (
                  <Cell key={idx} fill={COLORS[idx % COLORS.length]} />
                ))}
              </Pie>
              <Legend />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Jar Details Modal */}
      {selectedJar && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6 relative">
            <button
              className="absolute top-3 right-3 text-gray-400"
              onClick={() => setSelectedJar(null)}
            >
              <CloseIcon className="w-6 h-6" />
            </button>
            <h2 className="text-xl font-bold mb-2">{selectedJar.name} Details</h2>
            <p className="mb-4">Total saved: <strong>£{selectedJar.value}</strong></p>
            <h3 className="font-semibold mb-2">Recent Transactions:</h3>
            <ul className="space-y-1 max-h-40 overflow-y-auto text-sm">
              {selectedJar.transactions.length > 0 ? (
                selectedJar.transactions.map((tx, i) => (
                  <li key={i} className="flex justify-between border-b pb-1">
                    <span>{tx.date}</span>
                    <span>£{tx.amount}</span>
                    <span>{tx.desc}</span>
                  </li>
                ))
              ) : (
                <li>No transactions recorded.</li>
              )}
            </ul>
            <Button onClick={() => setSelectedJar(null)} className="w-full mt-4">
              Close
            </Button>
          </div>
        </div>
      )}

        <Card className="shadow-lg col-span-1 md:col-span-2">
          <CardContent>
            <h2 className="text-xl font-semibold flex items-center gap-2 mb-4">
              <Bell /> Proactive AI Alerts
            </h2>
            <ul className="space-y-2">
              {alerts.map(alert => (
                <li key={alert.id} className="bg-gray-100 p-2 rounded-md text-gray-700">
                  {alert.message}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card className="shadow-lg col-span-1 md:col-span-2">
          <CardContent>
            <h2 className="text-xl font-semibold flex items-center gap-2 mb-4">
              <DollarSign /> Quick Actions
            </h2>
            <div className="flex flex-col md:flex-row gap-2">
              <Button variant="outline" onClick={() => setShowTaxModal(true)} className="justify-start gap-2">
                <FileText /> Generate Tax Report
              </Button>
              <Button variant="outline" onClick={() => setShowAdviceChat(true)} className="justify-start gap-2">
                <MessageCircle /> Financial Advice
              </Button>
              <Button variant="outline" onClick={() => setShowAIRecordModal(true)} className="justify-start gap-2">
                <Mic /> Talk to AI Assistant
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {showTaxModal && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6 relative">
            <button className="absolute top-3 right-3" onClick={() => setShowTaxModal(false)}>
              <CloseIcon className="w-6 h-6 text-gray-400" />
            </button>
            <h2 className="text-xl font-bold mb-4">Your Tax Report</h2>
            <ul className="list-disc pl-4 text-gray-700 mb-4">
              <li>Estimated taxable income: £9,800</li>
              <li>Tax already set aside: £1,250 (from Tax Jar)</li>
              <li>Estimated due: £400</li>
              <li>Next tax filing date: 31 Jan 2025</li>
            </ul>
            <Button onClick={() => setShowTaxModal(false)} className="w-full mt-2">Close</Button>
          </div>
        </div>
      )}

      {showAIRecordModal && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6 relative">
            <button className="absolute top-3 right-3" onClick={() => setShowAIRecordModal(false)}>
              <CloseIcon className="w-6 h-6 text-gray-400" />
            </button>
            <h2 className="text-xl font-bold mb-4">Voice Message to AI Assistant</h2>
            <Button variant="secondary" onClick={() => toggleRecording()} className="w-full mb-4">
              {recording ? 'Stop Recording' : 'Start Recording'}
            </Button>
            <Button onClick={() => setShowAIRecordModal(false)} className="w-full" variant="ghost">
              Close
            </Button>
          </div>
        </div>
      )}

      {showAdviceChat && (
        <div className="fixed bottom-6 right-6 z-50 w-full max-w-xs">
          <div className="bg-white rounded-xl shadow-2xl p-3 relative">
            <button className="absolute top-3 right-3" onClick={() => setShowAdviceChat(false)}>
              <CloseIcon className="w-5 h-5 text-gray-400" />
            </button>
            <h3 className="font-bold mb-2">Financial Advice</h3>
            <div className="flex flex-col gap-1 h-40 overflow-y-auto mb-2">
              {adviceMessages.map((msg, idx) => (
                <div key={idx} className={msg.from === 'ai' ? 'self-start bg-gray-100 px-3 py-1 rounded-xl text-gray-800' : 'self-end bg-indigo-100 px-3 py-1 rounded-xl'}>
                  {msg.text}
                </div>
              ))}
            </div>
            <div className="flex gap-2">
              <input
                type="text" className="flex-1 border rounded p-2"
                placeholder="Ask for advice..."
                value={adviceInput}
                onChange={e => setAdviceInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSendAdvice()} />
              <Button onClick={handleSendAdvice}>Send</Button>
            </div>
          </div>
        </div>
      )}

      <div className="mt-6">
        <Card className="shadow-lg">
          <CardContent>
            <h2 className="text-xl font-semibold mb-4">Personalized Financial Summary</h2>
            <p className="text-gray-600">
              Your income is expected to fluctuate next month. Consider setting aside at least 15% into your savings fund. You've already allocated funds into Tax and Time-off jars to stay prepared.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
