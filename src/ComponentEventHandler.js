const RemoteService = require('./remoteService/index').default;

class ComponentEventHandler {
  handleComponentEvent({biId, isDevMode, trigger}) {
    if (isDevMode) {
      this.updateBiConfig(biId)
    } else {
      const event = this._getEventByBiId(biId);
      if (event && event.isValid() && event.trigger === trigger) {
        this.sendBiCallback({src: event.src, evid: event.evid, params: event.params});
      } else {
        console.error(`Event is not valid: ${event}`)
      }
    }
  };

  async setConfiguration(configuration) {
    this.configuration = configuration;
    this.remoteService = new RemoteService(configuration.apiEndpoint);
    this.events = await this.remoteService.getEvents();
  }

  async reloadEvents() {
    this.events = await this.remoteService.getEvents();
  }

  registerSendBiCallback(callback) {
    this.sendBiCallback = callback;
  }

  setCurrentVisibleScreen(screenName) {
    this.visibleScreen = screenName;
  }

  updateBiConfig(biId) {
    this.remoteService.updateComponent({biId, screenName: this.visibleScreen, author: this.configuration.author});
  }

  hasEventForComponent(biId) {
    const event = this._getEventByBiId(biId);
    return event !== undefined;
  }

  _getEventByBiId(biId) {
    return this.events.find((event) => event.biId === biId);
  }
}

export default ComponentEventHandler;