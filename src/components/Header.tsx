/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Calculator } from 'lucide-react';

export default function Header() {
  return (
    <header className="h-auto md:h-[70px] border-b border-grid-line px-4 md:px-10 py-3 md:py-0 flex flex-col md:flex-row justify-between items-center bg-gradient-to-r from-[#0A0F1E] to-[#1A233A] sticky top-0 z-50 shrink-0 gap-2 md:gap-0">
      <div className="header-title text-center md:text-left">
        <h1 className="text-sm sm:text-base md:text-xl font-light tracking-wider text-accent uppercase flex items-center gap-1.5 justify-center md:justify-start">
          <span>Welcome to the</span> <span className="font-bold underline decoration-accent/30 underline-offset-4">Bisection Solver</span>
        </h1>
      </div>
      
      <div className="text-center md:text-right">
        <p className="text-[9px] md:text-xs text-dim-text leading-tight opacity-80">
          Built by Omar Abu Alsubeh & Amir Abu Alhan
        </p>
        <p className="text-[9px] md:text-xs text-accent font-medium mt-0.5 tracking-wider">
          Numerical Analysis Laboratory
        </p>
      </div>
    </header>
  );
}
