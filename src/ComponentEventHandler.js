
export default class ComponentEventHandler {

  handleComponentEvent = ({biId, isDevMode}) => {
    if (isDevMode) {
      updateBiConfig(biId)
    } else {
      this.sendBiCallback({biId});
    }
  };

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