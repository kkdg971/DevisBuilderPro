import React from 'react';
import { Lightbulb, AlertTriangle, Loader } from 'lucide-react';

interface AiInsightsProps {
  analysis: {
    suggestions: string[];
    alertes: string[];
  };
  isLoading: boolean;
}

export function AiInsights({ analysis, isLoading }: AiInsightsProps) {
  if (isLoading) {
    return (
      <div className="p-4 bg-slate-800/50 rounded-lg border border-slate-700 flex items-center justify-center">
        <Loader className="animate-spin text-orange-400 mr-2" size={20} />
        <span className="text-slate-300">Analyse IA en cours...</span>
      </div>
    );
  }

  if (!analysis || (analysis.suggestions.length === 0 && analysis.alertes.length === 0)) {
    return null; // Ne rien afficher si pas d'analyse
  }

  return (
    <div className="mt-8 p-6 bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl border border-slate-700 shadow-lg">
      <h3 className="text-xl font-bold text-white mb-4">💡 Analyse et Recommandations de l'IA</h3>
      
      {/* Suggestions */}
      {analysis.suggestions.length > 0 && (
        <div className="mb-4">
          <h4 className="font-semibold text-green-400 flex items-center gap-2 mb-2">
            <Lightbulb size={18} />
            Suggestions d'optimisation
          </h4>
          <ul className="list-disc list-inside space-y-1 text-slate-300">
            {analysis.suggestions.map((s, i) => <li key={`sug-${i}`}>{s}</li>)}
          </ul>
        </div>
      )}

      {/* Alertes */}
      {analysis.alertes.length > 0 && (
        <div>
          <h4 className="font-semibold text-yellow-400 flex items-center gap-2 mb-2">
            <AlertTriangle size={18} />
            Points de vigilance
          </h4>
          <ul className="list-disc list-inside space-y-1 text-slate-300">
            {analysis.alertes.map((a, i) => <li key={`alrt-${i}`}>{a}</li>)}
          </ul>
        </div>
      )}
    </div>
  );
}
