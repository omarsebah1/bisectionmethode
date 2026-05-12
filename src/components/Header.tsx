/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Calculator } from 'lucide-react';

export default function Header() {
  return (
    <header className="h-[70px] border-b border-grid-line px-6 md:px-10 flex justify-between items-center bg-gradient-to-r from-[#0A0F1E] to-[#1A233A] sticky top-0 z-50">
      <div className="header-title">
        <h1 className="text-lg md:text-xl font-light tracking-wider text-accent uppercase">
          Welcome to the <span className="font-bold">Bisection Method Solver</span>
        </h1>
      </div>
      
      <div className="text-right hidden sm:block">
        <p className="text-[10px] md:text-xs text-dim-text leading-tight">
          Built by Omar Abu Alsubeh & Amir Abu Alhan
        </p>
        <p className="text-[10px] md:text-xs text-accent font-medium mt-0.5">
          Numerical Analysis Laboratory
        </p>
      </div>
    </header>
  );
}
