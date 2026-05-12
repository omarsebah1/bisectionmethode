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
    return (
      <div className="flex-1 p-8 bg-bg">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-6 bg-red-500/5 border border-red-500/20 rounded-md flex gap-4 items-start"
        >
          <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-1" />
          <div>
            <h3 className="text-sm font-bold text-red-500 uppercase tracking-widest">Calculation Error</h3>
            <p className="text-dim-text text-sm mt-2">{result.error}</p>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="flex-1 p-6 md:p-10 space-y-10 bg-[radial-gradient(circle_at_top_left,#111827,#0A0F1E)] min-h-full">
      {/* Root Summary Card */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-accent/5 border border-accent p-6 md:p-8 rounded-xl flex flex-col md:flex-row items-center justify-between gap-6 shadow-[0_0_30px_rgba(0,210,255,0.1)]"
      >
        <div className="space-y-2 text-center md:text-left">
          <span className="text-[11px] font-bold uppercase tracking-widest text-accent">Approximate Root Found</span>
          <div className="text-xs text-dim-text">Convergence achieved within the specified tolerance.</div>
        </div>
        <div className="text-4xl md:text-5xl font-mono text-accent tracking-tighter">
          {result.root?.toFixed(8)}
        </div>
      </motion.div>

      {/* Table Section */}
      <div className="space-y-4">
        <h3 className="text-[11px] font-bold uppercase tracking-[2px] text-accent flex items-center gap-3">
          Step-by-Step Iterations
          <div className="h-[1px] flex-1 bg-grid-line" />
        </h3>

        <div className="overflow-x-auto">
          <table className="iteration-table w-full text-left border-collapse min-w-[700px]">
            <thead>
              <tr className="border-b-2 border-accent">
                <th className="px-4 py-3 text-[11px] uppercase text-dim-text tracking-widest">Iter</th>
                <th className="px-4 py-3 text-[11px] uppercase text-dim-text tracking-widest">Range [a, b]</th>
                <th className="px-4 py-3 text-[11px] uppercase text-dim-text tracking-widest">Midpoint (c)</th>
                <th className="px-4 py-3 text-[11px] uppercase text-dim-text tracking-widest">f(c)</th>
                <th className="px-4 py-3 text-[11px] uppercase text-dim-text tracking-widest">Error (abs)</th>
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
