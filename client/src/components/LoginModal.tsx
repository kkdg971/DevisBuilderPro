import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Mail, Lock, ArrowRight, AlertCircle, X } from "lucide-react";
import { trpc } from "@/lib/trpc";

interface LoginModalProps {
  onClose: () => void;
  onLoginSuccess: () => void;
}

export default function LoginModal({ onClose, onLoginSuccess }: LoginModalProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [signupData, setSignupData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    companyName: "",
    phone: "",
  });

  const utils = trpc.useUtils();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      await trpc.auth.login.mutate({
        email,
        password,
      });

      await utils.auth.me.refetch();
      // Petite pause pour que les données se mettent à jour
      setTimeout(() => {
        onLoginSuccess();
      }, 500);
    } catch (err: any) {
      setError(err.message || "Erreur lors de la connexion");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!signupData.firstName.trim()) {
      setError("Le prénom est requis");
      return;
    }
    if (!signupData.lastName.trim()) {
      setError("Le nom est requis");
      return;
    }
    if (!signupData.email.trim()) {
      setError("L'email est requis");
      return;
    }
    if (signupData.password.length < 8) {
      setError("Le mot de passe doit contenir au moins 8 caractères");
      return;
    }
    if (signupData.password !== signupData.confirmPassword) {
      setError("Les mots de passe ne correspondent pas");
      return;
    }
    if (!signupData.companyName.trim()) {
      setError("Le nom de l'entreprise est requis");
      return;
    }

    setIsLoading(true);

    try {
      await trpc.auth.signup.mutate({
        firstName: signupData.firstName,
        lastName: signupData.lastName,
        email: signupData.email,
        password: signupData.password,
        companyName: signupData.companyName,
        phone: signupData.phone,
      });

      await utils.auth.me.refetch();
      // Petite pause pour que les données se mettent à jour
      setTimeout(() => {
        onLoginSuccess();
      }, 500);
    } catch (err: any) {
      setError(err.message || "Erreur lors de l'inscription");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md bg-white/95 backdrop-blur-sm shadow-2xl">
        <div className="p-8">
          {/* Bouton fermer */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {!showSignup ? (
            // Formulaire de connexion
            <>
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Connexion requise</h2>
                <p className="text-gray-600 text-sm">
                  Connectez-vous pour générer vos devis
                </p>
              </div>

              <form onSubmit={handleLogin} className="space-y-4">
                {error && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-lg flex gap-3">
                    <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-red-700">{error}</p>
                  </div>
                )}

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="vous@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="pl-9 text-sm bg-gray-50 border-gray-300 focus:bg-white"
                      disabled={isLoading}
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                    Mot de passe
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="pl-9 text-sm bg-gray-50 border-gray-300 focus:bg-white"
                      disabled={isLoading}
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition-colors"
                  disabled={isLoading}
                >
                  {isLoading ? "Connexion..." : "Se connecter"}
                  {!isLoading && <ArrowRight className="w-4 h-4 ml-2" />}
                </Button>
              </form>

              <div className="mt-4 text-center">
                <p className="text-gray-600 text-sm">
                  Pas encore de compte ?{" "}
                  <button
                    onClick={() => {
                      setShowSignup(true);
                      setError("");
                    }}
                    className="text-blue-600 hover:text-blue-700 font-semibold"
                  >
                    S'inscrire
                  </button>
                </p>
              </div>
            </>
          ) : (
            // Formulaire d'inscription
            <>
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Créer un compte</h2>
                <p className="text-gray-600 text-sm">
                  Rejoignez-nous pour générer vos devis
                </p>
              </div>

              <form onSubmit={handleSignup} className="space-y-3">
                {error && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-lg flex gap-3">
                    <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-red-700">{error}</p>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Prénom
                    </label>
                    <Input
                      type="text"
                      placeholder="Jean"
                      value={signupData.firstName}
                      onChange={(e) => setSignupData({ ...signupData, firstName: e.target.value })}
                      required
                      className="text-xs bg-gray-50 border-gray-300 focus:bg-white"
                      disabled={isLoading}
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1">
                      Nom
                    </label>
                    <Input
                      type="text"
                      placeholder="Dupont"
                      value={signupData.lastName}
                      onChange={(e) => setSignupData({ ...signupData, lastName: e.target.value })}
                      required
                      className="text-xs bg-gray-50 border-gray-300 focus:bg-white"
                      disabled={isLoading}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <Input
                    type="email"
                    placeholder="vous@example.com"
                    value={signupData.email}
                    onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
                    required
                    className="text-xs bg-gray-50 border-gray-300 focus:bg-white"
                    disabled={isLoading}
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Entreprise
                  </label>
                  <Input
                    type="text"
                    placeholder="Électricité Dupont"
                    value={signupData.companyName}
                    onChange={(e) => setSignupData({ ...signupData, companyName: e.target.value })}
                    required
                    className="text-xs bg-gray-50 border-gray-300 focus:bg-white"
                    disabled={isLoading}
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Mot de passe
                  </label>
                  <Input
                    type="password"
                    placeholder="••••••••"
                    value={signupData.password}
                    onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
                    required
                    className="text-xs bg-gray-50 border-gray-300 focus:bg-white"
                    disabled={isLoading}
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Confirmer mot de passe
                  </label>
                  <Input
                    type="password"
                    placeholder="••••••••"
                    value={signupData.confirmPassword}
                    onChange={(e) => setSignupData({ ...signupData, confirmPassword: e.target.value })}
                    required
                    className="text-xs bg-gray-50 border-gray-300 focus:bg-white"
                    disabled={isLoading}
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-lg transition-colors text-sm"
                  disabled={isLoading}
                >
                  {isLoading ? "Création..." : "S'inscrire"}
                  {!isLoading && <ArrowRight className="w-4 h-4 ml-2" />}
                </Button>
              </form>

              <div className="mt-4 text-center">
                <p className="text-gray-600 text-sm">
                  Déjà inscrit ?{" "}
                  <button
                    onClick={() => {
                      setShowSignup(false);
                      setError("");
                    }}
                    className="text-blue-600 hover:text-blue-700 font-semibold"
                  >
                    Se connecter
                  </button>
                </p>
              </div>
            </>
          )}
        </div>
      </Card>
    </div>
  );
}