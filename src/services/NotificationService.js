// Servicio para notificaciones temporizadas
export class NotificationService {
  constructor(getQuoteFn, intervalMs) {
    this.getQuoteFn = getQuoteFn;
    this.intervalMs = intervalMs;
    this.timer = null;
  }

  start() {
    if (this.timer) return;
    this.timer = setInterval(() => {
      if (document.visibilityState === 'visible') {
        this.notify();
      }
    }, this.intervalMs);
  }

  stop() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }

  notify() {
    if (Notification.permission === 'granted') {
      const quote = this.getQuoteFn();
      new Notification('Power Quotes+', { body: quote });
    }
  }
}

export const requestNotificationPermission = async () => {
  if (Notification.permission !== 'granted') {
    await Notification.requestPermission();
  }
};
