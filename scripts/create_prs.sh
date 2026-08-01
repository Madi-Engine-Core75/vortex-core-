#!/bin/bash
# create_prs.sh - Create Pull Requests for prepared branches using GitHub CLI
# Usage: ensure gh CLI is installed and you are authenticated (gh auth login), then run:
#   chmod +x scripts/create_prs.sh && ./scripts/create_prs.sh

set -euo pipefail

echo "Creating PR for vortex-core- (feat/cleanup-and-ci -> main)"
gh pr create \
  --repo Madi-Engine-Core75/vortex-core- \
  --head feat/cleanup-and-ci \
  --base main \
  --title "feat: JS safety, crypto key persistence, guardrails & CI" \
  --body $'Summary:\n\n- تحسينات أمان وجودة للواجهة: معالجة آمنة للـ DOM وlocalStorage، إمكانية تصدير/استيراد مفتاح التشفير (Base64)، تطبيع محسّن لاكتشاف التمويه (عربي/إنجليزي)، إدارة إشعارات مع طابور محلي.\n\nFiles changed (high level): app.js, crypto-enclave.js, guardrails-engine.js, notification-engine.js, package.json, .eslintrc.json, .prettierrc, jest.config.cjs, __tests__/*, .github/workflows/js-ci.yml\n\nHow to test locally:\n1) npm ci\n2) npx eslint . --ext .js --fix\n3) npx prettier --check .\n4) npm test\n5) node ./src/main.js (smoke)\n\nNotes: لا يتم تضمين أي أسرار في الكود; إذا احتاج CI أسرارًا سأطلب أسماء المتغيرات.'

echo
echo "Creating PR for madi-Engine-Core (feat/rust-cleanup-ci -> main)"
gh pr create \
  --repo Madi-Engine-Core75/madi-Engine-Core \
  --head feat/rust-cleanup-ci \
  --base main \
  --title "ci(rust): fmt/clippy/build/test + add CryptoEngine integration test" \
  --body $'Summary:\n\n- إضافة اختبار تكاملي لدورة التشفير (generate → encrypt → decrypt)، وإعداد GitHub Action لتشغيل cargo fmt (check), clippy (-D warnings), build, test على core/rust-core.\n\nFiles changed (high level): core/rust-core/tests/crypto_integration.rs, .github/workflows/rust-ci.yml\n\nHow to test locally:\n1) cd core/rust-core\n2) cargo fmt -- --check\n3) cargo clippy -- -D warnings\n4) cargo build\n5) cargo test\n\nNotes: تأكد أن بيئة CI تتمتع بمكوّنات rustfmt وclippy (workflow يحاول إضافتها).'

echo
echo "PR creation commands executed. If gh CLI prompts, follow its instructions."
