import React, { useState } from 'react';
import LoginPage from './components/LoginPage';
import FinancialCopilotUI from './components/FinancialCopilotUI';
import FinovoLogo from './assets/finovo_logo.png';
import { Menu as MenuIcon, X, LogOut } from 'lucide-react';
import OnboardingPage from './components/OnboardingPage';


// Minimal Button
function Button({ children, className = '', ...props }) {
  return (
    <button
      className={`rounded-lg px-4 py-2 font-semibold transition ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export default function App() {
  const [user, setUser] = useState(null);
  const [authMode, setAuthMode] = useState('login');
  const [navOpen, setNavOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  // ---------------- Handlers ----------------
  const handleLogin = (u) => setUser(u);
  const handleRegister = (p) => setUser({ email: p.email, persona: p.persona });
  const handleLogout = () => {
    setUser(null);
    setAuthMode('login');
    setNavOpen(false);
    setProfileOpen(false);
  };

  // --------------- Auth Pages ---------------
  if (!user) {
    return authMode === 'login' ? (
      <LoginPage onLogin={handleLogin} switchToRegister={() => setAuthMode('register')} />
    ) : (
      <OnboardingPage onRegister={handleRegister} switchToLogin={() => setAuthMode('login')} />
    );
  }

  // --------------- Main Dashboard ----------
  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Slide‑in navigation drawer */}
      <aside
        className={`fixed inset-y-0 left-0 transform bg-white shadow-lg w-64 transition-transform duration-300 z-40 ${navOpen ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <div className="flex items-center justify-between p-4 border-b">
        <img src={FinovoLogo} alt="Finovo" className="max-h-14 w-auto object-contain drop-shadow-md" style={{ maxHeight: '80px' }} />
          <Button className="p-1" onClick={() => setNavOpen(false)}>
            <X className="w-5 h-5 text-gray-600" />
          </Button>
        </div>
        {/* Nav items — extend as needed */}
        <nav className="p-4 space-y-3 text-gray-700">
          <a href="#dashboard" className="block hover:text-indigo-600">Dashboard</a>
          <a href="#jars" className="block hover:text-indigo-600">Jars</a>
          <a href="#alerts" className="block hover:text-indigo-600">Alerts</a>
          <Button onClick={handleLogout} className="flex items-center gap-2 text-indigo-600 w-full justify-center border border-indigo-600 hover:bg-red-50">
            <LogOut className="w-4 h-4" /> Logout
          </Button>
        </nav>
      </aside>

      {/* Overlay when nav is open */}
      {navOpen && (
        <div className="fixed inset-0 bg-black/30 z-30" onClick={() => setNavOpen(false)}></div>
      )}

      {/* Main content area */}
      <div className="flex-1 flex flex-col relative z-10">
        {/* Header */}
        <header className="sticky top-0 bg-white px-6 h-20 flex items-center justify-between shadow-md z-10">
          <div className="flex items-center gap-3 h-full">
            {/* Hamburger */}
            <Button className="p-1 bg-white text-indigo-600 hover:bg-indigo-100" onClick={() => setNavOpen(true)}>
              <MenuIcon className="w-5 h-5" />
            </Button>
            <img src={FinovoLogo} alt="Finovo" className="max-h-14 w-auto object-contain drop-shadow-md" style={{ maxHeight: '80px' }} />
          </div>
          
          
          {/* Right: Avatar dropdown */}
          <div className="relative">
            <button
              onClick={() => setProfileOpen(open => !open)}
              className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center"
            >
              <span className="text-gray-600 font-semibold uppercase">
                {user.email.charAt(0)}
              </span>
            </button>
            {profileOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md overflow-hidden z-50">
                <div className="px-4 py-2 text-gray-800 break-words">{user.email}</div>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-indigo-600 hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </header>

        {/* Dashboard */}
        <main className="flex-1 overflow-y-auto">
          <FinancialCopilotUI persona={user.persona} />
        </main>
      </div>
    </div>
  );
}