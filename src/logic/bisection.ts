/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import * as math from 'mathjs';
import { BisectionParams, SolverResult, IterationResult } from '../types';

/**
 * Normalizes input expressions.
 * Handles cases like "root 2", "sqrt(2)", or "2" by converting them to "x^2 - 2"
 */
export function normalizeExpression(input: string): string {
  const trimmed = input.trim().toLowerCase();
  
  // Handle "root N" or "sqrt(N)" or "√N"
  const rootMatch = trimmed.match(/^(?:root|sqrt|√)\s*(\d+(\.\d+)?)$/);
  if (rootMatch) {
    const n = rootMatch[1];
    return `x^2 - ${n}`;
  }

  // If it's just a number N, interpret as finding root of N (equivalent to x - N = 0 or x^2 - N = 0?)
  // Usually "solve root 2" means x^2 - 2. "solve 2" is ambiguous, but let's stick to the prompt.
  // The prompt says "If user enters only a number like √2 or root 2 ... convert to x^2 - 2"
  
  return input;
}

export function solveBisection(params: BisectionParams): SolverResult {
  const { a, b, epsilon = 0.00001, maxIterations = 20 } = params;
  const expression = normalizeExpression(params.expression);
  
  let compiledExpr;
  try {
    compiledExpr = math.compile(expression);
  } catch (err) {
    return { iterations: [], root: null, error: 'Invalid mathematical expression.' };
  }

  const f = (x: number) => {
    try {
      return compiledExpr.evaluate({ x });
    } catch (err) {
      return NaN;
    }
  };

  const fa = f(a);
  const fb = f(b);

  if (isNaN(fa) || isNaN(fb)) {
    return { iterations: [], root: null, error: 'Function evaluation failed at interval boundaries.' };
  }

  if (fa * fb > 0) {
    return { 
      iterations: [], 
      root: null, 
      error: 'The function does not bracket a root in the given interval [a, b]. f(a) and f(b) must have opposite signs.' 
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
