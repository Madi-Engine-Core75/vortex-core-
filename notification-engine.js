class EmpathicNotificationRouter {
  static async dispatch(payload) {
    // التحقق من تفضيل المستخدم للهدوء (مؤشر واقعي على الإرهاق أو الرغبة في عدم الإزعاج)
    const prefersQuiet = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const currentHour = new Date().getHours();
    
    // تعريف "نافذة التقبل الذهني" (مثلاً: عدم إزعاج خارج ساعات التركيز المعتادة أو في أوقات الراحة)
    const isRestTime = currentHour < 8 || currentHour > 22;

    if (prefersQuiet || isRestTime) {
      console.log("[Empathic Router] Notification deferred: User is in a quiet/rest window.");
      // تخزين الإشعار محلياً في الـ Queue لحين اعتدال السياق
      this._queueLocally(payload);
      return false;
    }

    // إرسال الإشعار فوراً لكون البيئة مهيأة
    return this._sendNativeNotification(payload);
  }

  static _queueLocally(payload) {
    const queue = JSON.parse(localStorage.getItem('vortex_notification_queue') || '[]');
    queue.push({ ...payload, timestamp: Date.now() });
    localStorage.setItem('vortex_notification_queue', JSON.stringify(queue));
  }

  static _sendNativeNotification(payload) {
    if (Notification.permission === 'granted') {
      new Notification(payload.title, { body: payload.body });
      return true;
    }
    return false;
  }
}
