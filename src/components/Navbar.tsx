import React from 'react';
import { Download } from 'lucide-react';

interface NavbarProps {
  onDownload: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onDownload }) => {
  return (
    <header className="sticky top-0 z-50 bg-slate-900/90 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-8 px-6 py-4">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#"
          className="text-lg font-bold tracking-tight text-white hover:text-amber-400 transition-colors whitespace-nowrap shrink-0"
        >
          PythonCalc
        </a>

        {/* Zone 2: 4 concise single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
          <a
            href="#codigo"
            className="hover:text-white transition-colors whitespace-nowrap shrink-0 hover:underline decoration-amber-400 underline-offset-8"
          >
            Código Python
          </a>
          <a
            href="#componentes"
            className="hover:text-white transition-colors whitespace-nowrap shrink-0 hover:underline decoration-amber-400 underline-offset-8"
          >
            Componentes
          </a>
          <a
            href="#terminal"
            className="hover:text-white transition-colors whitespace-nowrap shrink-0 hover:underline decoration-amber-400 underline-offset-8"
          >
            Terminal Interativo
          </a>
          <a
            href="#calculadora"
            className="hover:text-white transition-colors whitespace-nowrap shrink-0 hover:underline decoration-amber-400 underline-offset-8"
          >
            Calculadora Visual
          </a>
          <a
            href="#desafios"
            className="hover:text-white transition-colors whitespace-nowrap shrink-0 hover:underline decoration-amber-400 underline-offset-8"
          >
            Desafios
          </a>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center shrink-0">
          <button
            onClick={onDownload}
            className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 active:scale-95 transition-all rounded-lg shadow-sm whitespace-nowrap shrink-0 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Baixar .py</span>
          </button>
        </div>
      </div>
    </header>
  );
};
