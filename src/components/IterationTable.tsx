/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { SolverResult } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { AlertCircle, Target, ArrowRight } from 'lucide-react';

interface IterationTableProps {
  result: SolverResult | null;
}

export default function IterationTable({ result }: IterationTableProps) {
  if (!result) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-12 text-center min-h-[600px] bg-bg">
        <div className="w-20 h-20 bg-accent/5 rounded-full flex items-center justify-center mb-6 animate-pulse border border-accent/20">
          <Target className="w-8 h-8 text-accent/40" />
        </div>
        <h3 className="text-xl font-light uppercase tracking-[4px] text-accent/40">System Idle</h3>
        <p className="text-dim-text/40 mt-3 max-w-xs text-sm">
          Parameters required. Please define function and interval boundaries in the control panel.
        </p>
      </div>
    );
  }

  if (result.error) {
    let explanation = '';
    if (result.error === 'Invalid function format detected.') {
      explanation = 'Please use valid mathematical expressions like: x^2 - 2, sin(x) - x/2, or 3*x + 1.';
    } else if (result.error === 'f(a) and f(b) must have opposite signs') {
      explanation = 'The function must have opposite signs at a and b [f(a)*f(b) < 0].';
    } else if (result.error === 'Please enter a valid function before solving.') {
      explanation = 'Target function field cannot be empty.';
    }

    return (
      <div className="flex-1 p-8 bg-bg flex items-center justify-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="p-8 bg-red-500/5 border border-red-500/30 rounded-xl flex flex-col items-center text-center gap-4 max-w-md shadow-[0_0_40px_rgba(239,68,68,0.1)] transition-all"
        >
          <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mb-2">
            <AlertCircle className="w-8 h-8 text-red-500" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-red-500 uppercase tracking-widest">{result.error}</h3>
            {explanation && (
              <p className="text-dim-text text-sm mt-3 leading-relaxed font-medium">
                {explanation}
              </p>
            )}
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="flex-1 p-4 sm:p-6 md:p-10 space-y-6 md:space-y-10 bg-[radial-gradient(circle_at_top_left,#111827,#0A0F1E)] min-h-full">
      {/* Root Summary Card */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-accent/5 border border-accent p-4 sm:p-6 md:p-8 rounded-xl flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6 shadow-[0_0_30px_rgba(0,210,255,0.1)] relative overflow-hidden"
      >
        <div className="space-y-1 md:space-y-2 text-center md:text-left relative z-10">
          <span className="text-[9px] md:text-[11px] font-bold uppercase tracking-widest text-accent block">Approximate Root Found</span>
          <div className="text-[9px] md:text-xs text-dim-text max-w-[200px] md:max-w-none">Convergence reached within defined tolerance.</div>
        </div>
        <div className="text-xl xs:text-2xl sm:text-4xl md:text-5xl font-mono text-accent tracking-tighter break-all text-center md:text-right relative z-10 w-full md:w-auto">
          {result.root?.toFixed(8)}
        </div>
        {/* Subtle decorative glow for mobile visibility */}
        <div className="absolute inset-0 bg-accent/5 md:hidden" />
      </motion.div>

      {/* Table Section */}
      <div className="space-y-4">
        <h3 className="text-[10px] md:text-[11px] font-bold uppercase tracking-[2px] text-accent flex items-center gap-3">
          Step-by-Step Iterations
          <div className="h-[1px] flex-1 bg-grid-line" />
        </h3>

        <div className="w-full overflow-x-auto block custom-scrollbar border border-grid-line rounded-lg">
          <table className="iteration-table w-full text-left border-collapse min-w-[700px] lg:min-w-full">
            <thead>
              <tr className="border-b-2 border-accent bg-black/20">
                <th className="px-3 md:px-4 py-3 text-[10px] md:text-[11px] uppercase text-dim-text tracking-widest">Iter</th>
                <th className="px-3 md:px-4 py-3 text-[10px] md:text-[11px] uppercase text-dim-text tracking-widest">Range [a, b]</th>
                <th className="px-3 md:px-4 py-3 text-[10px] md:text-[11px] uppercase text-dim-text tracking-widest">Midpoint (c)</th>
                <th className="px-3 md:px-4 py-3 text-[10px] md:text-[11px] uppercase text-dim-text tracking-widest">f(c)</th>
                <th className="px-3 md:px-4 py-3 text-[10px] md:text-[11px] uppercase text-dim-text tracking-widest">Error (abs)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-grid-line">
              <AnimatePresence initial={false}>
                {result.iterations.map((iter, idx) => (
                  <motion.tr
                    key={iter.iteration}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: idx * 0.03 }}
                    className="hover:bg-white/5 transition-colors group"
                  >
                    <td className="px-4 py-3 font-mono text-xs text-accent whitespace-nowrap">
                      {iter.iteration.toString().padStart(2, '0')}
                    </td>
                    <td className="px-4 py-3 font-mono text-xs text-text/80 whitespace-nowrap">
                      [{iter.a.toFixed(4)}, {iter.b.toFixed(4)}]
                    </td>
                    <td className="px-4 py-3 font-mono text-xs text-white font-medium whitespace-nowrap">
                      {iter.c.toFixed(8)}
                    </td>
                    <td className={`px-4 py-3 font-mono text-xs whitespace-nowrap ${Math.abs(iter.fc) < 0.0001 ? 'text-green-500' : 'text-text/60'}`}>
                      {iter.fc.toExponential(4)}
                    </td>
                    <td className="px-4 py-3 font-mono text-xs text-dim-text/60 whitespace-nowrap">
                      {iter.error.toExponential(4)}
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
