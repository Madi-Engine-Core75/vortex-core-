/**
 * MadiGuardrailsEngine - محرك الحصانة الأخلاقية والسيادية (المتطور)
 * مسؤول عن تصفية المدخلات، منع الانتهاكات، والتصدي لمحاولات الالتفاف النصي بحيادية وصرامة.
 */
class MadiGuardrailsEngine {
  // مصفوفة التصنيفات والأنماط المحظورة بدقة
  static #bannedCategories = {
    // 1. المحتوى الهابط والمخالف للفطرة السليمة (شذوذ، إيحاءات، محتوى صريح)
    inappropriate: [
      /\b(nsfw|explicit|porn|adult_content|deviant_behavior_placeholder)\b/i,
      // يمكن إضافة أنماط لغوية إضافية حسب الحاجة المعيارية
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
   * @param {string} text 
   * @returns {string}
   */
  static #normalizeText(text) {
    return text
      .toLowerCase()
      .replace(/[\s\-_.,?!]/g, '') // إزالة الفواصل والمسافات لشفط محاولات التمويه
      .normalize('NFKD'); // توحيد الحروف المتشابهة
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
        errorCode: "INVALID_FORMAT", 
        reason: "Payload format is null, empty, or structurally invalid." 
      };
    }

    const rawContent = inputContent.trim();
    const normalized = this.#normalizeText(rawContent);

    // فحص المحتوى ضد القواعد القياسية والأنماط المطورة
    for (const [category, patterns] of Object.entries(this.#bannedCategories)) {
      for (const pattern of patterns) {
        // الفحص على النص الأصلي والنص المطهر كلاً على حدة
        if (pattern.test(rawContent) || pattern.test(normalized)) {
          console.warn(`[Guardrails Engine] Violation intercepted. Category: [${category}]`);
          
          return {
            approved: false,
            errorCode: "POLICY_VIOLATION",
            category: category,
            reason: "Access denied. Content violates systemic moral, ethical, or safety guardrails.",
            timestamp: new Date().toISOString()
          };
        }
      }
    }

    // اجتياز الاختبار بنجاح مطلق
    return { 
      approved: true, 
      status: "PASS", 
      timestamp: new Date().toISOString() 
    };
  }
}

export default MadiGuardrailsEngine;
