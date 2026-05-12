/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface IterationResult {
  iteration: number;
  a: number;
  b: number;
  c: number;
  fc: number;
  error: number;
}

export interface BisectionParams {
  expression: string;
  a: number;
  b: number;
  epsilon?: number;
  maxIterations?: number;
}

export interface SolverResult {
  iterations: IterationResult[];
  root: number | null;
  error?: string;
}
