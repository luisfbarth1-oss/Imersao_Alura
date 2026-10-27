import React, { useState, useRef, useEffect } from 'react';
import { Terminal, Play, RotateCcw, HelpCircle, ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react';

interface TerminalLine {
  id: string;
  type: 'system' | 'input' | 'output' | 'error' | 'success';
  text: string;
}

type StepState = 'awaiting_option' | 'awaiting_num1' | 'awaiting_num2' | 'finished';

export const InteractiveTerminal: React.FC = () => {
  const [lines, setLines] = useState<TerminalLine[]>([
    { id: '1', type: 'system', text: 'usuario@python:~$ python calculadora.py' },
    { id: '2', type: 'output', text: '--- CALCULADORA EM PYTHON ---' },
    { id: '3', type: 'output', text: '1. Adição (+)' },
    { id: '4', type: 'output', text: '2. Subtração (-)' },
    { id: '5', type: 'output', text: '3. Multiplicação (*)' },
    { id: '6', type: 'output', text: '4. Divisão (/)' },
    { id: '7', type: 'output', text: '5. Sair' },
  ]);

  const [currentPrompt, setCurrentPrompt] = useState<string>('Escolha uma opção (1/2/3/4/5): ');
  const [step, setStep] = useState<StepState>('awaiting_option');
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [num1, setNum1] = useState<number | null>(null);
  const [num2, setNum2] = useState<number | null>(null);
  const [inputVal, setInputVal] = useState<string>('');

  // Execution trace state
  const [lastExecutedCode, setLastExecutedCode] = useState<string>('Aguardando início...');
  const [variablesScope, setVariablesScope] = useState<{ [key: string]: string | number }>({
    opcao: '---',
    num1: '---',
    num2: '---',
    resultado: '---',
  });

  const terminalEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [lines]);

  const resetTerminal = () => {
    setLines([
      { id: Date.now().toString() + '-1', type: 'system', text: 'usuario@python:~$ python calculadora.py' },
      { id: Date.now().toString() + '-2', type: 'output', text: '--- CALCULADORA EM PYTHON ---' },
      { id: Date.now().toString() + '-3', type: 'output', text: '1. Adição (+)' },
      { id: Date.now().toString() + '-4', type: 'output', text: '2. Subtração (-)' },
      { id: Date.now().toString() + '-5', type: 'output', text: '3. Multiplicação (*)' },
      { id: Date.now().toString() + '-6', type: 'output', text: '4. Divisão (/)' },
      { id: Date.now().toString() + '-7', type: 'output', text: '5. Sair' },
    ]);
    setStep('awaiting_option');
    setCurrentPrompt('Escolha uma opção (1/2/3/4/5): ');
    setSelectedOption('');
    setNum1(null);
    setNum2(null);
    setInputVal('');
    setLastExecutedCode('calculadora() -> mostrar_menu()');
    setVariablesScope({ opcao: '---', num1: '---', num2: '---', resultado: '---' });
  };

  const handleUserInput = (valToProcess?: string) => {
    const raw = (valToProcess !== undefined ? valToProcess : inputVal).trim();
    if (!raw && step !== 'finished') return;

    const newLines = [...lines];

    if (step === 'awaiting_option') {
      newLines.push({ id: Date.now().toString() + 'in', type: 'input', text: `${currentPrompt}${raw}` });

      if (raw === '5') {
        newLines.push({ id: Date.now().toString() + 'out', type: 'output', text: 'Calculadora encerrada. Até a próxima!' });
        newLines.push({ id: Date.now().toString() + 'sys', type: 'system', text: 'usuario@python:~$ ' });
        setLines(newLines);
        setStep('finished');
        setCurrentPrompt('');
        setLastExecutedCode('if opcao == "5": print("Calculadora encerrada.") return');
        setVariablesScope({ opcao: '5', num1: '---', num2: '---', resultado: 'Encerrado' });
        setInputVal('');
        return;
      }

      if (!['1', '2', '3', '4'].includes(raw)) {
        newLines.push({ id: Date.now().toString() + 'err', type: 'error', text: 'Opção inválida! Escolha um número de 1 a 5.' });
        setLines(newLines);
        setInputVal('');
        setLastExecutedCode('# Opção inválida digitada: cai no else: print("Opção inválida!")');
        return;
      }

      setSelectedOption(raw);
      setStep('awaiting_num1');
      setCurrentPrompt('Digite o primeiro número: ');
      setLastExecutedCode(`opcao = input("...") # valor recebido: "${raw}"`);
      setVariablesScope((prev) => ({ ...prev, opcao: `"${raw}"` }));
      setLines(newLines);
      setInputVal('');
      return;
    }

    if (step === 'awaiting_num1') {
      newLines.push({ id: Date.now().toString() + 'in', type: 'input', text: `${currentPrompt}${raw}` });

      const parsedNum = parseFloat(raw.replace(',', '.'));
      if (isNaN(parsedNum)) {
        newLines.push({ id: Date.now().toString() + 'err', type: 'error', text: 'Erro: Por favor, digite apenas números válidos! (ValueError capturado)' });
        newLines.push({ id: Date.now().toString() + 'sys', type: 'system', text: 'usuario@python:~$ ' });
        setLines(newLines);
        setStep('finished');
        setCurrentPrompt('');
        setLastExecutedCode('except ValueError: print("Erro: digite apenas números válidos!")');
        setInputVal('');
        return;
      }

      setNum1(parsedNum);
      setStep('awaiting_num2');
      setCurrentPrompt('Digite o segundo número: ');
      setLastExecutedCode(`num1 = float(input(...)) # valor convertido: ${parsedNum}`);
      setVariablesScope((prev) => ({ ...prev, num1: parsedNum }));
      setLines(newLines);
      setInputVal('');
      return;
    }

    if (step === 'awaiting_num2') {
      newLines.push({ id: Date.now().toString() + 'in', type: 'input', text: `${currentPrompt}${raw}` });

      const parsedNum2 = parseFloat(raw.replace(',', '.'));
      if (isNaN(parsedNum2)) {
        newLines.push({ id: Date.now().toString() + 'err', type: 'error', text: 'Erro: Por favor, digite apenas números válidos! (ValueError capturado)' });
        newLines.push({ id: Date.now().toString() + 'sys', type: 'system', text: 'usuario@python:~$ ' });
        setLines(newLines);
        setStep('finished');
        setCurrentPrompt('');
        setLastExecutedCode('except ValueError: print("Erro: digite apenas números válidos!")');
        setInputVal('');
        return;
      }

      setNum2(parsedNum2);
      const n1 = num1 ?? 0;
      const n2 = parsedNum2;

      // Execute calculation based on selectedOption
      let resultText = '';
      let codeTrace = '';
      let scopeResult: string | number = '';

      if (selectedOption === '1') {
        const res = n1 + n2;
        resultText = `\nResultado: ${n1} + ${n2} = ${res}`;
        codeTrace = `def somar(a=${n1}, b=${n2}): return a + b -> ${res}`;
        scopeResult = res;
        newLines.push({ id: Date.now().toString() + 'res', type: 'success', text: resultText });
      } else if (selectedOption === '2') {
        const res = n1 - n2;
        resultText = `\nResultado: ${n1} - ${n2} = ${res}`;
        codeTrace = `def subtrair(a=${n1}, b=${n2}): return a - b -> ${res}`;
        scopeResult = res;
        newLines.push({ id: Date.now().toString() + 'res', type: 'success', text: resultText });
      } else if (selectedOption === '3') {
        const res = n1 * n2;
        resultText = `\nResultado: ${n1} * ${n2} = ${res}`;
        codeTrace = `def multiplicar(a=${n1}, b=${n2}): return a * b -> ${res}`;
        scopeResult = res;
        newLines.push({ id: Date.now().toString() + 'res', type: 'success', text: resultText });
      } else if (selectedOption === '4') {
        if (n2 === 0) {
          resultText = '\nResultado: Não é possível dividir por zero! (Tratamento if b == 0 evitou crash)';
          codeTrace = `def dividir(a=${n1}, b=0): if b == 0: return "Erro: Não é possível dividir por zero!"`;
          scopeResult = 'Erro (ZeroDivision)';
          newLines.push({ id: Date.now().toString() + 'err', type: 'error', text: resultText });
        } else {
          const res = n1 / n2;
          resultText = `\nResultado: ${n1} / ${n2} = ${res}`;
          codeTrace = `def dividir(a=${n1}, b=${n2}): return a / b -> ${res}`;
          scopeResult = res;
          newLines.push({ id: Date.now().toString() + 'res', type: 'success', text: resultText });
        }
      }

      newLines.push({ id: Date.now().toString() + 'prompt_again', type: 'output', text: '\n[Execução finalizada com sucesso. Deseja rodar novamente?]' });
      newLines.push({ id: Date.now().toString() + 'sys_end', type: 'system', text: 'usuario@python:~$ ' });

      setLines(newLines);
      setStep('finished');
      setCurrentPrompt('');
      setLastExecutedCode(codeTrace);
      setVariablesScope({
        opcao: `"${selectedOption}"`,
        num1: n1,
        num2: n2,
        resultado: scopeResult,
      });
      setInputVal('');
      return;
    }
  };

  const runQuickTest = (opt: string, valA: string, valB: string) => {
    resetTerminal();
    setTimeout(() => {
      // Simulate sequential inputs
      setLines((prev) => [
        ...prev,
        { id: Date.now().toString() + 'q1', type: 'input', text: `Escolha uma opção (1/2/3/4/5): ${opt}` },
        { id: Date.now().toString() + 'q2', type: 'input', text: `Digite o primeiro número: ${valA}` },
        { id: Date.now().toString() + 'q3', type: 'input', text: `Digite o segundo número: ${valB}` },
      ]);

      const n1 = parseFloat(valA);
      const n2 = parseFloat(valB);

      let resText = '';
      let trace = '';
      let isErr = false;
      let resVal: string | number = '';

      if (opt === '1') {
        resVal = n1 + n2;
        resText = `\nResultado: ${n1} + ${n2} = ${resVal}`;
        trace = `def somar(a=${n1}, b=${n2}): return a + b -> ${resVal}`;
      } else if (opt === '4' && n2 === 0) {
        isErr = true;
        resVal = 'Erro (ZeroDivision)';
        resText = `\nResultado: Não é possível dividir por zero!`;
        trace = `def dividir(a=${n1}, b=0): if b == 0: return "Erro..."`;
      } else if (opt === '3') {
        resVal = n1 * n2;
        resText = `\nResultado: ${n1} * ${n2} = ${resVal}`;
        trace = `def multiplicar(a=${n1}, b=${n2}): return a * b -> ${resVal}`;
      }

      setLines((prev) => [
        ...prev,
        { id: Date.now().toString() + 'qres', type: isErr ? 'error' : 'success', text: resText },
        { id: Date.now().toString() + 'qend', type: 'system', text: 'usuario@python:~$ ' }
      ]);

      setStep('finished');
      setCurrentPrompt('');
      setLastExecutedCode(trace);
      setVariablesScope({
        opcao: `"${opt}"`,
        num1: n1,
        num2: n2,
        resultado: resVal
      });
    }, 150);
  };

  return (
    <section id="terminal" className="py-16 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 text-xs text-amber-400 font-medium mb-1">
              <span>Ambiente Interativo</span>
              <span aria-hidden="true">·</span>
              <span>Execução em Tempo Real</span>
              <span aria-hidden="true">·</span>
              <span>Inspetor de Memória</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Terminal Python Interativo
            </h2>
            <p className="text-sm text-slate-400 mt-1 max-w-2xl">
              Teste o comportamento da calculadora diretamente no navegador. Digite as opções no prompt ou use os atalhos rápidos.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={resetTerminal}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-md transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5 text-amber-400" />
              <span>Reiniciar Terminal</span>
            </button>
          </div>
        </div>

        {/* Quick Test Presets */}
        <div className="flex flex-wrap items-center gap-2 mb-4 text-xs">
          <span className="text-slate-400 font-medium">Testes Rápidos:</span>
          <button
            onClick={() => runQuickTest('1', '15', '25')}
            className="px-2.5 py-1 bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white rounded border border-slate-800 cursor-pointer transition-colors"
          >
            Adição: 15 + 25
          </button>
          <button
            onClick={() => runQuickTest('3', '7.5', '4')}
            className="px-2.5 py-1 bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white rounded border border-slate-800 cursor-pointer transition-colors"
          >
            Multiplicação: 7.5 * 4
          </button>
          <button
            onClick={() => runQuickTest('4', '50', '0')}
            className="px-2.5 py-1 bg-rose-950/40 hover:bg-rose-900/50 text-rose-300 rounded border border-rose-800/60 cursor-pointer transition-colors"
          >
            Divisão por Zero: 50 / 0 (Prevenção de Erro)
          </button>
        </div>

        {/* 2-Zone Split: Terminal Console & Execution Inspector */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left: Terminal Console (7 cols) */}
          <div className="lg:col-span-7 bg-slate-950 rounded-xl border border-slate-800 overflow-hidden shadow-2xl flex flex-col h-[460px]">
            {/* Terminal Window Header */}
            <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900/90 border-b border-slate-800 text-xs">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80 inline-block" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80 inline-block" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80 inline-block" />
                <span className="ml-2 font-mono text-slate-400 text-[11px]">bash - Python 3.11</span>
              </div>
              <span className="text-[11px] text-slate-500 font-mono">calculadora.py</span>
            </div>

            {/* Terminal Content Logs */}
            <div
              className="p-4 flex-1 overflow-y-auto font-mono text-xs sm:text-[13px] space-y-1 scrollbar-thin scrollbar-thumb-slate-700"
              onClick={() => inputRef.current?.focus()}
            >
              {lines.map((line) => {
                if (line.type === 'system') {
                  return (
                    <div key={line.id} className="text-emerald-400 font-semibold">
                      {line.text}
                    </div>
                  );
                }
                if (line.type === 'input') {
                  return (
                    <div key={line.id} className="text-amber-300">
                      {line.text}
                    </div>
                  );
                }
                if (line.type === 'error') {
                  return (
                    <div key={line.id} className="text-rose-400 font-medium">
                      {line.text}
                    </div>
                  );
                }
                if (line.type === 'success') {
                  return (
                    <div key={line.id} className="text-emerald-300 font-bold bg-emerald-950/20 p-2 rounded border border-emerald-900/30">
                      {line.text}
                    </div>
                  );
                }
                return (
                  <div key={line.id} className="text-slate-300 whitespace-pre-wrap">
                    {line.text}
                  </div>
                );
              })}

              {/* Active Input Line */}
              {step !== 'finished' ? (
                <div className="flex items-center text-amber-300 pt-1">
                  <span className="select-none text-slate-400 shrink-0">{currentPrompt}</span>
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputVal}
                    onChange={(e) => setInputVal(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        handleUserInput();
                      }
                    }}
                    autoFocus
                    className="flex-1 bg-transparent border-none outline-none font-mono text-amber-300 px-1 caret-amber-400"
                    placeholder="digite aqui e aperte Enter..."
                  />
                </div>
              ) : (
                <div className="pt-2">
                  <button
                    onClick={resetTerminal}
                    className="px-3 py-1 bg-amber-400 hover:bg-amber-300 text-slate-950 font-sans text-xs font-semibold rounded cursor-pointer transition-colors"
                  >
                    Rodar Novamente
                  </button>
                </div>
              )}
              <div ref={terminalEndRef} />
            </div>

            {/* Quick Option Buttons when in awaiting_option mode */}
            {step === 'awaiting_option' && (
              <div className="p-2.5 bg-slate-900/80 border-t border-slate-800 flex flex-wrap gap-1.5 items-center text-xs">
                <span className="text-[11px] text-slate-400 font-sans mr-1">Atalhos rápidos:</span>
                <button
                  onClick={() => handleUserInput('1')}
                  className="px-2 py-0.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded font-mono border border-slate-700 cursor-pointer"
                >
                  1: Somar
                </button>
                <button
                  onClick={() => handleUserInput('2')}
                  className="px-2 py-0.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded font-mono border border-slate-700 cursor-pointer"
                >
                  2: Subtrair
                </button>
                <button
                  onClick={() => handleUserInput('3')}
                  className="px-2 py-0.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded font-mono border border-slate-700 cursor-pointer"
                >
                  3: Multiplicar
                </button>
                <button
                  onClick={() => handleUserInput('4')}
                  className="px-2 py-0.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded font-mono border border-slate-700 cursor-pointer"
                >
                  4: Dividir
                </button>
                <button
                  onClick={() => handleUserInput('5')}
                  className="px-2 py-0.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded font-mono border border-slate-700 cursor-pointer"
                >
                  5: Sair
                </button>
              </div>
            )}
          </div>

          {/* Right: Execution Inspector & Variables in Memory (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-slate-950 rounded-xl border border-slate-800 p-5 shadow-xl space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800/80 pb-3">
                <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-amber-400" />
                  Inspetor de Execução do Python
                </h3>
                <span className="text-[11px] font-mono text-emerald-400">Tempo Real</span>
              </div>

              {/* Current Line Executed */}
              <div>
                <span className="text-[11px] uppercase tracking-wider font-semibold text-slate-400 block mb-1">
                  Última Instrução / Função Executada
                </span>
                <div className="p-2.5 bg-slate-900 rounded-lg border border-slate-800 font-mono text-xs text-amber-300 break-words">
                  {lastExecutedCode}
                </div>
              </div>

              {/* Memory Variables Table */}
              <div>
                <span className="text-[11px] uppercase tracking-wider font-semibold text-slate-400 block mb-2">
                  Tabela de Variáveis na Memória (RAM)
                </span>
                <div className="bg-slate-900/80 rounded-lg border border-slate-800 overflow-hidden text-xs font-mono">
                  <div className="grid grid-cols-2 px-3 py-1.5 bg-slate-900 border-b border-slate-800 text-slate-400 font-sans font-medium text-[11px]">
                    <span>Nome da Variável</span>
                    <span className="text-right">Valor Atual</span>
                  </div>
                  {Object.entries(variablesScope).map(([varName, val]) => (
                    <div
                      key={varName}
                      className="grid grid-cols-2 px-3 py-2 border-b border-slate-800/50 last:border-0 items-center"
                    >
                      <span className="text-sky-300 font-semibold">{varName}</span>
                      <span className="text-right text-slate-200 tabular-nums">
                        {String(val)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Beginner Insight Box */}
              <div className="p-3 bg-slate-900/40 rounded-lg border border-slate-800/60 text-xs text-slate-300 space-y-1">
                <div className="font-semibold text-amber-400 flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  O que acontece nos bastidores?
                </div>
                <p className="text-slate-400 text-[11px] leading-relaxed">
                  Quando você digita o segundo número, o Python avalia a condição do <code className="text-sky-300">if</code>, chama a função correspondente passando os números como parâmetros (<code className="text-emerald-300">a</code> e <code className="text-emerald-300">b</code>) e imprime a mensagem formatada na tela.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
