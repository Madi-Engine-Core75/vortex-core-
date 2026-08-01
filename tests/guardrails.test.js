import GuardrailsEngine from '../guardrails-engine.js';
import { describe, it, expect } from 'vitest';

describe('GuardrailsEngine', () => {
  it('allows benign content', () => {
    const res = GuardrailsEngine.evaluate('Hello, how are you today?');
    expect(res.approved).toBe(true);
  });

  it('blocks exact banned keyword', () => {
    const res = GuardrailsEngine.evaluate('This contains porn content');
    expect(res.approved).toBe(false);
    expect(res.errorCode).toBe('POLICY_VIOLATION');
  });

  it('blocks obfuscated banned keyword', () => {
    const res = GuardrailsEngine.evaluate('n.s.f.w content disguised');
    expect(res.approved).toBe(false);
  });
});
