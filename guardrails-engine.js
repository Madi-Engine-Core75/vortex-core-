// GuardrailsEngine - simple keyword-based policy enforcement
// This module intentionally uses a normalized keyword matching strategy
// to resist simple obfuscation attempts (dots, dashes, spaces).

const bannedKeywords = {
  inappropriate: ['nsfw', 'explicit', 'porn', 'adultcontent', 'deviant'],
  violenceOrHarm: ['violence', 'terror', 'kill', 'suicide', 'selfharm', 'weapon'],
  substances: ['drugs', 'cocaine', 'heroin', 'psychedelic', 'alcohol'],
  hateOrDefamation: ['hate', 'blasphemy', 'defamation', 'slur', 'harass']
};

function normalizeText(text) {
  return String(text)
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[^a-z0-9]/g, '');
}

export default class GuardrailsEngine {
  static evaluate(inputContent) {
    if (!inputContent || typeof inputContent !== 'string') {
      return {
        approved: false,
        errorCode: 'INVALID_FORMAT',
        reason: 'Payload is null, empty, or not a string.'
      };
    }

    const raw = inputContent.trim();
    const compact = normalizeText(raw);

    for (const [category, keywords] of Object.entries(bannedKeywords)) {
      for (const kw of keywords) {
        const compactKw = kw.toLowerCase().replace(/[^a-z0-9]/g, '');
        if (raw.toLowerCase().includes(kw.toLowerCase()) || compact.includes(compactKw)) {
          return {
            approved: false,
            errorCode: 'POLICY_VIOLATION',
            category,
            reason: 'Content blocked by policy',
            timestamp: new Date().toISOString()
          };
        }
      }
    }

    return { approved: true, status: 'PASS', timestamp: new Date().toISOString() };
  }
}
