<!DOCTYPE html>
<html lang="en" dir="ltr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Vortex-Core | Cyber Matrix</title>
  <!-- ربط ملف التنسيقات السيبرانية بالمسار الصحيح -->
  <link rel="stylesheet" href="../assets/css/madi-cyber-theme.css">
  <!-- ربط ملف فحص الأداء التكيفي للهواتف الضعيفة -->
  <script src="./adaptive-perf.js" defer></script>
</head>
<body>

  <!-- الشريط العلوي -->
  <header class="cyber-header">
    <div class="cyber-logo">VORTEX-CORE</div>
    <div class="cyber-actions" style="color: var(--teal-glow, #00f2fe); font-size: 0.8rem;">SECURE_NODE // ACTIVE</div>
  </header>

  <!-- القسم الأوسط: الغرف المتشعبة والعقد -->
  <main class="cyber-workspace">
    <div class="nodes-container">
      
      <!-- العقدة الرئيسية -->
      <div class="cyber-node main active vortex-card">
        <div class="node-title">Main R&D Discussion</div>
        <div class="node-status">● Live Stream Open</div>
      </div>

      <!-- العقد المتفرعة -->
      <div class="cyber-node fork vortex-card">
        <div class="node-title">AI-Agent Fork</div>
        <div class="node-status">Encrypted Enclave</div>
      </div>

      <div class="cyber-node fork vortex-card">
        <div class="node-title">Neuro-Core Split</div>
        <div class="node-status">Synchronized</div>
      </div>

    </div>

    <!-- حاوية الملخص العصبي (مطلوبة لحقن بيانات main.js) -->
    <section id="neural-digest-container" class="vortex-card" style="margin: 15px; padding: 10px;">
      <!-- سيتم حقن الملخصات هنا برمجياً -->
    </section>

    <!-- لوحة المؤشرات الحية -->
    <div class="status-dashboard" style="padding: 10px; font-size: 0.9rem;">
      <span>Community Immunity: <b>Active (Lvl 5)</b></span> | 
      <span>Encryption: <b>AES-256-GCM</b></span>
    </div>
  </main>

  <!-- أزرار تبديل الوضع (اختياري يدوي خفيف) -->
  <div style="padding: 10px; text-align: center;">
    <button id="toggle-low-power" style="background:#081419; color:#00f2fe; border:1px solid #00f2fe; padding:5px 10px; border-radius:4px; cursor:pointer;">Low Power Mode</button>
    <button id="toggle-high-contrast" style="background:#081419; color:#00f2fe; border:1px solid #00f2fe; padding:5px 10px; border-radius:4px; cursor:pointer; margin-left:5px;">High Contrast</button>
  </div>

  <!-- شريط التنقل السفلي -->
  <nav class="cyber-tab-bar">
    <div class="tab-icon active" title="Communities">◈</div>
    <div class="tab-icon" title="Private Encrypted Chats">☲</div>
    <div class="tab-icon" title="Live Spaces">⬡</div>
    <div class="tab-icon" title="Reputation Score">⟡</div>
    <div class="tab-icon" title="Profile">⊙</div>
  </nav>

  <!-- استدعاء المنطق البرمجي الأساسي بصيغة موديول -->
  <script type="module" src="./main.js"></script>
</body>
</html>
