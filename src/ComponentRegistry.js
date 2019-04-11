import _ from 'lodash';

export default class ComponentRegistry {
  static components = {};

  static registerButtonRenderWrapper(WrapperComponent, propsGenerator) {
    ComponentRegistry.components['buttonRenderWrapper'] = {WrapperComponent, propsGenerator};
    return {
      remove: () => delete ComponentRegistry.components['buttonRenderWrapper']
    }
  };

  static getButtonRenderWrapper = () => {
    return ComponentRegistry.components['buttonRenderWrapper'];
  };
}