/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { CodeViewer } from './components/CodeViewer';
import { ComponentsGuide } from './components/ComponentsGuide';
import { InteractiveTerminal } from './components/InteractiveTerminal';
import { VisualCalculatorSync } from './components/VisualCalculatorSync';
import { QuizSection } from './components/QuizSection';
import { HowToRunGuide } from './components/HowToRunGuide';
import { CODE_LEVELS, CodeLevel } from './data/calculatorCode';
import { Code, Terminal, BookOpen, Download, ChevronRight, Check, Sparkles } from 'lucide-react';

export default function App() {
  const [currentLevel, setCurrentLevel] = useState<CodeLevel>(CODE_LEVELS[0]);

  const handleDownload = (
    codeContent: string = currentLevel.code,
    filename: string = currentLevel.filename
  ) => {
    const blob = new Blob([codeContent], { type: 'text/x-python;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-sans">
      {/* Top Bar Contract (1 line wordmark, 4-5 single-line links, 1 primary action) */}
      <Navbar onDownload={() => handleDownload()} />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative pt-16 pb-20 border-b border-slate-800 overflow-hidden">
          {/* Subtle background ambient grid (clean, non-neon) */}
          <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] opacity-40 pointer-events-none" />

          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="max-w-3xl">
              {/* Unboxed metadata kicker */}
              <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400 font-medium mb-4">
                <span className="text-amber-400 font-semibold">Python para Iniciantes</span>
                <span aria-hidden="true">·</span>
                <span>As 4 Operações Básicas (+, -, *, /)</span>
                <span aria-hidden="true">·</span>
                <span>Estrutura Limpa e Comentada</span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
                Como Criar uma Calculadora Simples em Python
              </h1>

              <p className="mt-4 text-base sm:text-lg text-slate-300 leading-relaxed">
                Bem-vindo ao mundo da programação! Construir uma calculadora é o projeto clássico perfeito para dominar os conceitos fundamentais: <strong className="text-amber-300 font-semibold">funções (<code className="text-amber-300 font-mono text-sm">def</code>)</strong>, <strong className="text-sky-300 font-semibold">leitura de dados (<code className="text-sky-300 font-mono text-sm">input</code>)</strong>, <strong className="text-emerald-300 font-semibold">decisões lógicas (<code className="text-emerald-300 font-mono text-sm">if/elif</code>)</strong> e <strong className="text-rose-300 font-semibold">prevenção de erros</strong>.
              </p>

              {/* Action buttons */}
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => scrollToSection('codigo')}
                  className="px-5 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-semibold text-xs rounded-lg transition-all shadow-md flex items-center gap-2 cursor-pointer active:scale-95"
                >
                  <Code className="w-4 h-4" />
                  <span>Ver Código Python</span>
                </button>

                <button
                  onClick={() => scrollToSection('terminal')}
                  className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-white font-medium text-xs rounded-lg border border-slate-700 transition-all flex items-center gap-2 cursor-pointer active:scale-95"
                >
                  <Terminal className="w-4 h-4 text-amber-400" />
                  <span>Testar no Terminal</span>
                </button>

                <button
                  onClick={() => handleDownload()}
                  className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white font-medium text-xs rounded-lg border border-slate-800 transition-all flex items-center gap-2 cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>Baixar .py</span>
                </button>
              </div>
            </div>

            {/* Quick 4 Operations Cards Grid */}
            <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 bg-slate-950/70 rounded-xl border border-slate-800">
                <div className="text-xs text-amber-400 font-mono font-semibold mb-1">Operação 1: Adição</div>
                <div className="text-sm font-bold text-white mb-1">somar(a, b)</div>
                <div className="text-xs font-mono text-slate-400 bg-slate-900 p-2 rounded border border-slate-800/80">
                  return a + b
                </div>
                <div className="text-[11px] text-slate-400 mt-2">
                  Junta dois números somando seus valores matemáticos.
                </div>
              </div>

              <div className="p-4 bg-slate-950/70 rounded-xl border border-slate-800">
                <div className="text-xs text-amber-400 font-mono font-semibold mb-1">Operação 2: Subtração</div>
                <div className="text-sm font-bold text-white mb-1">subtrair(a, b)</div>
                <div className="text-xs font-mono text-slate-400 bg-slate-900 p-2 rounded border border-slate-800/80">
                  return a - b
                </div>
                <div className="text-[11px] text-slate-400 mt-2">
                  Calcula a diferença entre o primeiro e o segundo número.
                </div>
              </div>

              <div className="p-4 bg-slate-950/70 rounded-xl border border-slate-800">
                <div className="text-xs text-amber-400 font-mono font-semibold mb-1">Operação 3: Multiplicação</div>
                <div className="text-sm font-bold text-white mb-1">multiplicar(a, b)</div>
                <div className="text-xs font-mono text-slate-400 bg-slate-900 p-2 rounded border border-slate-800/80">
                  return a * b
                </div>
                <div className="text-[11px] text-slate-400 mt-2">
                  No Python, usamos o asterisco (*) para multiplicar.
                </div>
              </div>

              <div className="p-4 bg-slate-950/70 rounded-xl border border-slate-800">
                <div className="text-xs text-amber-400 font-mono font-semibold mb-1">Operação 4: Divisão</div>
                <div className="text-sm font-bold text-white mb-1">dividir(a, b)</div>
                <div className="text-xs font-mono text-slate-400 bg-slate-900 p-2 rounded border border-slate-800/80">
                  if b == 0: return "Erro"
                </div>
                <div className="text-[11px] text-slate-400 mt-2">
                  Protegida contra divisão por zero para evitar que o script trave.
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 1: Complete Python Code with Level Switcher */}
        <CodeViewer
          currentLevel={currentLevel}
          onSelectLevel={setCurrentLevel}
          onSendToTerminal={() => scrollToSection('terminal')}
          onDownload={handleDownload}
        />

        {/* Section 2: Detailed Breakdown of Components */}
        <ComponentsGuide />

        {/* Section 3: Interactive Python Terminal */}
        <InteractiveTerminal />

        {/* Section 4: Visual Calculator synchronized with Python */}
        <VisualCalculatorSync />

        {/* Section 5: Quiz & Practice Challenges */}
        <QuizSection />

        {/* Section 6: How to Run on your PC */}
        <HowToRunGuide onDownload={() => handleDownload()} />
      </main>

      {/* Footer (Clean, quiet, zero fake status tickers) */}
      <footer className="py-10 bg-slate-950 border-t border-slate-800 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-300">PythonCalc</span>
            <span aria-hidden="true">·</span>
            <span>Guia Didático para Iniciantes em Programação</span>
          </div>

          <div className="flex items-center gap-6">
            <a href="#codigo" className="hover:text-slate-300 transition-colors">Código</a>
            <a href="#componentes" className="hover:text-slate-300 transition-colors">Componentes</a>
            <a href="#terminal" className="hover:text-slate-300 transition-colors">Terminal</a>
            <a href="#desafios" className="hover:text-slate-300 transition-colors">Quiz</a>
            <button
              onClick={() => handleDownload()}
              className="text-amber-400 hover:text-amber-300 transition-colors cursor-pointer"
            >
              Baixar .py
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
