/**
 * Lightweight, zero-dependency Python syntax highlighter for educational UI.
 */
import React from 'react';

export function highlightPython(code: string): React.ReactNode[] {
  const lines = code.split('\n');

  return lines.map((line, lineIndex) => {
    // Process line tokens
    const tokens = tokenizeLine(line);
    return (
      <div key={lineIndex} className="table-row group hover:bg-slate-800/40 transition-colors">
        <span className="table-cell pr-4 text-right select-none text-xs text-slate-500 font-mono tabular-nums opacity-60">
          {lineIndex + 1}
        </span>
        <span className="table-cell font-mono text-xs sm:text-sm whitespace-pre">
          {tokens.map((token, tokenIdx) => (
            <span key={tokenIdx} className={token.className}>
              {token.text}
            </span>
          ))}
        </span>
      </div>
    );
  });
}

interface Token {
  text: string;
  className: string;
}

function tokenizeLine(line: string): Token[] {
  const tokens: Token[] = [];
  let index = 0;

  const keywords = new Set([
    'def', 'return', 'if', 'elif', 'else', 'while', 'for', 'in',
    'try', 'except', 'import', 'from', 'as', 'pass', 'break', 'continue',
    'True', 'False', 'None', 'and', 'or', 'not', 'is', 'lambda', 'with'
  ]);

  const builtins = new Set([
    'print', 'input', 'float', 'int', 'str', 'bool', 'len', 'range', 'list', 'dict', 'sum'
  ]);

  while (index < line.length) {
    // 1. Comments (# to end of line)
    if (line[index] === '#') {
      tokens.push({
        text: line.slice(index),
        className: 'text-slate-400 italic'
      });
      break;
    }

    // 2. Triple or double/single quotes (Strings)
    if (line[index] === '"' || line[index] === "'") {
      const quote = line[index];
      let endIndex = index + 1;
      let isEscaped = false;

      // Check if triple quote
      if (line.slice(index, index + 3) === quote.repeat(3)) {
        const triple = quote.repeat(3);
        const closing = line.indexOf(triple, index + 3);
        if (closing !== -1) {
          endIndex = closing + 3;
        } else {
          endIndex = line.length;
        }
      } else {
        while (endIndex < line.length) {
          if (line[endIndex] === '\\') {
            isEscaped = !isEscaped;
          } else if (line[endIndex] === quote && !isEscaped) {
            endIndex++;
            break;
          } else {
            isEscaped = false;
          }
          endIndex++;
        }
      }

      tokens.push({
        text: line.slice(index, endIndex),
        className: 'text-amber-300'
      });
      index = endIndex;
      continue;
    }

    // 3. f-string prefix like f"..." or f'...'
    if ((line[index] === 'f' || line[index] === 'F') && (line[index + 1] === '"' || line[index + 1] === "'")) {
      tokens.push({
        text: line[index],
        className: 'text-emerald-400 font-semibold'
      });
      index++;
      continue;
    }

    // 4. Numbers
    if (/[0-9]/.test(line[index]) && (index === 0 || /[^a-zA-Z_]/.test(line[index - 1]))) {
      let endIndex = index;
      while (endIndex < line.length && /[0-9.]/.test(line[endIndex])) {
        endIndex++;
      }
      tokens.push({
        text: line.slice(index, endIndex),
        className: 'text-teal-300'
      });
      index = endIndex;
      continue;
    }

    // 5. Identifiers & words (def names, keywords, builtins)
    if (/[a-zA-Z_]/.test(line[index])) {
      let endIndex = index;
      while (endIndex < line.length && /[a-zA-Z0-9_]/.test(line[endIndex])) {
        endIndex++;
      }
      const word = line.slice(index, endIndex);

      if (keywords.has(word)) {
        tokens.push({
          text: word,
          className: 'text-sky-400 font-medium'
        });
      } else if (builtins.has(word)) {
        tokens.push({
          text: word,
          className: 'text-purple-300 font-medium'
        });
      } else {
        // Check if preceding word was 'def' (function name declaration)
        const prevText = line.slice(0, index).trim();
        if (prevText.endsWith('def')) {
          tokens.push({
            text: word,
            className: 'text-emerald-300 font-semibold'
          });
        } else if (line[endIndex] === '(') {
          // Function call
          tokens.push({
            text: word,
            className: 'text-blue-300'
          });
        } else {
          tokens.push({
            text: word,
            className: 'text-slate-200'
          });
        }
      }
      index = endIndex;
      continue;
    }

    // 6. Operators & Punctuation
    const char = line[index];
    if (['+', '-', '*', '/', '=', '>', '<', ':', '(', ')', '[', ']', ',', '.'].includes(char)) {
      tokens.push({
        text: char,
        className: ['+', '-', '*', '/', '='].includes(char) ? 'text-amber-400 font-semibold' : 'text-slate-400'
      });
      index++;
      continue;
    }

    // 7. Whitespace and other characters
    tokens.push({
      text: char,
      className: 'text-slate-300'
    });
    index++;
  }

  return tokens;
}
