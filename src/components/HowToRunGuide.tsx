import React, { useState } from 'react';
import { Download, Terminal, CheckCircle2, ChevronRight, Copy, Check, Laptop } from 'lucide-react';

interface HowToRunGuideProps {
  onDownload: () => void;
}

export const HowToRunGuide: React.FC<HowToRunGuideProps> = ({ onDownload }) => {
  const [copiedCmd, setCopiedCmd] = useState(false);

  const handleCopyCmd = async () => {
    try {
      await navigator.clipboard.writeText('python calculadora.py');
      setCopiedCmd(true);
      setTimeout(() => setCopiedCmd(false), 2000);
    } catch {
      // Fallback
    }
  };

  return (
    <section className="py-16 border-b border-slate-800 bg-slate-900/40">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-10 text-center max-w-2xl mx-auto">
          <div className="flex items-center justify-center gap-2 text-xs text-amber-400 font-medium mb-1">
            <span>Do Navegador para o seu PC</span>
            <span aria-hidden="true">·</span>
            <span>Passo a Passo</span>
            <span aria-hidden="true">·</span>
            <span>Windows, Mac e Linux</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            Como Rodar a Calculadora no seu Computador
          </h2>
          <p className="text-sm text-slate-400 mt-2">
            Programar de verdade é ver o código rodando na sua própria máquina. Siga estes 3 passos simples para executar seu script agora.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Step 1 */}
          <div className="bg-slate-950 rounded-xl border border-slate-800 p-6 flex flex-col justify-between shadow-lg">
            <div>
              <div className="w-8 h-8 rounded-lg bg-amber-400/10 border border-amber-400/20 text-amber-400 font-bold flex items-center justify-center text-sm font-mono mb-4">
                01
              </div>
              <h3 className="text-base font-semibold text-white mb-2">
                Instale o Python Oficial
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed mb-4">
                Acesse o site oficial <strong className="text-slate-200">python.org</strong> e baixe a versão mais recente.
              </p>
              <div className="p-3 bg-amber-950/20 rounded-lg border border-amber-800/40 text-xs text-amber-200/90 leading-relaxed">
                ⚠️ <strong>Atenção no Windows:</strong> Na primeira tela do instalador, marque a opção <span className="underline font-semibold">"Add Python to PATH"</span> antes de clicar em Install Now!
              </div>
            </div>
            <div className="pt-4 mt-4 border-t border-slate-900 text-[11px] text-slate-500">
              Disponível gratuitamente para Windows, macOS e Linux.
            </div>
          </div>

          {/* Step 2 */}
          <div className="bg-slate-950 rounded-xl border border-slate-800 p-6 flex flex-col justify-between shadow-lg">
            <div>
              <div className="w-8 h-8 rounded-lg bg-amber-400/10 border border-amber-400/20 text-amber-400 font-bold flex items-center justify-center text-sm font-mono mb-4">
                02
              </div>
              <h3 className="text-base font-semibold text-white mb-2">
                Salve o Script .py
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed mb-4">
                Baixe o arquivo diretamente clicando no botão abaixo ou crie um arquivo chamado <code className="text-amber-300">calculadora.py</code> no VS Code ou Bloco de Notas e cole o código.
              </p>
              <button
                onClick={onDownload}
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-white rounded-lg text-xs font-semibold transition-colors cursor-pointer"
              >
                <Download className="w-4 h-4 text-amber-400" />
                <span>Baixar calculadora.py</span>
              </button>
            </div>
            <div className="pt-4 mt-4 border-t border-slate-900 text-[11px] text-slate-500">
              Dica: Guarde o arquivo em uma pasta fácil, como sua pasta Documentos.
            </div>
          </div>

          {/* Step 3 */}
          <div className="bg-slate-950 rounded-xl border border-slate-800 p-6 flex flex-col justify-between shadow-lg">
            <div>
              <div className="w-8 h-8 rounded-lg bg-amber-400/10 border border-amber-400/20 text-amber-400 font-bold flex items-center justify-center text-sm font-mono mb-4">
                03
              </div>
              <h3 className="text-base font-semibold text-white mb-2">
                Execute no Terminal
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed mb-4">
                Abra o Prompt de Comando (CMD) ou Terminal na pasta onde salvou o arquivo e execute o comando:
              </p>

              <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800 font-mono text-xs flex items-center justify-between text-emerald-400 mb-3">
                <span>python calculadora.py</span>
                <button
                  onClick={handleCopyCmd}
                  className="p-1 hover:bg-slate-800 text-slate-400 hover:text-white rounded cursor-pointer"
                  title="Copiar comando"
                >
                  {copiedCmd ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                A calculadora iniciará imediatamente, permitindo que você digite os números e veja o resultado no terminal!
              </p>
            </div>
            <div className="pt-4 mt-4 border-t border-slate-900 text-[11px] text-slate-500">
              No macOS ou Linux, você também pode usar <code className="text-slate-300">python3 calculadora.py</code>.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
