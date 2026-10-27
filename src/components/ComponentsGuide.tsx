import React, { useState } from 'react';
import { COMPONENT_EXPLANATIONS, ComponentExplanation } from '../data/calculatorCode';
import { highlightPython } from '../utils/pythonHighlighter';
import { BookOpen, AlertTriangle, Lightbulb, CheckCircle2 } from 'lucide-react';

export const ComponentsGuide: React.FC = () => {
  const [selectedId, setSelectedId] = useState<string>(COMPONENT_EXPLANATIONS[0].id);

  const activeItem = COMPONENT_EXPLANATIONS.find((c) => c.id === selectedId) || COMPONENT_EXPLANATIONS[0];

  return (
    <section id="componentes" className="py-16 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-8">
          <div className="flex items-center gap-2 text-xs text-amber-400 font-medium mb-1">
            <span>Guia Passo a Passo</span>
            <span aria-hidden="true">·</span>
            <span>Fundamentos da Linguagem</span>
            <span aria-hidden="true">·</span>
            <span>Didática para Iniciantes</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            Explicação dos Principais Componentes
          </h2>
          <p className="text-sm text-slate-400 mt-1 max-w-2xl">
            Entenda a função exata de cada linha de código. Clique em um dos blocos abaixo para ver como ele funciona, por que é necessário e quais erros evitar.
          </p>
        </div>

        {/* Component Selector Tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 mb-8">
          {COMPONENT_EXPLANATIONS.map((comp) => {
            const isSelected = comp.id === selectedId;
            return (
              <button
                key={comp.id}
                onClick={() => setSelectedId(comp.id)}
                className={`p-3 text-left rounded-lg border transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'bg-slate-800/90 border-amber-400/80 shadow-md ring-1 ring-amber-400/30'
                    : 'bg-slate-950/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900/60'
                }`}
              >
                <div className="text-xs font-semibold text-slate-200 line-clamp-1">
                  {comp.title.split('(')[0].trim()}
                </div>
                <div className="font-mono text-[11px] text-amber-400/90 mt-1 truncate">
                  {comp.pythonConcept.split(':')[0]}
                </div>
              </button>
            );
          })}
        </div>

        {/* Active Component Deep Dive Card */}
        <div className="bg-slate-950 border border-slate-800 rounded-xl p-6 sm:p-8 shadow-xl">
          <div className="flex flex-col lg:flex-row gap-8 items-start">
            {/* Left Column: Conceptual Explanation */}
            <div className="lg:w-7/12 space-y-6">
              <div>
                <div className="text-xs font-mono text-amber-400 mb-1">
                  {activeItem.pythonConcept}
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                  {activeItem.title}
                </h3>
              </div>

              <div className="space-y-4 text-sm text-slate-300 leading-relaxed">
                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5 flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-amber-400" />
                    O que é este componente?
                  </h4>
                  <p className="bg-slate-900/60 p-3.5 rounded-lg border border-slate-800/80 text-slate-300">
                    {activeItem.summary}
                  </p>
                </div>

                <div>
                  <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-1.5 flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    Por que ele é essencial na calculadora?
                  </h4>
                  <p className="text-slate-300">
                    {activeItem.whyImportant}
                  </p>
                </div>
              </div>

              {/* Callouts: Mistake & Tip */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="p-4 rounded-lg bg-rose-950/20 border border-rose-800/40">
                  <div className="flex items-center gap-2 text-rose-400 font-semibold text-xs mb-1.5">
                    <AlertTriangle className="w-4 h-4 shrink-0" />
                    <span>Pegadinha de Iniciante</span>
                  </div>
                  <p className="text-xs text-rose-200/90 leading-relaxed">
                    {activeItem.beginnerMistake}
                  </p>
                </div>

                <div className="p-4 rounded-lg bg-amber-950/20 border border-amber-800/40">
                  <div className="flex items-center gap-2 text-amber-400 font-semibold text-xs mb-1.5">
                    <Lightbulb className="w-4 h-4 shrink-0" />
                    <span>Dica Prática</span>
                  </div>
                  <p className="text-xs text-amber-200/90 leading-relaxed">
                    {activeItem.tip}
                  </p>
                </div>
              </div>
            </div>

            {/* Right Column: Code Snippet & Visual Live Demonstration */}
            <div className="lg:w-5/12 w-full space-y-4">
              <div className="rounded-lg bg-slate-900 border border-slate-800 overflow-hidden">
                <div className="px-4 py-2.5 bg-slate-900 border-b border-slate-800 flex items-center justify-between text-xs text-slate-400 font-mono">
                  <span>Exemplo em Python</span>
                  <span className="text-amber-400">sintaxe válida</span>
                </div>
                <div className="p-4 overflow-x-auto text-xs font-mono">
                  <div className="table w-full">
                    {highlightPython(activeItem.codeSnippet)}
                  </div>
                </div>
              </div>

              {/* Mini Interactive Demonstration per component */}
              <InteractiveMicroDemo componentId={activeItem.id} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

/**
 * Micro interactive demonstrations for instant practical grasp.
 * Each demo is split into its own independent component to strictly obey
 * React's Rules of Hooks (unconditional top-level hook execution).
 */

const InputFloatMicroDemo: React.FC = () => {
  const [val1, setVal1] = useState('5');
  const [val2, setVal2] = useState('3');

  const withoutFloat = `${val1}${val2}`;
  const numA = parseFloat(val1) || 0;
  const numB = parseFloat(val2) || 0;
  const withFloat = (numA + numB).toString();

  return (
    <div className="p-4 rounded-lg bg-slate-900/90 border border-slate-800 space-y-3">
      <div className="text-xs font-semibold text-white">
        Simulação: O que acontece com vs sem float()?
      </div>
      <div className="grid grid-cols-2 gap-2 text-xs">
        <div>
          <label className="text-[11px] text-slate-400">Primeira entrada:</label>
          <input
            type="text"
            value={val1}
            onChange={(e) => setVal1(e.target.value)}
            className="w-full mt-1 px-2.5 py-1.5 bg-slate-950 border border-slate-700 rounded text-amber-300 font-mono text-xs focus:outline-none focus:border-amber-400"
          />
        </div>
        <div>
          <label className="text-[11px] text-slate-400">Segunda entrada:</label>
          <input
            type="text"
            value={val2}
            onChange={(e) => setVal2(e.target.value)}
            className="w-full mt-1 px-2.5 py-1.5 bg-slate-950 border border-slate-700 rounded text-amber-300 font-mono text-xs focus:outline-none focus:border-amber-400"
          />
        </div>
      </div>

      <div className="space-y-1.5 pt-1 text-xs font-mono">
        <div className="p-2 rounded bg-rose-950/30 border border-rose-900/40 text-rose-300 flex justify-between items-center">
          <span>Sem float() (texto):</span>
          <span className="font-bold">"{val1}" + "{val2}" = "{withoutFloat}"</span>
        </div>
        <div className="p-2 rounded bg-emerald-950/30 border border-emerald-900/40 text-emerald-300 flex justify-between items-center">
          <span>Com float() (número):</span>
          <span className="font-bold">{val1 || '0'} + {val2 || '0'} = {withFloat}</span>
        </div>
      </div>
    </div>
  );
};

const ZeroDivisionMicroDemo: React.FC = () => {
  const [num, setNum] = useState(10);
  const [divisor, setDivisor] = useState(0);

  return (
    <div className="p-4 rounded-lg bg-slate-900/90 border border-slate-800 space-y-3">
      <div className="text-xs font-semibold text-white">
        Simulação: Testando Divisor Zero
      </div>
      <div className="grid grid-cols-2 gap-2 text-xs">
        <div>
          <label className="text-[11px] text-slate-400">Dividendo (a):</label>
          <input
            type="number"
            value={num}
            onChange={(e) => setNum(Number(e.target.value))}
            className="w-full mt-1 px-2.5 py-1.5 bg-slate-950 border border-slate-700 rounded text-white font-mono text-xs"
          />
        </div>
        <div>
          <label className="text-[11px] text-slate-400">Divisor (b):</label>
          <input
            type="number"
            value={divisor}
            onChange={(e) => setDivisor(Number(e.target.value))}
            className="w-full mt-1 px-2.5 py-1.5 bg-slate-950 border border-slate-700 rounded text-white font-mono text-xs"
          />
        </div>
      </div>

      <div className="p-2.5 rounded bg-slate-950 border border-slate-800 text-xs font-mono">
        {divisor === 0 ? (
          <div className="text-rose-400 font-semibold">
            Tratamento ativado: if b == 0 retornou "Erro: Não é possível dividir por zero!" (evitando queda do programa).
          </div>
        ) : (
          <div className="text-emerald-400">
            Operação segura: {num} / {divisor} = {(num / divisor).toFixed(4)}
          </div>
        )}
      </div>
    </div>
  );
};

const FStringsMicroDemo: React.FC = () => {
  const [nome, setNome] = useState('Maria');
  const [resultado, setResultado] = useState(42);

  return (
    <div className="p-4 rounded-lg bg-slate-900/90 border border-slate-800 space-y-3">
      <div className="text-xs font-semibold text-white">
        Simulação: Interpolação de f-string
      </div>
      <div className="grid grid-cols-2 gap-2 text-xs">
        <div>
          <label className="text-[11px] text-slate-400">Variável {'{usuario}'}:</label>
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            className="w-full mt-1 px-2.5 py-1.5 bg-slate-950 border border-slate-700 rounded text-amber-300 font-mono text-xs"
          />
        </div>
        <div>
          <label className="text-[11px] text-slate-400">Variável {'{total}'}:</label>
          <input
            type="number"
            value={resultado}
            onChange={(e) => setResultado(Number(e.target.value))}
            className="w-full mt-1 px-2.5 py-1.5 bg-slate-950 border border-slate-700 rounded text-amber-300 font-mono text-xs"
          />
        </div>
      </div>

      <div className="p-2.5 rounded bg-slate-950 border border-slate-800 text-xs font-mono text-slate-200">
        <div className="text-slate-400 text-[10px] mb-1">Resultado no terminal com print(f"Olá &#123;usuario&#125;, resultado = &#123;total&#125;"):</div>
        <div className="text-emerald-300 font-medium">"Olá {nome}, resultado = {resultado}"</div>
      </div>
    </div>
  );
};

const ConditionalsMicroDemo: React.FC = () => {
  const [simOpcao, setSimOpcao] = useState('2');

  const steps = [
    { test: "if opcao == '1':", isMatch: simOpcao === '1', action: "somar(num1, num2)", label: "Adição (+)" },
    { test: "elif opcao == '2':", isMatch: simOpcao === '2', action: "subtrair(num1, num2)", label: "Subtração (-)" },
    { test: "elif opcao == '3':", isMatch: simOpcao === '3', action: "multiplicar(num1, num2)", label: "Multiplicação (*)" },
    { test: "elif opcao == '4':", isMatch: simOpcao === '4', action: "dividir(num1, num2)", label: "Divisão (/)" },
    { test: "else:", isMatch: !['1', '2', '3', '4'].includes(simOpcao), action: 'print("Opção inválida!")', label: "Caso Padrão" }
  ];

  const matchedIndex = steps.findIndex(s => s.isMatch);

  return (
    <div className="p-4 rounded-lg bg-slate-900/90 border border-slate-800 space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-white">
          Simulador de Decisão (if / elif / else)
        </span>
        <span className="text-[11px] font-mono text-amber-400">
          opcao = "{simOpcao}"
        </span>
      </div>

      <div>
        <label className="text-[11px] text-slate-400 block mb-1.5">
          Escolha o valor recebido no input:
        </label>
        <div className="flex items-center gap-1.5">
          {['1', '2', '3', '4', '9'].map((op) => (
            <button
              key={op}
              onClick={() => setSimOpcao(op)}
              className={`px-2.5 py-1 text-xs rounded font-mono border transition-all cursor-pointer ${
                simOpcao === op
                  ? 'bg-amber-400 text-slate-950 font-bold border-amber-300'
                  : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-700'
              }`}
            >
              {op === '9' ? 'Inválido (9)' : `Opção '${op}'`}
            </button>
          ))}
        </div>
      </div>

      {/* Step-by-step visual trace */}
      <div className="space-y-1.5 pt-1 text-xs font-mono">
        {steps.map((step, idx) => {
          const isEvaluatedBefore = idx < matchedIndex;
          const isTarget = idx === matchedIndex;

          let badgeStyle = 'bg-slate-950/40 text-slate-500 border-slate-800/40 opacity-40';
          let statusText = 'Ignorado (pulo de bloco)';

          if (isEvaluatedBefore) {
            badgeStyle = 'bg-rose-950/20 text-rose-400/70 border-rose-900/30 line-through decoration-rose-500/50';
            statusText = 'Falso (continua descendo)';
          } else if (isTarget) {
            badgeStyle = 'bg-emerald-950/50 text-emerald-300 border-emerald-500/70 shadow-sm ring-1 ring-emerald-500/30';
            statusText = `MATCH! Executa ${step.action}`;
          }

          return (
            <div
              key={idx}
              className={`p-2 rounded border flex flex-col sm:flex-row sm:items-center justify-between gap-1 transition-all ${badgeStyle}`}
            >
              <div className="flex items-center gap-2">
                <span className="font-semibold">{step.test}</span>
              </div>
              <div className="text-[11px] sm:text-right font-sans">
                {statusText}
              </div>
            </div>
          );
        })}
      </div>

      <p className="text-[11px] text-slate-400 leading-relaxed pt-1 border-t border-slate-800/60">
        <strong>Como o Python decide:</strong> Ele testa cada condição de cima para baixo. Assim que encontra a primeira verdadeira (<code className="text-emerald-300">True</code>), executa aquele bloco e <em>ignora todas as demais</em>, economizando processamento!
      </p>
    </div>
  );
};

const FunctionsMicroDemo: React.FC = () => {
  const [numA, setNumA] = useState(12);
  const [numB, setNumB] = useState(4);

  return (
    <div className="p-4 rounded-lg bg-slate-900/90 border border-slate-800 space-y-3 text-xs">
      <div className="text-xs font-semibold text-white">
        Simulação: Parâmetros e Retorno da Função
      </div>
      <div className="grid grid-cols-2 gap-2">
        <div>
          <label className="text-[11px] text-slate-400">Parâmetro a:</label>
          <input
            type="number"
            value={numA}
            onChange={(e) => setNumA(Number(e.target.value))}
            className="w-full mt-1 px-2.5 py-1.5 bg-slate-950 border border-slate-700 rounded text-amber-300 font-mono text-xs"
          />
        </div>
        <div>
          <label className="text-[11px] text-slate-400">Parâmetro b:</label>
          <input
            type="number"
            value={numB}
            onChange={(e) => setNumB(Number(e.target.value))}
            className="w-full mt-1 px-2.5 py-1.5 bg-slate-950 border border-slate-700 rounded text-amber-300 font-mono text-xs"
          />
        </div>
      </div>

      <div className="p-2.5 bg-slate-950 rounded border border-slate-800 font-mono text-xs space-y-1">
        <div className="text-slate-400 text-[11px]">Chamada: <span className="text-sky-300 font-bold">somar({numA}, {numB})</span></div>
        <div className="text-emerald-300 font-semibold">return {numA} + {numB} ➔ {numA + numB}</div>
      </div>
    </div>
  );
};

const IndentationMicroDemo: React.FC = () => {
  const [hasIndentation, setHasIndentation] = useState(true);

  return (
    <div className="p-4 rounded-lg bg-slate-900/90 border border-slate-800 space-y-3 text-xs">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-white">
          Simulação: Impacto da Indentação
        </span>
        <button
          onClick={() => setHasIndentation(!hasIndentation)}
          className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-amber-300 rounded font-mono text-[11px] cursor-pointer"
        >
          {hasIndentation ? 'Simular sem recuo' : 'Restaurar 4 espaços'}
        </button>
      </div>

      <div className="p-3 bg-slate-950 rounded border border-slate-800 font-mono text-xs space-y-1">
        <div className="text-sky-300">def somar(a, b):</div>
        <div className={hasIndentation ? 'text-amber-300 pl-4' : 'text-rose-400'}>
          {hasIndentation ? '    return a + b  # 4 espaços (OK)' : 'return a + b  # SEM RECUO!'}
        </div>
      </div>

      <div className={`p-2.5 rounded border text-xs ${
        hasIndentation
          ? 'bg-emerald-950/30 border-emerald-900/40 text-emerald-300'
          : 'bg-rose-950/30 border-rose-900/40 text-rose-300'
      }`}>
        {hasIndentation
          ? '✅ Código válido! O Python sabe que a linha pertence à função.'
          : '❌ IndentationError: expected an indented block after function definition on line 1.'}
      </div>
    </div>
  );
};

const InteractiveMicroDemo: React.FC<{ componentId: string }> = ({ componentId }) => {
  switch (componentId) {
    case 'input-float':
      return <InputFloatMicroDemo />;
    case 'zero-division':
      return <ZeroDivisionMicroDemo />;
    case 'f-strings':
      return <FStringsMicroDemo />;
    case 'conditionals':
      return <ConditionalsMicroDemo />;
    case 'functions':
      return <FunctionsMicroDemo />;
    case 'indentation':
      return <IndentationMicroDemo />;
    default:
      return (
        <div className="p-4 rounded-lg bg-slate-900/60 border border-slate-800 text-xs text-slate-400 leading-relaxed">
          Dica: Experimente testar essas linhas no <a href="#terminal" className="text-amber-400 hover:underline">Terminal Interativo</a> logo abaixo para vê-las em tempo real!
        </div>
      );
  }
};


