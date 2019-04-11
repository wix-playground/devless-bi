const EventsRegistry = require('./EventsRegistry').default;
const withBiEvents = require('./withBiEvents').default;
const ComponentRegistry = require('./ComponentRegistry').default;
const ComponentEventHandler = require('./ComponentEventHandler').default;

class DevlessBI {
  constructor() {
    this.devModeActive = false;
    this.componentEventHandler = new ComponentEventHandler();
    this._handleComponentEvent = this._handleComponentEvent.bind(this);
    this.onbuttonPressedListener = EventsRegistry.registerOnButtonPressed(this._handleComponentEvent);
  }

  setConfiguration(configuration) {
    this.componentEventHandler.setConfiguration(configuration);
  }

  registerSendBiCallback(callback) {
    this.componentEventHandler.registerSendBiCallback(callback);
  }

  setCurrentVisibleScreen(screenName) {
    this.componentEventHandler.setCurrentVisibleScreen(screenName);
  }

  registerOverlayComponent(OverlayComponent, propsGenerator) {
    return ComponentRegistry.registerButtonRenderOverlay(OverlayComponent, propsGenerator);
  }

  activateDevMode() {
    EventsRegistry.notifyBiDevModeActivated();
    this.devModeActive = true;
  }

  deactivateDevMode() {
    EventsRegistry.notifyBiDevModeDeactivated();
    this.devModeActive = false;
  }

  isDevMode() {
    return this.devModeActive;
  }

  withEvents(Component) {
    return withBiEvents(Component);
  }

  async reloadEvents() {
    return await this.componentEventHandler.reloadEvents();
    //TODO: force to HOC to reload so we can se cahnges
  }

  hasEventForComponent(biId) {
    return this.componentEventHandler.hasEventForComponent(biId);
  }

  _handleComponentEvent({biId}) {
    this.componentEventHandler.handleComponentEvent({
      biId,
      isDevMode: this.isDevMode()
    });
  }
}

export default DevlessBI;
