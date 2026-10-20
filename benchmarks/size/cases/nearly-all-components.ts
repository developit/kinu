// Re-exported, not just referenced: `void X` lets the bundler drop X entirely,
// so the measurement would be of the module's side effects alone.
export * from '../../../src';
