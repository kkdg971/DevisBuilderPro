import React from 'react';
import { FileText, Loader } from 'lucide-react';

interface AiSummaryProps {
  summary: {
    resume: string;
    notes: string;
  };
  isLoading: boolean;
}

export function AiSummary({ summary, isLoading }: AiSummaryProps) {
  if (isLoading) {
    return (
      <div className="p-4 bg-slate-100 rounded-lg text-center">
        <Loader className="animate-spin text-slate-500 inline-block mr-2" />
        <span className="text-slate-600">Génération du résumé...</span>
      </div>
    );
  }

  if (!summary || (!summary.resume && !summary.notes)) {
    return null;
  }

  return (
    <div className="mt-8 p-6 bg-white rounded-lg shadow-md">
      {summary.resume && (
        <div className="mb-4">
          <h4 className="text-lg font-semibold text-gray-800 mb-2 flex items-center">
            <FileText className="mr-2 text-blue-600" />
            Résumé du Devis
          </h4>
          <p className="text-gray-600 italic">{summary.resume}</p>
        </div>
      )}
      
      {summary.notes && (
        <div>
          <h4 className="text-lg font-semibold text-gray-800 mb-2">Notes Importantes</h4>
          <div className="text-gray-600 whitespace-pre-wrap text-sm border-l-4 border-blue-200 pl-4 py-2 bg-blue-50/50">
            {summary.notes}
          </div>
        </div>
      )}
    </div>
  );
}
