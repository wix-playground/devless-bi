const RemoteService = require('./remoteService/index').default;

class ComponentEventHandler {
  handleComponentEvent({biId, isDevMode, trigger, componentRef}) {
    if (isDevMode) {
      this.updateBiConfig(biId)
    } else {
      const event = this._getEventByBiId(biId);
      if (event && event.isValid()) {
        this.sendBiCallback({
          src: event.src,
          evid: event.evid,
          params: event.params
        }, componentRef);
      } else {
        console.error(`Event is not valid: ${JSON.stringify(event)}`)
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

  registerUpdateBiConfigForComponentCallback(callback) {
    this.updateBiConfigForComponentCallback = callback;
  }

  unregisterUpdateBiConfigForComponent() {
    delete this.updateBiConfigForComponentCallback;
  }

  setCurrentVisibleScreen(screenName) {
    this.visibleScreen = screenName;
  }

  async updateBiConfig(biId) {
    if (this.updateBiConfigForComponentCallback) {
      this.updateBiConfigForComponentCallback({status: 'started'});
    }
    await this.remoteService.updateComponent({biId, screenName: this.visibleScreen, author: this.configuration.author});
    if (this.updateBiConfigForComponentCallback) {
      this.updateBiConfigForComponentCallback({status: 'ended'});
    }
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