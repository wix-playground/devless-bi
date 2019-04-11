import _ from 'lodash';

export default class ComponentRegistry {
  static componentsRegistry = {};

  static registerButtonRenderWrapper(WrapperComponent, propsGenerator) {
    EventsRegistry.componentsRegistry['buttonRenderWrapper'] = {WrapperComponent, propsGenerator};
    return {
      remove: () => delete EventsRegistry.componentsRegistry['buttonRenderWrapper']
    }
  };

  static getButtonRenderWrapper = () => {
    return EventsRegistry.componentsRegistry['buttonRenderWrapper'];
  };
}