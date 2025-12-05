import React from 'react';
import { BusinessProfile } from '../types';
import { Sparkles } from 'lucide-react';

interface BusinessFormProps {
  profile: BusinessProfile;
  setProfile: (profile: BusinessProfile) => void;
  onSubmit: () => void;
  isLoading: boolean;
}

export const BusinessForm: React.FC<BusinessFormProps> = ({
  profile,
  setProfile,
  onSubmit,
  isLoading,
}) => {
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  return (
    <div className="bg-gray-900 rounded-xl p-6 shadow-xl border border-gray-800">
      <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
        <Sparkles className="w-5 h-5 text-green-500" />
        Configurar Perfil do Negócio
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-xs font-medium text-gray-400 uppercase tracking-wider">
            Nome do Negócio
          </label>
          <input
            type="text"
            name="name"
            value={profile.name}
            onChange={handleChange}
            className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg p-3 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition"
          />
        </div>

        <div className="space-y-2">
          <label className="text-xs font-medium text-gray-400 uppercase tracking-wider">
            Nicho / Categoria
          </label>
          <input
            type="text"
            name="niche"
            value={profile.niche}
            onChange={handleChange}
            className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg p-3 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition"
          />
        </div>

        <div className="space-y-2">
          <label className="text-xs font-medium text-gray-400 uppercase tracking-wider">
            Localização
          </label>
          <input
            type="text"
            name="location"
            value={profile.location}
            onChange={handleChange}
            className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg p-3 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition"
          />
        </div>

        <div className="space-y-2">
          <label className="text-xs font-medium text-gray-400 uppercase tracking-wider">
            Diferenciais (USP)
          </label>
          <input
            type="text"
            name="uniqueSellingPoints"
            value={profile.uniqueSellingPoints}
            onChange={handleChange}
            className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg p-3 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition"
          />
        </div>

        <div className="space-y-2 md:col-span-2">
          <label className="text-xs font-medium text-gray-400 uppercase tracking-wider">
            Público-Alvo
          </label>
          <textarea
            name="targetAudience"
            value={profile.targetAudience}
            onChange={handleChange}
            rows={2}
            className="w-full bg-gray-800 border border-gray-700 text-white rounded-lg p-3 focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition resize-none"
          />
        </div>
      </div>

      <div className="mt-6">
        <button
          onClick={onSubmit}
          disabled={isLoading}
          className="w-full bg-gradient-to-r from-green-600 to-green-500 hover:from-green-500 hover:to-green-400 text-white font-bold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-[1.01] active:scale-[0.99] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              Gerando Estratégia...
            </>
          ) : (
            <>
              <Sparkles className="w-5 h-5 fill-current" />
              Gerar Plano de Mídia Digital
            </>
          )}
        </button>
      </div>
    </div>
  );
};
