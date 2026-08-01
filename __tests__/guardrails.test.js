import MadiGuardrailsEngine from '../guardrails-engine';

describe('MadiGuardrailsEngine - deobfuscation and leet handling', () => {
  test('rejects spaced letters: p o r n', () => {
    const res = MadiGuardrailsEngine.evaluateInput('This contains p o r n content');
    expect(res.approved).toBe(false);
    expect(res.errorCode).toBe('POLICY_VIOLATION');
  });

  test('rejects hyphenated word: p-o-r-n', () => {
    const res = MadiGuardrailsEngine.evaluateInput('User wrote p-o-r-n in message');
    expect(res.approved).toBe(false);
  });

  test('rejects underscored word: p_o_r_n', () => {
    const res = MadiGuardrailsEngine.evaluateInput('Mention p_o_r_n please');
    expect(res.approved).toBe(false);
  });

  test('rejects leetspeak when leet flag enabled: p0rn -> porn', () => {
    const resNoLeet = MadiGuardrailsEngine.evaluateInput('we saw p0rn here');
    expect(resNoLeet.approved).toBe(true); // without leet mapping it should pass

    const resLeet = MadiGuardrailsEngine.evaluateInput('we saw p0rn here', { leet: true });
    expect(resLeet.approved).toBe(false);
  });

  test('passes safe content', () => {
    const res = MadiGuardrailsEngine.evaluateInput('Hello world, this is safe content.');
    expect(res.approved).toBe(true);
  });

  test('handles large input without crashing (safe)', () => {
    const large = 'foo '.repeat(20000); // ~80KB
    const res = MadiGuardrailsEngine.evaluateInput(large);
    expect(res.approved).toBe(true);
  });

  test('invalid input returns INVALID_FORMAT', () => {
    const res = MadiGuardrailsEngine.evaluateInput(null);
    expect(res.approved).toBe(false);
    expect(res.errorCode).toBe('INVALID_FORMAT');
  });
});
