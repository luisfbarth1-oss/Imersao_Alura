import React, { useState } from 'react';
import { Calculator, ArrowRight, Code2, Equal, Delete } from 'lucide-react';
import { highlightPython } from '../utils/pythonHighlighter';

export const VisualCalculatorSync: React.FC = () => {
  const [display, setDisplay] = useState('0');
  const [prevValue, setPrevValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<'+' | '-' | '*' | '/' | null>(null);
  const [waitingForNewNumber, setWaitingForNewNumber] = useState(false);

  // Python sync inspection
  const [pythonTrace, setPythonTrace] = useState<{
    functionName: string;
    signature: string;
    callLine: string;
    result: string | number;
    explanation: string;
  }>({
    functionName: 'Aguardando operação...',
    signature: 'def somar(a, b): return a + b',
    callLine: '# Pressione os botões da calculadora para ver o Python em ação',
    result: '0',
    explanation: 'Clique nos números e em uma das 4 operações (+, -, *, /) para ver qual função Python é acionada.'
  });

  const handleDigit = (digit: string) => {
    if (waitingForNewNumber) {
      setDisplay(digit);
      setWaitingForNewNumber(false);
    } else {
      setDisplay(display === '0' ? digit : display + digit);
    }
  };

  const handleDecimal = () => {
    if (waitingForNewNumber) {
      setDisplay('0.');
      setWaitingForNewNumber(false);
      return;
    }
    if (!display.includes('.')) {
      setDisplay(display + '.');
    }
  };

  const handleClear = () => {
    setDisplay('0');
    setPrevValue(null);
    setOperation(null);
    setWaitingForNewNumber(false);
    setPythonTrace({
      functionName: 'Calculadora Zerada',
      signature: '# Valores limpos da memória',
      callLine: 'num1 = 0.0\nnum2 = 0.0',
      result: '0',
      explanation: 'Variáveis resetadas para zero.'
    });
  };

  const handleOperation = (op: '+' | '-' | '*' | '/') => {
    const current = parseFloat(display);
    if (prevValue === null) {
      setPrevValue(current);
    } else if (operation) {
      calculateResult(prevValue, current, op);
    }
    setOperation(op);
    setWaitingForNewNumber(true);

    const opMap: { [key: string]: string } = {
      '+': 'somar',
      '-': 'subtrair',
      '*': 'multiplicar',
      '/': 'dividir'
    };

    setPythonTrace({
      functionName: `def ${opMap[op]}(a, b)`,
      signature: `opcao = "${op === '+' ? '1' : op === '-' ? '2' : op === '*' ? '3' : '4'}" # Operação selecionada: ${op}`,
      callLine: `num1 = float("${current}") # Primeiro valor armazenado na memória`,
      result: `Operação: ${op}`,
      explanation: `O Python guardou ${current} na variável num1 e agora espera você digitar num2.`
    });
  };

  const calculateResult = (
    a: number = prevValue ?? 0,
    b: number = parseFloat(display),
    nextOp: '+' | '-' | '*' | '/' | null = null
  ) => {
    if (prevValue === null || operation === null) return;

    let res: number | string = 0;
    let funcName = '';
    let funcDef = '';
    let callSnippet = '';
    let explanation = '';

    if (operation === '+') {
      res = a + b;
      funcName = 'somar(a, b)';
      funcDef = 'def somar(a, b):\n    return a + b';
      callSnippet = `resultado = somar(${a}, ${b})  # Retorna: ${res}`;
      explanation = `A função somar() somou os parâmetros a=${a} e b=${b}, devolvendo ${res}.`;
    } else if (operation === '-') {
      res = a - b;
      funcName = 'subtrair(a, b)';
      funcDef = 'def subtrair(a, b):\n    return a - b';
      callSnippet = `resultado = subtrair(${a}, ${b})  # Retorna: ${res}`;
      explanation = `A função subtrair() realizou ${a} - ${b}, resultando em ${res}.`;
    } else if (operation === '*') {
      res = a * b;
      funcName = 'multiplicar(a, b)';
      funcDef = 'def multiplicar(a, b):\n    return a * b';
      callSnippet = `resultado = multiplicar(${a}, ${b})  # Retorna: ${res}`;
      explanation = `A função multiplicar() calculou o produto de ${a} por ${b}, resultando em ${res}.`;
    } else if (operation === '/') {
      if (b === 0) {
        res = 'Erro: Divisão por Zero';
        funcName = 'dividir(a, b) [Protegido]';
        funcDef = 'def dividir(a, b):\n    if b == 0:\n        return "Erro: divisão por zero!"\n    return a / b';
        callSnippet = `resultado = dividir(${a}, 0)  # Tratamento evitou crash!`;
        explanation = `O divisor é 0! A condição 'if b == 0:' evitou que o Python sofresse um ZeroDivisionError.`;
      } else {
        res = a / b;
        funcName = 'dividir(a, b)';
        funcDef = 'def dividir(a, b):\n    if b == 0:\n        return "Erro"\n    return a / b';
        callSnippet = `resultado = dividir(${a}, ${b})  # Retorna: ${res}`;
        explanation = `A função dividir() dividiu ${a} por ${b}, devolvendo ${res}.`;
      }
    }

    if (typeof res === 'number') {
      setDisplay(String(res));
      setPrevValue(nextOp ? res : null);
    } else {
      setDisplay('Erro');
      setPrevValue(null);
    }

    setOperation(nextOp);
    setWaitingForNewNumber(true);

    setPythonTrace({
      functionName: funcName,
      signature: funcDef,
      callLine: callSnippet,
      result: res,
      explanation: explanation
    });
  };

  return (
    <section id="calculadora" className="py-16 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-8">
          <div className="flex items-center gap-2 text-xs text-amber-400 font-medium mb-1">
            <span>Ponte Conceitual</span>
            <span aria-hidden="true">·</span>
            <span>Interface Visual vs Código Python</span>
            <span aria-hidden="true">·</span>
            <span>Tradução Instantânea</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
            Calculadora Visual Sincronizada com Python
          </h2>
          <p className="text-sm text-slate-400 mt-1 max-w-2xl">
            Clique nos botões como faria em qualquer calculadora comum e veja instantaneamente como o código Python traduz cada clique em chamadas de função e parâmetros.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Visual Calculator Hardware Mockup (5 cols) */}
          <div className="lg:col-span-5 bg-slate-950 p-6 rounded-2xl border border-slate-800 shadow-2xl max-w-sm mx-auto w-full">
            {/* Display screen */}
            <div className="bg-slate-900 rounded-xl p-4 mb-4 border border-slate-800 text-right">
              <div className="text-xs text-slate-400 font-mono h-5">
                {prevValue !== null && operation ? `${prevValue} ${operation}` : ''}
              </div>
              <div className="text-3xl font-bold text-white font-mono tracking-tight overflow-x-auto">
                {display}
              </div>
            </div>

            {/* Keypad */}
            <div className="grid grid-cols-4 gap-2.5">
              <button
                onClick={handleClear}
                className="col-span-2 py-3 bg-slate-800 hover:bg-slate-700 text-rose-400 font-semibold rounded-lg text-sm transition-colors cursor-pointer"
              >
                Limpar (C)
              </button>
              <button
                onClick={() => setDisplay(display.length > 1 ? display.slice(0, -1) : '0')}
                className="py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold rounded-lg text-sm transition-colors cursor-pointer flex items-center justify-center"
              >
                <Delete className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleOperation('/')}
                className={`py-3 rounded-lg text-base font-bold transition-colors cursor-pointer ${
                  operation === '/' ? 'bg-amber-400 text-slate-950' : 'bg-amber-500/20 text-amber-300 hover:bg-amber-500/30'
                }`}
              >
                /
              </button>

              {['7', '8', '9'].map((d) => (
                <button
                  key={d}
                  onClick={() => handleDigit(d)}
                  className="py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-lg text-base transition-colors cursor-pointer border border-slate-800"
                >
                  {d}
                </button>
              ))}
              <button
                onClick={() => handleOperation('*')}
                className={`py-3 rounded-lg text-base font-bold transition-colors cursor-pointer ${
                  operation === '*' ? 'bg-amber-400 text-slate-950' : 'bg-amber-500/20 text-amber-300 hover:bg-amber-500/30'
                }`}
              >
                *
              </button>

              {['4', '5', '6'].map((d) => (
                <button
                  key={d}
                  onClick={() => handleDigit(d)}
                  className="py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-lg text-base transition-colors cursor-pointer border border-slate-800"
                >
                  {d}
                </button>
              ))}
              <button
                onClick={() => handleOperation('-')}
                className={`py-3 rounded-lg text-base font-bold transition-colors cursor-pointer ${
                  operation === '-' ? 'bg-amber-400 text-slate-950' : 'bg-amber-500/20 text-amber-300 hover:bg-amber-500/30'
                }`}
              >
                -
              </button>

              {['1', '2', '3'].map((d) => (
                <button
                  key={d}
                  onClick={() => handleDigit(d)}
                  className="py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-lg text-base transition-colors cursor-pointer border border-slate-800"
                >
                  {d}
                </button>
              ))}
              <button
                onClick={() => handleOperation('+')}
                className={`py-3 rounded-lg text-base font-bold transition-colors cursor-pointer ${
                  operation === '+' ? 'bg-amber-400 text-slate-950' : 'bg-amber-500/20 text-amber-300 hover:bg-amber-500/30'
                }`}
              >
                +
              </button>

              <button
                onClick={() => handleDigit('0')}
                className="col-span-2 py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-lg text-base transition-colors cursor-pointer border border-slate-800"
              >
                0
              </button>
              <button
                onClick={handleDecimal}
                className="py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-lg text-base transition-colors cursor-pointer border border-slate-800"
              >
                .
              </button>
              <button
                onClick={() => calculateResult()}
                className="py-3.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold rounded-lg text-base transition-colors cursor-pointer shadow-lg shadow-amber-400/20"
              >
                =
              </button>
            </div>
          </div>

          {/* Side Inspector: Python Translation (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="bg-slate-950 rounded-2xl border border-slate-800 p-6 shadow-xl space-y-5">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <Code2 className="w-4 h-4 text-amber-400" />
                  <span className="text-sm font-semibold text-white">
                    Tradução em Código Python
                  </span>
                </div>
                <span className="text-xs font-mono text-slate-400">
                  {pythonTrace.functionName}
                </span>
              </div>

              {/* Python Signature / Definition */}
              <div>
                <span className="text-[11px] uppercase tracking-wider font-semibold text-slate-400 block mb-1.5">
                  1. Definição da Função no Script:
                </span>
                <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 font-mono text-xs overflow-x-auto">
                  <div className="table w-full">
                    {highlightPython(pythonTrace.signature)}
                  </div>
                </div>
              </div>

              {/* Python Function Call */}
              <div>
                <span className="text-[11px] uppercase tracking-wider font-semibold text-slate-400 block mb-1.5">
                  2. Linha de Invocação (Passagem de Parâmetros):
                </span>
                <div className="p-3 bg-slate-900 rounded-lg border border-slate-800 font-mono text-xs text-amber-300">
                  {pythonTrace.callLine}
                </div>
              </div>

              {/* Didactic explanation */}
              <div className="p-4 bg-slate-900/60 rounded-lg border border-slate-800 text-xs text-slate-300 space-y-1">
                <span className="font-semibold text-white block">
                  Explicação Didática:
                </span>
                <p className="leading-relaxed text-slate-400">
                  {pythonTrace.explanation}
                </p>
              </div>

              {/* Key Concept Callout */}
              <div className="p-3 bg-amber-400/10 rounded-lg border border-amber-400/20 text-xs text-amber-200">
                <strong>Conceito Chave:</strong> Uma calculadora gráfica na verdade faz exatamente o mesmo que o script no terminal: recebe números, converte para <code className="text-amber-300">float</code>, chama a função correspondente e imprime o valor na tela!
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
