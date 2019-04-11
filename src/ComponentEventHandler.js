const RemoteService = require('./remoteService/index').default;

class ComponentEventHandler {
  handleComponentEvent({biId, isDevMode}) {
    if (isDevMode) {
      this.updateBiConfig(biId)
    } else {
      const event = (this.events.filter((event) => event.biId === biId))[0];
      if (event && event.isValid()) {
        this.sendBiCallback({src: event.src, evid: event.evid, params: event.params});
      } else {
        console.error(`Event is not valid: ${event}`)
      }
    }
  };

  async setConfiguration(configuration) {
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
    // TODO: send event to server with biId, screen name
  }
}

export default ComponentEventHandler;