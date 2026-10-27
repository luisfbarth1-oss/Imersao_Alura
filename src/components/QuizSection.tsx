import React, { useState } from 'react';
import { QUIZ_QUESTIONS, QuizQuestion } from '../data/calculatorCode';
import { CheckCircle2, XCircle, RotateCcw, Award, HelpCircle } from 'lucide-react';

export const QuizSection: React.FC = () => {
  const [selectedAnswers, setSelectedAnswers] = useState<{ [questionId: number]: number }>({});
  const [submitted, setSubmitted] = useState<{ [questionId: number]: boolean }>({});

  const handleSelect = (questionId: number, optionIdx: number) => {
    if (submitted[questionId]) return;
    setSelectedAnswers((prev) => ({ ...prev, [questionId]: optionIdx }));
  };

  const handleConfirm = (questionId: number) => {
    if (selectedAnswers[questionId] === undefined) return;
    setSubmitted((prev) => ({ ...prev, [questionId]: true }));
  };

  const handleResetAll = () => {
    setSelectedAnswers({});
    setSubmitted({});
  };

  const totalAnswered = Object.keys(submitted).length;
  const correctCount = Object.entries(submitted).filter(([qId, isSub]) => {
    if (!isSub) return false;
    const q = QUIZ_QUESTIONS.find((item) => item.id === Number(qId));
    return q && selectedAnswers[Number(qId)] === q.correctIndex;
  }).length;

  return (
    <section id="desafios" className="py-16 border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs text-amber-400 font-medium mb-1">
              <span>Fixação do Conhecimento</span>
              <span aria-hidden="true">·</span>
              <span>Exercícios Práticos</span>
              <span aria-hidden="true">·</span>
              <span>4 Perguntas Fundamentais</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Desafios & Quiz para Iniciantes
            </h2>
            <p className="text-sm text-slate-400 mt-1 max-w-2xl">
              Teste seu entendimento dos conceitos principais do Python antes de rodar o código no seu próprio computador.
            </p>
          </div>

          <div className="flex items-center gap-3">
            {totalAnswered > 0 && (
              <div className="text-xs font-medium text-slate-300 bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800">
                Acertos: <span className="text-amber-400 font-bold tabular-nums">{correctCount}</span> de <span className="tabular-nums">{QUIZ_QUESTIONS.length}</span>
              </div>
            )}
            <button
              onClick={handleResetAll}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-md transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reiniciar Quiz</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {QUIZ_QUESTIONS.map((q, qIndex) => {
            const chosen = selectedAnswers[q.id];
            const isConfirmed = submitted[q.id];
            const isCorrect = isConfirmed && chosen === q.correctIndex;

            return (
              <div
                key={q.id}
                className="bg-slate-950 rounded-xl border border-slate-800 p-6 flex flex-col justify-between shadow-lg"
              >
                <div>
                  <div className="flex items-center justify-between text-xs text-slate-500 font-mono mb-2">
                    <span>Pergunta {qIndex + 1} de {QUIZ_QUESTIONS.length}</span>
                    {isConfirmed && (
                      <span className={isCorrect ? 'text-emerald-400 font-semibold' : 'text-rose-400 font-semibold'}>
                        {isCorrect ? 'Resposta Correta' : 'Resposta Incorreta'}
                      </span>
                    )}
                  </div>
                  <h3 className="text-base font-semibold text-white mb-4 leading-snug">
                    {q.question}
                  </h3>

                  {/* Options */}
                  <div className="space-y-2 mb-4">
                    {q.options.map((opt, optIdx) => {
                      const isSelected = chosen === optIdx;
                      let optionClasses = 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700';

                      if (isConfirmed) {
                        if (optIdx === q.correctIndex) {
                          optionClasses = 'bg-emerald-950/40 border-emerald-500/70 text-emerald-200 font-medium';
                        } else if (isSelected) {
                          optionClasses = 'bg-rose-950/40 border-rose-500/70 text-rose-200';
                        } else {
                          optionClasses = 'bg-slate-900/50 border-slate-800/60 text-slate-500';
                        }
                      } else if (isSelected) {
                        optionClasses = 'bg-slate-800 border-amber-400 text-white shadow-sm ring-1 ring-amber-400/40';
                      }

                      return (
                        <button
                          key={optIdx}
                          disabled={isConfirmed}
                          onClick={() => handleSelect(q.id, optIdx)}
                          className={`w-full p-3 rounded-lg border text-left text-xs transition-all flex items-start gap-3 cursor-pointer disabled:cursor-default ${optionClasses}`}
                        >
                          <span className="w-5 h-5 rounded-full border border-slate-700 bg-slate-950 flex items-center justify-center shrink-0 text-[11px] font-mono text-slate-400 font-semibold">
                            {String.fromCharCode(65 + optIdx)}
                          </span>
                          <span className="leading-relaxed">{opt}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Bottom confirmation or feedback */}
                <div>
                  {!isConfirmed ? (
                    <button
                      onClick={() => handleConfirm(q.id)}
                      disabled={chosen === undefined}
                      className="w-full py-2 px-4 rounded-lg bg-amber-400 hover:bg-amber-300 disabled:opacity-40 disabled:hover:bg-amber-400 text-slate-950 font-semibold text-xs transition-colors cursor-pointer disabled:cursor-not-allowed shadow-sm"
                    >
                      Confirmar Resposta
                    </button>
                  ) : (
                    <div className={`p-3.5 rounded-lg border text-xs leading-relaxed ${
                      isCorrect ? 'bg-emerald-950/20 border-emerald-900/40 text-emerald-300' : 'bg-slate-900 border-slate-800 text-slate-300'
                    }`}>
                      <div className="font-semibold text-white mb-1 flex items-center gap-1.5">
                        {isCorrect ? (
                          <>
                            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                            <span>Explicação Didática:</span>
                          </>
                        ) : (
                          <>
                            <XCircle className="w-4 h-4 text-rose-400" />
                            <span>Veja a resposta correta:</span>
                          </>
                        )}
                      </div>
                      <p className="text-slate-300">{q.explanation}</p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
