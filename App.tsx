import React, { useState } from 'react';
import { BusinessForm } from './components/BusinessForm';
import { PlanDashboard } from './components/PlanDashboard';
import { BusinessProfile, GenerationState } from './types';
import { generateMediaPlan } from './services/geminiService';
import { ShoppingBasket, Loader2, AlertCircle } from 'lucide-react';

export default function App() {
  // Pre-filled with data observed from the user's uploaded screenshots
  const [profile, setProfile] = useState<BusinessProfile>({
    name: 'Supermercado Cirelli',
    niche: 'Supermercado e Hortifruti',
    location: 'Assis Chateaubriand, PR',
    targetAudience: 'Famílias locais, donas de casa, trabalhadores rurais e professores.',
    uniqueSellingPoints: 'Atendimento familiar, padaria artesanal, produtos frescos, apoio à comunidade.',
    socialMediaGoals: 'Aumentar engajamento com a comunidade local e divulgar ofertas semanais.',
  });

  const [generationState, setGenerationState] = useState<GenerationState>({
    isLoading: false,
    error: null,
    data: null,
  });

  const handleGeneratePlan = async () => {
    setGenerationState({ isLoading: true, error: null, data: null });
    try {
      const plan = await generateMediaPlan(profile);
      setGenerationState({ isLoading: false, error: null, data: plan });
    } catch (err: any) {
      setGenerationState({
        isLoading: false,
        error: err.message || "Erro ao gerar o plano. Tente novamente.",
        data: null,
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#0f1115] text-white selection:bg-green-500/30">
      
      {/* Header */}
      <header className="border-b border-gray-800 bg-[#0f1115] sticky top-0 z-50 backdrop-blur-lg bg-opacity-80">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-green-600 p-2 rounded-lg">
              <ShoppingBasket className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight">Cirelli<span className="text-green-500">.AI</span></h1>
              <p className="text-xs text-gray-400">Planejador de Mídia Digital</p>
            </div>
          </div>
          <div className="hidden sm:block">
            <span className="text-xs bg-gray-800 px-3 py-1 rounded-full text-gray-400 border border-gray-700">
              Powered by Gemini 2.5
            </span>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Input */}
          <div className="lg:col-span-4 space-y-6">
             <div className="prose prose-invert">
                <h2 className="text-2xl font-bold mb-2">Estratégia Digital</h2>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Confirme os dados abaixo (baseados no perfil do Instagram) para gerar um plano personalizado para o <span className="text-white font-medium">Supermercado Cirelli</span>.
                </p>
             </div>
             
             <BusinessForm 
               profile={profile} 
               setProfile={setProfile}
               onSubmit={handleGeneratePlan}
               isLoading={generationState.isLoading}
             />

             {generationState.error && (
               <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-4 flex items-start gap-3">
                 <AlertCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                 <p className="text-red-300 text-sm">{generationState.error}</p>
               </div>
             )}
          </div>

          {/* Right Column: Output */}
          <div className="lg:col-span-8">
            {generationState.isLoading ? (
              <div className="h-[600px] flex flex-col items-center justify-center text-center space-y-4 bg-gray-900/50 rounded-xl border border-gray-800 border-dashed">
                <Loader2 className="w-12 h-12 text-green-500 animate-spin" />
                <div>
                  <h3 className="text-xl font-semibold text-white">Analisando Perfil...</h3>
                  <p className="text-gray-400 max-w-xs mx-auto mt-2">
                    Nossa IA está criando personas, ideias de postagens e estratégias de crescimento para o Cirelli.
                  </p>
                </div>
              </div>
            ) : generationState.data ? (
              <PlanDashboard plan={generationState.data} />
            ) : (
              <div className="h-full min-h-[400px] flex flex-col items-center justify-center text-center space-y-6 bg-gray-900/30 rounded-xl border border-gray-800 border-dashed p-8">
                <div className="bg-gray-800 p-4 rounded-full">
                   <ShoppingBasket className="w-10 h-10 text-gray-600" />
                </div>
                <div className="max-w-md">
                  <h3 className="text-xl font-semibold text-white mb-2">Pronto para começar?</h3>
                  <p className="text-gray-400">
                    Clique em "Gerar Plano de Mídia Digital" para criar uma estratégia completa baseada nos dados ao lado.
                  </p>
                </div>
              </div>
            )}
          </div>

        </div>
      </main>
    </div>
  );
}
