const EventsRegistry = require('./EventsRegistry').default;
const withBiEvents = require('./withBiEvents').default;
const ComponentRegistry = require('./ComponentRegistry').default;

class DevlessBI {
  constructor() {
    this.active = false;
  }

  setWrapperComponent(Component) {
    this.buttonRenderWrapperListener = EventsRegistry.registerButtonRenderWrapper(Component, ({biId}) => ({style: {backgroundColor: 'red'}}));
  }

  activate() {
    this.onbuttonPressedListener = EventsRegistry.registerOnButtonPressed(({biId}) => alert(`button pressed with biId "${biId}"`));
    EventsRegistry.notifyBiDevModeActivated();
    this.active = true;
  }

  deactivate () {
    this.onbuttonPressedListener.remove();
    EventsRegistry.notifyBiDevModeDeactivated();
    this.active = false;
  }

  isActive() {
    return this.active;
  }

  withEvents(Component) {
    return withBiEvents(Component);
  }

  registerWrapperComponent(WrapperComponent, propsGenerator) {
    return ComponentRegistry.registerButtonRenderWrapper(WrapperComponent, propsGenerator);
  }
}

export default new DevlessBI();
