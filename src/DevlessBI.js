const EventsRegistry = require('./EventsRegistry').default;
const withBiEvents = require('./withBiEvents').default;
const ComponentRegistry = require('./ComponentRegistry').default;
const componentEventHandler = require('./ComponentEventHandler').default;

class DevlessBI {
  constructor() {
    this.devModeActive = false;
    this._handleComponentEvent = this._handleComponentEvent.bind(this);
    this.onbuttonPressedListener = EventsRegistry.registerOnButtonPressed(this._handleComponentEvent);
  }

  registerSendBiCallback(callback) {
    componentEventHandler.registerSendBiCallback(callback);
  }

  setCurrentVisibleScreen(screenName) {
    componentEventHandler.setCurrentVisibleScreen(screenName);
  }

  registerWrapperComponent(WrapperComponent, propsGenerator) {
    return ComponentRegistry.registerButtonRenderWrapper(WrapperComponent, propsGenerator);
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

  _handleComponentEvent({biId}) {
    componentEventHandler.handleComponentEvent({
      biId,
      isDevMode: this.isDevMode()
    });
  }
}

export default DevlessBI;
