const EventsRegistry = require('./EventsRegistry').default;
const withBiEvents = require('./withBiEvents').default;
const ComponentRegistry = require('./ComponentRegistry').default;
const ComponentEventHandler = require('./ComponentEventHandler').default;

class DevlessBI {
  constructor() {
    this.devModeActive = false;
  }

  registerSendBiCallback(callback) {
    ComponentEventHandler.registerSendBiCallback(callback);
  }

  setCurrentVisibleScreen(screenName) {
    ComponentEventHandler.setCurrentVisibleScreen(screenName);
  }

  registerWrapperComponent(WrapperComponent, propsGenerator) {
    return ComponentRegistry.registerButtonRenderWrapper(WrapperComponent, propsGenerator);
  }

  activateDevMode() {
    this.onbuttonPressedListener = EventsRegistry.registerOnButtonPressed(this._handleComponentEvent);
    EventsRegistry.notifyBiDevModeActivated();
    this.devModeActive = true;
  }

  deactivateDevMode() {
    this.onbuttonPressedListener.remove();
    EventsRegistry.notifyBiDevModeDeactivated();
    this.devModeActive = false;
  }

  isDevMode() {
    return this.devModeActive;
  }

  withEvents(Component) {
    return withBiEvents(Component);
  }
}

export default DevlessBI;
