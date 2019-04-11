import _ from 'lodash';

export default class ComponentRegistry {
  static components = {};

  static registerButtonRenderOverlay(OverlayComponent, propsGenerator) {
    ComponentRegistry.components['buttonRenderOverlay'] = {OverlayComponent, propsGenerator};
    return {
      remove: () => delete ComponentRegistry.components['buttonRenderOverlay']
    }
  };

  static getButtonRenderOverlay = () => {
    return ComponentRegistry.components['buttonRenderOverlay'];
  };
}