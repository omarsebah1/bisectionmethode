/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import * as math from 'mathjs';
import { BisectionParams, SolverResult, IterationResult } from '../types';

/**
 * Normalizes input expressions.
 * Handles implicit multiplication, equation formatting, and smart math phrases.
 */
export function normalizeExpression(input: string): string {
  let normalized = input.trim().toLowerCase();

  // 1. Root-style and standalone value detection
  // Matches "sqrt(N)", "root N", "square root N", "√N", or just "N"
  // Converts these to "x^2 - N" as per requirement
  const standaloneValueMatch = normalized.match(/^(?:root|square root|sqrt|√)?\s*\(?(\d+(\.\d+)?)\)?$/);
  if (standaloneValueMatch) {
    const n = standaloneValueMatch[1];
    return `x^2 - ${n}`;
  }

  // 2. Equation normalization (LHS = RHS -> LHS - (RHS))
  if (normalized.includes('=')) {
    const parts = normalized.split('=');
    if (parts.length === 2) {
      const lhs = parts[0].trim();
      const rhs = parts[1].trim();
      if (rhs === '0') {
        normalized = lhs;
      } else {
        normalized = `(${lhs}) - (${rhs})`;
      }
    }
  }

  // 3. Normalizing synonyms/phrases
  normalized = normalized.replace(/√/g, 'sqrt');

  // 4. Handle implicit multiplication between number and variable/function
  // e.g., 2x -> 2*x, 0.5x -> 0.5*x, 2sin(x) -> 2*sin(x)
  normalized = normalized.replace(/(\d)\s*([a-z(])/g, '$1*$2');
  
  // 5. Handle implicit multiplication between x and functions/parentheses
  // e.g., x sin(x) -> x*sin(x), x(x+1) -> x*(x+1)
  normalized = normalized.replace(/x\s*(sin|cos|tan|log|sqrt|exp|abs|\()/g, 'x*$1');

  return normalized;
}

export function solveBisection(params: BisectionParams): SolverResult {
  const { a, b, epsilon = 0.00001, maxIterations = 20 } = params;
  
  if (!params.expression || params.expression.trim() === '') {
    return { iterations: [], root: null, error: 'Please enter a valid function before solving.' };
  }

  const expression = normalizeExpression(params.expression);
  
  let compiledExpr;
  try {
    compiledExpr = math.compile(expression);
    // Test evaluate once to ensure it works with basic x
    compiledExpr.evaluate({ x: 0 });
  } catch (err) {
    return { 
      iterations: [], 
      root: null, 
      error: 'Invalid function format detected.' 
    };
  }

  const f = (x: number) => {
    try {
      const res = compiledExpr.evaluate({ x });
      return typeof res === 'number' ? res : NaN;
    } catch (err) {
      return NaN;
    }
  };

  const fa = f(a);
  const fb = f(b);

  if (isNaN(fa) || isNaN(fb)) {
    return { 
      iterations: [], 
      root: null, 
      error: 'Invalid function format detected.'
    };
  }

  // Exact roots at boundaries
  if (Math.abs(fa) < 1e-15) {
    return { iterations: [{ iteration: 1, a, b, c: a, fc: fa, error: 0 }], root: a };
  }
  if (Math.abs(fb) < 1e-15) {
    return { iterations: [{ iteration: 1, a, b, c: b, fc: fb, error: 0 }], root: b };
  }

  if (fa * fb > 0) {
    return { 
      iterations: [], 
      root: null, 
      error: 'f(a) and f(b) must have opposite signs' 
    };
  }

  const iterations: IterationResult[] = [];
  let currentA = a;
  let currentB = b;
  let root: number | null = null;

  for (let i = 1; i <= maxIterations; i++) {
    const c = (currentA + currentB) / 2;
    const fc = f(c);
    const error = Math.abs(currentB - currentA) / 2;

    iterations.push({
      iteration: i,
      a: currentA,
      b: currentB,
      c: c,
      fc: fc,
      error: error
    });

    if (Math.abs(fc) < epsilon || error < epsilon) {
      root = c;
      break;
    }

    if (f(currentA) * fc < 0) {
      currentB = c;
    } else {
      currentA = c;
    }
    
    root = c; // Best estimate so far
  }

  return { iterations, root };
}
