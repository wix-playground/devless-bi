class ComponentEventHandler {

  handleComponentEvent({biId, isDevMode}) {
    if (isDevMode) {
      this.updateBiConfig(biId)
    } else {
      //TODO: resolve bi event params from biId AND SEND TO CALLBACK
      this.sendBiCallback({biId});
    }
  };

  setConfiguration(configuration) {
    this.configuration = configuration;
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