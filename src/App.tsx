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
    <div className="h-screen bg-bg text-text selection:bg-accent/20 flex flex-col overflow-hidden">
      <Header />
      
      <main className="flex-1 flex flex-col lg:grid lg:grid-cols-[1fr_340px] overflow-y-auto">
        {/* Results Area (Order: Second on Mobile, First on Desktop) */}
        <section className="order-2 lg:order-1 lg:overflow-y-auto lg:custom-scrollbar scroll-smooth min-h-[300px]">
          <IterationTable result={result} />
        </section>

        {/* Calculator Sidebar (Order: First on Mobile, Second on Desktop) */}
        <section className="order-1 lg:order-2 border-b lg:border-l lg:border-b-0 border-grid-line lg:h-full">
          <Calculator onSolve={handleSolve} />
        </section>
      </main>

      <footer className="h-8 px-6 border-t border-grid-line bg-bg flex justify-between items-center text-[9px] uppercase tracking-[2px] text-dim-text/40 font-bold shrink-0">

        <span>
          Date: {new Date().toLocaleDateString('en-GB')}
        </span>
      </footer>
    </div>
  );
}

