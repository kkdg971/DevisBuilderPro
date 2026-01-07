import { useEffect } from "react";
import { useLocation } from "wouter";

export default function Signup() {
  const [, setLocation] = useLocation();

  useEffect(() => {
    // Rediriger automatiquement vers la page d'accueil
    setLocation("/");
  }, [setLocation]);

  return null;
}