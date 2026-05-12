/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import Header from './components/Header';
import Calculator from './components/Calculator';
import IterationTable from './components/IterationTable';
import { BisectionParams, SolverResult } from './types';
import { solveBisection } from './logic/bisection';

export default function App() {
  const [result, setResult] = useState<SolverResult | null>(null);

  const handleSolve = (params: BisectionParams) => {
    const calculation = solveBisection(params);
    setResult(calculation);
  };

  return (
    <div className="h-screen bg-bg text-text overflow-hidden flex flex-col">
      <Header />
      
      <main className="flex-1 flex flex-col lg:grid lg:grid-cols-[1fr_340px] overflow-hidden">
        {/* Results Area (Left) */}
        <section className="flex-1 overflow-y-auto custom-scrollbar">
          <IterationTable result={result} />
        </section>

        {/* Calculator Sidebar (Right) */}
        <Calculator onSolve={handleSolve} />
      </main>

      <footer className="h-8 px-6 border-t border-grid-line bg-bg flex justify-between items-center text-[9px] uppercase tracking-[2px] text-dim-text/40 font-bold shrink-0">
          
          <span> {new Date().}</span>
      </footer>
    </div>
  );
}

