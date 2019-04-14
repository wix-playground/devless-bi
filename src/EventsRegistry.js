import _ from 'lodash';
import EventEmitterManager from './EventEmitterManager';

export default class EventsRegistry {
  static eventEmitter = new EventEmitterManager();

  static addListener = (globalID, callback) => {
    return EventsRegistry.eventEmitter.listenOn(globalID, callback);
  };

  static notifyListeners = (globalID, args) => {
    EventsRegistry.eventEmitter.emitEvent(globalID, args);
  };

  //---------

  static registerComponentEvent = (callback) => {
    return EventsRegistry.addListener('componentEvent', callback);
  };

  static notifyComponentEvent = (args) => {
    EventsRegistry.notifyListeners('componentEvent', args);
  };

  //---------

  static registerBiDevModeChanged = (callback) => {
    return EventsRegistry.addListener('biDevModeChanged', callback);
  };

  static notifyBiDevModeActivated = () => {
    EventsRegistry.notifyListeners('biDevModeChanged', true);
  };

  static notifyBiDevModeDeactivated = () => {
    EventsRegistry.notifyListeners('biDevModeChanged', false);
  };


  static registerComponentScreenshotMode = (callback) => {
    return EventsRegistry.addListener('screenshotMode', callback);
  };

  static notifyComponentScreenshotMode = (args) => {
    EventsRegistry.notifyListeners('screenshotMode', args);
  };
}