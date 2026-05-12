/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { Play, Info, AlertCircle, Loader2 } from 'lucide-react';
import { motion } from 'motion/react';
import { BisectionParams } from '../types';

interface CalculatorProps {
  onSolve: (params: BisectionParams) => void;
}

export default function Calculator({ onSolve }: CalculatorProps) {
  const [expression, setExpression] = useState('x^2 - 2');
  const [a, setA] = useState('0');
  const [b, setB] = useState('2');
  const [epsilon, setEpsilon] = useState('0.00001');
  const [isSolving, setIsSolving] = useState(false);

  const handleSolve = () => {
    setIsSolving(true);
    setTimeout(() => {
      const epsVal = parseFloat(epsilon);
      onSolve({
        expression,
        a: parseFloat(a),
        b: parseFloat(b),
        epsilon: isNaN(epsVal) ? undefined : epsVal,
        maxIterations: 20,
      });
      setIsSolving(false);
    }, 400);
  };

  const insertToken = (token: string) => {
    setExpression(prev => prev + token);
  };

  const mathTokens = [
    { label: 'sin', value: 'sin(x)' },
    { label: 'cos', value: 'cos(x)' },
    { label: 'tan', value: 'tan(x)' },
    { label: 'log10', value: 'log10(x)' },
    { label: 'ln', value: 'log(x)' },
    { label: '√x', value: 'sqrt(x)' },
    { label: 'x²', value: '^2' },
    { label: 'x³', value: '^3' },
    { label: 'eˣ', value: 'exp(x)' },
    { label: 'π', value: 'pi' },
  ];

  const quickExamples = [
    { label: 'x^2 - 2', value: 'x^2 - 2' },
    { label: 'x^3 - x - 1', value: 'x^3 - x - 1' },
    { label: 'cos(x) - x', value: 'cos(x) - x' },
    { label: 'e^x - 3x', value: 'exp(x) - 3x' },
    { label: 'sqrt(2)', value: 'root 2' },
  ];

  return (
    <aside className="w-full lg:w-[340px] flex flex-col gap-6 p-8 bg-panel border-l border-grid-line h-full lg:sticky lg:top-[70px] shadow-[-10px_0_30px_rgba(0,0,0,0.3)]">
      <div className="flex flex-col gap-6">
        {/* Function Input */}
        <div className="flex flex-col gap-2">
          <label className="text-[11px] uppercase tracking-widest text-accent font-semibold flex items-center justify-between">
            Target Function f(x)
            <Info className="w-3 h-3 text-dim-text opacity-50" />
          </label>

          {/* Scientific Toolbar */}
          <div className="grid grid-cols-5 gap-1 mb-1">
            {mathTokens.map(token => (
              <button
                key={token.label}
                onClick={() => insertToken(token.value)}
                className="py-1.5 px-1 bg-white/5 border border-white/5 rounded text-[10px] text-accent/80 hover:bg-accent/10 hover:border-accent/20 transition-all font-mono"
              >
                {token.label}
              </button>
            ))}
          </div>

          <input
            type="text"
            value={expression}
            onChange={(e) => setExpression(e.target.value)}
            className="w-full bg-black/20 border border-white/10 p-3 rounded-md text-white font-mono text-sm outline-none focus:border-accent transition-colors shrink-0"
            placeholder="e.g. x^2 - 2"
          />
          <div className="text-[10px] text-dim-text italic italic-text">
            Supports: x^2, sin(x), sqrt(2), cos(x)
          </div>
        </div>

        {/* Intervals */}
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <label className="text-[11px] uppercase tracking-widest text-accent font-semibold">Interval [a]</label>
            <input
              type="text"
              value={a}
              onChange={(e) => setA(e.target.value)}
              className="w-full bg-black/20 border border-white/10 p-3 rounded-md text-white font-mono text-sm outline-none focus:border-accent transition-colors"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-[11px] uppercase tracking-widest text-accent font-semibold">Interval [b]</label>
            <input
              type="text"
              value={b}
              onChange={(e) => setB(e.target.value)}
              className="w-full bg-black/20 border border-white/10 p-3 rounded-md text-white font-mono text-sm outline-none focus:border-accent transition-colors"
            />
          </div>
        </div>

        {/* Tolerance */}
        <div className="flex flex-col gap-2">
          <label className="text-[11px] uppercase tracking-widest text-accent font-semibold">Tolerance (ε)</label>
          <input
            type="text"
            value={epsilon}
            onChange={(e) => setEpsilon(e.target.value)}
            className="w-full bg-black/20 border border-white/10 p-3 rounded-md text-white font-mono text-sm outline-none focus:border-accent transition-colors"
          />
        </div>

        <button
          onClick={handleSolve}
          disabled={isSolving}
          className="bg-accent text-black font-bold p-4 rounded-md uppercase tracking-[1.5px] mt-2 shadow-[0_0_20px_rgba(0,210,255,0.4)] hover:opacity-90 disabled:opacity-50 transition-all active:scale-[0.98] flex items-center justify-center gap-2"
        >
          {isSolving ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Play className="w-4 h-4 fill-current" />
          )}
          Execute Solver
        </button>

        {/* Quick Examples */}
        <div className="mt-4">
          <label className="text-[11px] uppercase tracking-widest text-dim-text opacity-50 font-semibold mb-3 block">Quick Examples</label>
          <div className="flex flex-wrap gap-2">
            {quickExamples.map((ex) => (
              <button
                key={ex.label}
                onClick={() => setExpression(ex.value)}
                className="text-[10px] bg-white/5 px-2.5 py-1 rounded-full border border-white/10 text-dim-text hover:border-accent hover:text-accent transition-colors cursor-pointer"
              >
                {ex.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-auto">
        <div className="p-4 rounded-lg bg-black/20 border border-white/5 flex items-start gap-3">
          <div className="text-[10px] bg-accent text-black px-1.5 py-0.5 rounded font-bold shrink-0 mt-0.5 leading-none">STATUS</div>
          <p className="text-[11px] text-dim-text leading-relaxed">
            Engine Ready. Awaiting user input parameters for convergence analysis.
          </p>
        </div>
      </div>
    </aside>
  );
}
