/**
 * MadiGuardrailsEngine - محرك الحصانة الأخلاقية والسيادية (المتطور)
 * مسؤول عن تصفية المدخلات، منع الانتهاكات، والتصدي لمحاولات الالتفاف النصي بحيادية وصرامة.
 */
class MadiGuardrailsEngine {
  // مصفوفة التصنيفات والأنماط المحظورة بدقة
  static #bannedCategories = {
    // 1. المحتوى الهابط والمخالف للفطرة السليمة
    inappropriate: [
      /\b(nsfw|explicit|porn|adult_content|deviant_behavior_placeholder)\b/i,
    ],

    // 2. العنف، الإرهاب، والأذى الجسدي والنفسي
    violenceOrHarm: [
      /\b(violence|terror|kill|suicide|self_harm|weapon_manufacturing)\b/i
    ],

    // 3. المواد المخدرة، المؤثرات العقلية، والمشروبات الروحية
    substances: [
      /\b(drugs|narcotics|cocaine|heroin|psychedelic_substances|alcohol_promotion)\b/i
    ],

    // 4. خطاب الكراهية، القذف، والمساس بالكرامة والأديان
    hateOrDefamation: [
      /\b(hate_speech|blasphemy_attack|defamation|racist_slur|harassment_campaign)\b/i
    ]
  };

  /**
   * تطبيع النص وتنظيفه لإحباط محاولات الالتفاف (مثل استخدام الرموز أو المسافات المتباعدة)
   * يحافظ على حدود الكلمات ويُهيئ العربية والالانجليزية على حد سواء
   * @param {string} text 
   * @returns {string}
   */
  static #normalizeText(text) {
    return text
      .toLowerCase()
      .normalize('NFKD')
      // إزالة العلامات التشكيلية
      .replace(/[\u0300-\u036f]/g, '')
      // إبقاء الحروف (لاتينية وعربية) والأرقام والمساحات
      .replace(/[^a-z0-9\s\u0600-\u06FF]/g, ' ')
      // ضم المسافات المتعددة
      .replace(/\s+/g, ' ')
      .trim();
  }

  /**
   * إزالة محاولة التمويه بين الحروف مثل "s e x" أو "s-e-x" أو "s_e_x" → "sex"
   * نطبقها بشكل متكرر حتى لا تبقى مسافات مفصولة بين الحروف
   * @param {string} text
   * @returns {string}
   */
  static #deobfuscateSpacedLetters(text) {
    let prev;
    let curr = text;
    const letterClass = 'a-z\u0600-\u06FF0-9';
    const spacerRe = new RegExp(`([${letterClass}])\s+([${letterClass}])`, 'gi');
    do {
      prev = curr;
      curr = curr.replace(spacerRe, '$1$2');
    } while (curr !== prev);
    return curr;
  }

  /**
   * تقييم المدخلات والتحقق من سلامتها الأخلاقية والفطرية
   * @param {string} inputContent 
   * @returns {Object}
   */
  static evaluateInput(inputContent) {
    if (!inputContent || typeof inputContent !== 'string') {
      return { 
        approved: false, 
        errorCode: 'INVALID_FORMAT', 
        reason: 'Payload format is null, empty, or structurally invalid.' 
      };
    }

    const rawContent = inputContent.trim();
    const normalized = this.#normalizeText(rawContent);
    const deobfuscated = this.#deobfuscateSpacedLetters(normalized);

    // فحص المحتوى ضد القواعد القياسية والأنماط المطورة
    for (const [category, patterns] of Object.entries(this.#bannedCategories)) {
      for (const pattern of patterns) {
        // نفحص على النص الأصلي والنص المطهر والمطهر بعد فك التمويه
        if (
          pattern.test(rawContent) ||
          pattern.test(` ${normalized} `) ||
          pattern.test(` ${deobfuscated} `)
        ) {
          console.warn(`[Guardrails Engine] Violation intercepted. Category: [${category}]`);
          
          return {
            approved: false,
            errorCode: 'POLICY_VIOLATION',
            category: category,
            reason: 'Access denied. Content violates systemic moral, ethical, or safety guardrails.',
            timestamp: new Date().toISOString()
          };
        }
      }
    }

    // اجتياز الاختبار بنجاح مطلق
    return { 
      approved: true, 
      status: 'PASS', 
      timestamp: new Date().toISOString() 
    };
  }
}

export default MadiGuardrailsEngine;
