import React, { useState } from 'react';
import { Copy, Check, Download, Terminal, Sparkles, FileCode } from 'lucide-react';
import { CODE_LEVELS, CodeLevel } from '../data/calculatorCode';
import { highlightPython } from '../utils/pythonHighlighter';

interface CodeViewerProps {
  currentLevel: CodeLevel;
  onSelectLevel: (level: CodeLevel) => void;
  onSendToTerminal: () => void;
  onDownload: (code: string, filename: string) => void;
}

export const CodeViewer: React.FC<CodeViewerProps> = ({
  currentLevel,
  onSelectLevel,
  onSendToTerminal,
  onDownload,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(currentLevel.code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  return (
    <section id="codigo" className="py-12 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 text-xs text-amber-400 font-medium mb-1">
              <span>Código Python Organizado</span>
              <span aria-hidden="true">·</span>
              <span>Para Iniciantes</span>
              <span aria-hidden="true">·</span>
              <span>4 Operações Básicas</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Código Completo da Calculadora
            </h2>
            <p className="text-sm text-slate-400 mt-1 max-w-2xl">
              Escolha a abordagem mais confortável para o seu momento de aprendizado. Recomendamos começar pelas funções modulares (<code className="text-amber-300">def</code>).
            </p>
          </div>

          {/* Level Switcher: Functional Segmented Control */}
          <div className="flex items-center gap-1 p-1 bg-slate-950 rounded-lg border border-slate-800 self-start md:self-auto overflow-x-auto max-w-full">
            {CODE_LEVELS.map((lvl) => {
              const isActive = lvl.id === currentLevel.id;
              return (
                <button
                  key={lvl.id}
                  onClick={() => onSelectLevel(lvl)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors cursor-pointer ${
                    isActive
                      ? 'bg-amber-400 text-slate-950 shadow-sm font-semibold'
                      : 'text-slate-400 hover:text-white hover:bg-slate-900'
                  }`}
                >
                  {lvl.badge}
                </button>
              );
            })}
          </div>
        </div>

        {/* Code Container Card */}
        <div className="bg-slate-950 rounded-xl border border-slate-800 overflow-hidden shadow-2xl">
          {/* Editor Header Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 px-4 sm:px-6 py-3 bg-slate-900/80 border-b border-slate-800 text-xs">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
              </div>
              <div className="flex items-center gap-2 text-slate-300 font-mono">
                <FileCode className="w-3.5 h-3.5 text-amber-400" />
                <span>{currentLevel.filename}</span>
              </div>
              <span className="hidden sm:inline text-slate-600">|</span>
              <span className="hidden sm:inline text-slate-400">{currentLevel.description}</span>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-800 border border-slate-700 rounded-md transition-colors cursor-pointer"
                title="Copiar código para a área de transferência"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400">Copiado!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-slate-400" />
                    <span>Copiar</span>
                  </>
                )}
              </button>

              <button
                onClick={() => onDownload(currentLevel.code, currentLevel.filename)}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-800 border border-slate-700 rounded-md transition-colors cursor-pointer"
                title="Baixar arquivo .py para o seu computador"
              >
                <Download className="w-3.5 h-3.5 text-slate-400" />
                <span>Baixar</span>
              </button>

              <button
                onClick={onSendToTerminal}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-md transition-colors cursor-pointer shadow-sm"
                title="Testar este código agora no terminal interativo"
              >
                <Terminal className="w-3.5 h-3.5" />
                <span>Testar no Terminal</span>
              </button>
            </div>
          </div>

          {/* Code Body */}
          <div className="p-4 sm:p-6 overflow-x-auto max-h-[580px] scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-transparent">
            <div className="table w-full">
              {highlightPython(currentLevel.code)}
            </div>
          </div>

          {/* Footer note inside editor */}
          <div className="px-6 py-2.5 bg-slate-900/60 border-t border-slate-800/80 flex flex-wrap items-center justify-between text-xs text-slate-500 font-mono">
            <div className="flex items-center gap-2">
              <span>Python 3.10+</span>
              <span aria-hidden="true">·</span>
              <span>UTF-8</span>
              <span aria-hidden="true">·</span>
              <span>Indentação: 4 espaços</span>
            </div>
            <div className="text-slate-400">
              Total de linhas: <span className="text-amber-400 font-semibold">{currentLevel.code.split('\n').length}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
