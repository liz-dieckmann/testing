import { i as apiClient } from "./__federation_expose_Mount-C8PjL4k2.js";
class AxiosStrategy {
  active = false;
  async initialize() {
    if (this.active) {
      console.warn("Axios interceptor is already active");
      return;
    }
    this.active = true;
  }
  async stop() {
    if (!this.active) return;
    apiClient.cleanup();
    this.active = false;
  }
  isActive() {
    return this.active;
  }
}
export {
  AxiosStrategy
};
