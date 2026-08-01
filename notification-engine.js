class EmpathicNotificationRouter {
  static async dispatch(payload) {
    // تفضيل هدوء المستخدم يمكن تخزينه صراحةً في localStorage
    const userQuietPref = JSON.parse(localStorage.getItem('vortex_user_quiet_mode') || 'false');
    const currentHour = new Date().getHours();
    const isRestTime = currentHour < 8 || currentHour > 22;

    if (userQuietPref || isRestTime) {
      console.log("[Empathic Router] Notification deferred: User is in a quiet/rest window.");
      this._queueLocally(payload);
      return false;
    }

    // اطلب الإذن إذا لم يكن ممنوحاً بعد
    if (typeof Notification !== 'undefined' && Notification.permission === 'default') {
      try {
        const permission = await Notification.requestPermission();
        if (permission !== 'granted') {
          this._queueLocally(payload);
          return false;
        }
      } catch (err) {
        console.warn('[Empathic Router] Notification permission request failed', err);
        this._queueLocally(payload);
        return false;
      }
    }

    return this._sendNativeNotification(payload);
  }

  static _queueLocally(payload) {
    try {
      const queue = JSON.parse(localStorage.getItem('vortex_notification_queue') || '[]');
      queue.push({ ...payload, timestamp: Date.now() });
      localStorage.setItem('vortex_notification_queue', JSON.stringify(queue));
    } catch (err) {
      console.warn('[Empathic Router] Failed to queue notification locally', err);
    }
  }

  static _sendNativeNotification(payload) {
    try {
      if (typeof Notification === 'undefined') return false;
      if (Notification.permission === 'granted') {
        new Notification(payload.title, { body: payload.body });
        return true;
      }
      return false;
    } catch (err) {
      console.warn('[Empathic Router] Failed to send native notification', err);
      return false;
    }
  }

  // Helper to flush queued notifications when appropriate
  static flushQueue() {
    try {
      const queue = JSON.parse(localStorage.getItem('vortex_notification_queue') || '[]');
      if (!Array.isArray(queue) || queue.length === 0) return 0;

      const sent = [];
      for (const item of queue) {
        if (this._sendNativeNotification(item)) {
          sent.push(item);
        }
      }

      // keep only unsent
      const remaining = queue.filter(q => !sent.includes(q));
      localStorage.setItem('vortex_notification_queue', JSON.stringify(remaining));
      return sent.length;
    } catch (err) {
      console.warn('[Empathic Router] Failed to flush notification queue', err);
      return 0;
    }
  }
}

export default EmpathicNotificationRouter;
