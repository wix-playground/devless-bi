const EventsRegistry = require('./EventsRegistry').default;
const withBiEvents = require('./withBiEvents').default;
const ComponentRegistry = require('./ComponentRegistry').default;

class DevlessBI {
  constructor() {
    this.isActive = false;
  }

  setWrapperComponent(Component) {
    this.buttonRenderWrapperListener = EventsRegistry.registerButtonRenderWrapper(Component, ({biId}) => ({style: {backgroundColor: 'red'}}));
  }

  activate() {
    this.onbuttonPressedListener = EventsRegistry.registerOnButtonPressed(({biId}) => alert(`button pressed with biId "${biId}"`));
    EventsRegistry.notifyBiDevModeActivated();
    this.isActive = true;
  }

  deactivate () {
    this.onbuttonPressedListener.remove();
    EventsRegistry.notifyBiDevModeDeactivated();
    this.isActive = false;
  }

  isActive() {
    return this.isActive;
  }

  withEvents(Component) {
    return withBiEvents(Component);
  }

  registerWrapperComponent(WrapperComponent, propsGenerator) {
    return ComponentRegistry.registerButtonRenderWrapper(WrapperComponent, propsGenerator);
  }
}

export default new DevlessBI();
