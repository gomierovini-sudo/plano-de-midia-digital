import React from 'react';
import { MarketingPlan, ContentDay, Persona } from '../types';
import { 
  Calendar, 
  Users, 
  Target, 
  TrendingUp, 
  Hash, 
  Lightbulb,
  CheckCircle2,
  Instagram
} from 'lucide-react';

interface PlanDashboardProps {
  plan: MarketingPlan;
}

export const PlanDashboard: React.FC<PlanDashboardProps> = ({ plan }) => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Executive Summary */}
      <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700 backdrop-blur-sm">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-blue-500/20 rounded-lg">
            <Target className="w-6 h-6 text-blue-400" />
          </div>
          <h2 className="text-2xl font-bold text-white">Resumo Executivo</h2>
        </div>
        <p className="text-gray-300 leading-relaxed text-lg">
          {plan.executiveSummary}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Content Pillars */}
        <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="flex items-center gap-3 mb-4">
            <TrendingUp className="w-5 h-5 text-orange-400" />
            <h3 className="text-lg font-semibold text-white">Pilares de Conteúdo</h3>
          </div>
          <ul className="space-y-3">
            {plan.contentPillars.map((pillar, idx) => (
              <li key={idx} className="flex items-start gap-3 bg-gray-700/50 p-3 rounded-lg">
                <div className="w-1.5 h-1.5 rounded-full bg-orange-400 mt-2 shrink-0" />
                <span className="text-gray-200">{pillar}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Personas */}
        <div className="lg:col-span-2 bg-gray-800 rounded-xl p-6 border border-gray-700">
          <div className="flex items-center gap-3 mb-4">
            <Users className="w-5 h-5 text-purple-400" />
            <h3 className="text-lg font-semibold text-white">Personas Identificadas</h3>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {plan.personas.map((persona: Persona, idx) => (
              <div key={idx} className="bg-gray-700/30 p-4 rounded-lg border border-gray-700">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-bold text-white">{persona.name}</h4>
                  <span className="text-xs bg-purple-500/20 text-purple-300 px-2 py-1 rounded-full">
                    {persona.ageRange}
                  </span>
                </div>
                <p className="text-sm text-gray-400 mb-3 italic">{persona.description}</p>
                <div className="space-y-1">
                  <p className="text-xs text-gray-500 font-semibold uppercase">Interesses:</p>
                  <div className="flex flex-wrap gap-1">
                    {persona.interests.slice(0,3).map((int, i) => (
                      <span key={i} className="text-xs bg-gray-600 px-2 py-0.5 rounded text-gray-300">
                        {int}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Weekly Calendar */}
      <div className="bg-white rounded-xl overflow-hidden shadow-2xl">
        <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-6">
          <div className="flex items-center gap-3 text-white">
            <Calendar className="w-6 h-6" />
            <h2 className="text-2xl font-bold">Calendário Semanal Sugerido</h2>
          </div>
          <p className="text-green-100 mt-2">Uma semana de conteúdo estratégico pronto para aplicar.</p>
        </div>
        <div className="divide-y divide-gray-100">
          {plan.weeklySchedule.map((day: ContentDay, idx) => (
            <div key={idx} className="p-4 md:p-6 hover:bg-gray-50 transition-colors">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="md:w-32 shrink-0">
                  <span className="inline-block bg-gray-100 text-gray-700 font-bold px-3 py-1 rounded-full text-sm">
                    {day.day}
                  </span>
                  <div className="mt-2 flex items-center gap-1 text-xs font-semibold text-gray-500 uppercase">
                    {day.format === 'Reels' && <Instagram className="w-3 h-3 text-pink-500" />}
                    {day.format}
                  </div>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold text-green-600 uppercase tracking-wide">
                      {day.theme}
                    </span>
                  </div>
                  <h4 className="text-lg font-medium text-gray-900 mb-2">{day.postIdea}</h4>
                  <div className="bg-yellow-50 border border-yellow-100 p-3 rounded-lg">
                    <p className="text-sm text-gray-700">
                      <span className="font-bold text-yellow-700">Gancho da Legenda: </span> 
                      "{day.captionHook}"
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Growth Tactics */}
        <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
          <div className="flex items-center gap-3 mb-4">
            <Lightbulb className="w-5 h-5 text-yellow-400" />
            <h3 className="text-lg font-semibold text-white">Táticas de Crescimento</h3>
          </div>
          <ul className="space-y-3">
            {plan.growthTactics.map((tactic, idx) => (
              <li key={idx} className="flex gap-3 text-gray-300 text-sm">
                <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                {tactic}
              </li>
            ))}
          </ul>
        </div>

        {/* Hashtags */}
        <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
          <div className="flex items-center gap-3 mb-4">
            <Hash className="w-5 h-5 text-pink-400" />
            <h3 className="text-lg font-semibold text-white">Hashtags Estratégicas</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {plan.suggestedHashtags.map((tag, idx) => (
              <span key={idx} className="bg-pink-500/10 text-pink-400 px-3 py-1 rounded-full text-sm hover:bg-pink-500/20 transition cursor-default">
                #{tag.replace('#', '')}
              </span>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
};
