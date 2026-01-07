import { useEffect } from "react";
import { useLocation } from "wouter";

export default function Login() {
  const [, setLocation] = useLocation();

  useEffect(() => {
    // Rediriger automatiquement vers la page d'accueil
    setLocation("/");
  }, [setLocation]);

  return null;
}