import React, { useState } from 'react';
import { Menu, X, LogOut, User, LogIn } from 'lucide-react';
import { useAuth } from '@/_core/hooks/useAuth';
import { getLoginUrl } from '@/const';

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuth();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogin = () => {
    window.location.href = getLoginUrl();
  };

  const handleSignup = () => {
    const signupUrl = getLoginUrl().replace('type=signIn', 'type=signUp');
    window.location.href = signupUrl;
  };

  const handleLogout = async () => {
    await logout();
    setIsOpen(false);
  };

  return (
    <nav className="bg-slate-900 border-b border-slate-700 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center gap-2">
            <div className="bg-orange-500 p-2 rounded-lg">
              <span className="text-white font-bold text-xl">DB</span>
            </div>
            <span className="text-white font-bold text-lg hidden sm:inline">DevisBuilder Pro</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <a href="/" className="text-slate-300 hover:text-white transition">Accueil</a>
            <a href="#services" className="text-slate-300 hover:text-white transition">Services</a>
            <a href="#tarifs" className="text-slate-300 hover:text-white transition">Tarifs</a>
            <a href="#contact" className="text-slate-300 hover:text-white transition">Contact</a>
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center gap-4">
            {isAuthenticated ? (
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-slate-300">
                  <User size={18} />
                  <span className="text-sm">{user?.name || user?.email || 'Utilisateur'}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition"
                >
                  <LogOut size={18} />
                  Déconnexion
                </button>
              </div>
            ) : (
              <>
                <button
                  onClick={handleLogin}
                  className="flex items-center gap-2 px-4 py-2 text-orange-500 border border-orange-500 hover:bg-orange-500 hover:text-white rounded-lg transition"
                >
                  <LogIn size={18} />
                  Connexion
                </button>
                <button
                  onClick={handleSignup}
                  className="flex items-center gap-2 px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded-lg transition"
                >
                  Inscription
                </button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-white p-2 rounded-lg hover:bg-slate-800 transition"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden bg-slate-800 border-t border-slate-700">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <a href="/" className="block px-3 py-2 text-slate-300 hover:text-white hover:bg-slate-700 rounded-lg transition">
                Accueil
              </a>
              <a href="#services" className="block px-3 py-2 text-slate-300 hover:text-white hover:bg-slate-700 rounded-lg transition">
                Services
              </a>
              <a href="#tarifs" className="block px-3 py-2 text-slate-300 hover:text-white hover:bg-slate-700 rounded-lg transition">
                Tarifs
              </a>
              <a href="#contact" className="block px-3 py-2 text-slate-300 hover:text-white hover:bg-slate-700 rounded-lg transition">
                Contact
              </a>

              <div className="border-t border-slate-700 pt-2 mt-2 space-y-2">
                {isAuthenticated ? (
                  <>
                    <div className="px-3 py-2 text-slate-300 text-sm">
                      {user?.name || user?.email || 'Utilisateur'}
                    </div>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-3 py-2 text-red-500 hover:bg-slate-700 rounded-lg transition"
                    >
                      Déconnexion
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={handleLogin}
                      className="w-full text-left px-3 py-2 text-orange-500 hover:bg-slate-700 rounded-lg transition"
                    >
                      Connexion
                    </button>
                    <button
                      onClick={handleSignup}
                      className="w-full text-left px-3 py-2 bg-orange-500 text-white hover:bg-orange-600 rounded-lg transition"
                    >
                      Inscription
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}